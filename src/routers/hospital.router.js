const router=require('express').Router();
let Hospital =require('../models/hospital')
let auth = require('../middleware/auth')
let AdminAuth = require('../middleware/AdminAuth')

// Hospital Router ----------------------------------------------------------------------
// GET All Hospitals  ___________________________________
router.get('/',auth,(req,res)=>{

    Hospital.find()
     .then(hospitals=>res.json(hospitals))
     .catch(err => res.status(400).json('Error : '+err));
});

// Get hospital By id ____________________________________
router.get('/:id',auth,(req,res)=>{
    Hospital.findById(req.params.id)
     .then(hospital=>res.json(hospital))
     .catch(err => res.status(400).json('Error : '+err));
});

// Delete Hospital By id -----------------------------------------
router.delete('/:id',AdminAuth,(req,res)=>{

    Hospital.findOneAndDelete(req.params.id)
     .then(()=>res.json('hospital deleted'))
     .catch(err => res.status(400).json('Error : '+err));
});

// Add New Hospital_________________________
router.post('/add',AdminAuth,(req,res)=>{
 
    const name = req.body.name;
    const address = req.body.address;
    
    const NewHospital=new Hospital({
        name,
        address
    });
    NewHospital.save()
    
    .then(hospital=>res.json( hospital + '\n'+'hospital Added! '))
    .catch(err=> res.status(400).send('Error :'+err));
});

// Update Hospital--------------------------------------

router.patch('/update/:id',AdminAuth,(req,res)=>{
   
    Hospital.findById(req.params.id)
    .then(hospital =>{
        
        hospital.name=req.body.name;
        hospital.address=req.body.address;;
        

        hospital.save()
    .then(()=>res.json('hospital Updated'))
    .catch(err=>res.status(400).json('Error: '+err))
    })

    .catch(err=>res.status(400).json('Error : '+err));
});
//---------------------------------------------------------------------------------------------   

module.exports=router;