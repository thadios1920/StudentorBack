const express = require('express')
const router = express.Router()
const { ServiceOff } = require('../models/serviceOff')
const { ServiceDem } = require('../models/serviceDem')
const { Solde } = require('../models/solde')
const {Utilisateur} = require('../models/utilisateur')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

//Upload Files
const multer = require('multer')

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

//From multer webSite documentation

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

//Get Request Retourne all Users 
router.get('/',async(req,res)=>{
    try {
        const userList = await Utilisateur.find()
        .populate('servicesdem')
        .populate('servicesoff')
        .populate('solde')
        res.send(userList)
    } catch (error) {
        console.log(error);
    }
})

//Get Request Retourne un User specifique
router.get('/:id', async (req, res) => {
    try {
        user = await Utilisateur.findById(req.params.id).select('-passwordHash') //sans password
        res.send(user)
    } catch (error) {
        console.log(error);
    }

})

//Ajouter un nouveau User
router.post('/', uploadOptions.single('image'), async (req,res)=>{

    // let defaultSolde = new Solde ({
    //     derniereDateRecharge:"00/00/0000",
    //     montantRecharge:0,
    //     derniereDatePrelevement:"00/00/0000",
    //     montantPrelevement:0,
    //     nbTokens:0
    // })

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let user = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        image: `${basePath}${fileName}`,
        passwordHash: bcrypt.hashSync(req.body.password, 10),//bcrypt pour crypter les passwords
        gender: req.body.gender,
        soldeAux:req.body.soldeAux,
        email: req.body.email,
        profession: req.body.profession,
        solde: req.body.solde,
        
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

//Put Request Modifier un user existant
router.put('/:id',  uploadOptions.single('image'), async (req, res) => {

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const userExist = await Utilisateur.findById(req.params.id)
    let newPassword
    if (req.body.password) {//Verifier si il ya un champ password dans la requette 
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash
    }

    user = await Utilisateur.findByIdAndUpdate(
        req.params.id,
        {
            nom: req.body.nom,
            prenom: req.body.prenom,
            passwordHash: newPassword,//bcrypt pour vrypter les passwords
            gender: req.body.gender,
            image: `${basePath}${fileName}`,
            soldeAux : req.body.soldeAux,
            email: req.body.email,
            profession: req.body.profession,
            ville: req.body.ville,
            solde: req.body.solde,
        }, { new: true }// Pour retourner les nouvelles données non pas les anciennes
    )
    if (!user) {
        return res.send('User not found')
    }
    res.send(user)
})

//Put Request Prelevement du compte
router.put('/preleve/:id/:debit', async (req, res) => {

    userExist = await Utilisateur.findById(req.params.id)
    let soldeExist = parseInt (userExist.soldeAux)
    if( soldeExist < req.params.debit ){
        return res.send('Pas assez de credit')
    }
    
    user = await Utilisateur.findByIdAndUpdate(
        req.params.id,
        {
            nom: req.body.nom,
            prenom: req.body.prenom,
            soldeAux : (soldeExist-parseInt(req.params.debit)),
            gender: req.body.gender,
            email: req.body.email,
            profession: req.body.profession,
            solde: req.body.solde,
        }, { new: true }// Pour retourner les nouvelles données non pas les anciennes
    )
    if (!user) {
        return res.send('User not found')
    }
    res.send(user)
})

//Put Request Chargement du compte
router.put('/charge/:id/:cost', async (req, res) => {

    userExist = await Utilisateur.findById(req.params.id)
    let soldeExist = parseInt (userExist.soldeAux)
    
    user = await Utilisateur.findByIdAndUpdate(
        req.params.id,
        {
            nom: req.body.nom,
            prenom: req.body.prenom,
            soldeAux : (soldeExist+parseInt(req.params.cost)),
            gender: req.body.gender,
            email: req.body.email,
            profession: req.body.profession,
            solde: req.body.solde,
        }, { new: true }// Pour retourner les nouvelles données non pas les anciennes
    )
    if (!user) {
        return res.send('User not found')
    }
    res.send(user)
})

//Delete Request Supprimer un utilisateur
router.delete('/:id', (req, res) => {
    Utilisateur.findByIdAndRemove(req.params.id)
        .then(user => {
            if (user) { return res.send(200).json({ success: true, message: 'User DELETED' }) }
        })
        .catch(err => { console.log(err); })
})

//Creer un compte
router.post('/register', uploadOptions.single('image'),async (req,res)=>{

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let user = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        image: `${basePath}${fileName}`,
        passwordHash: bcrypt.hashSync(req.body.password, 10),//bcrypt pour crypter les passwords
        gender: req.body.gender,
        soldeAux:req.body.soldeAux,
        isAdmin : req.body.isAdmin,
        email: req.body.email,
        profession: req.body.profession,
        solde: req.body.solde,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

//S'authentifier 
router.post('/login',async (req,res)=>{
    const secret = process.env.SECRET_KEY
    const user = await Utilisateur.findOne({email : req.body.email})
    if (!user) {
        return res.status(400).send('User not found')
    }
    if (user && bcrypt.compareSync(req.body.password,user.passwordHash)) {
        const token = jwt.sign({
            userID : user.id,
            isAdmin : user.isAdmin
        },
        secret,{expiresIn : '1d'})
        res.status(200).send({
            message:'User Authenticated',
            email:user.email,
            token:token
    })
    }else{
        res.status(400).send('Wrong password')
    }
})

//Exporter le module
module.exports = router