const router=require('express').Router();
let Visit =require('../models/visit');
let auth = require('../middleware/auth');
let AdminAuth = require('../middleware/AdminAuth');
let Servant =require('../models/servant');

// Get ALL visits-----------------------------------------
router.get('/',auth,(req,res)=>{
    Visit.find()
     .then(visit=>res.json(visit))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________

// Get visit By id -----------------------------------------
router.get('/:id',auth,(req,res)=>{
    Visit.findById(req.params.id)
     .then(visit=>res.json(visit))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________

// Get visits By date -----------------------------------------
router.get('/date/:date',auth,(req,res)=>{
    console.log(req.params.date);
    
    const DatePar = req.params.date;
    Visit.find({date : DatePar})
     .then(visit=>res.json(visit))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________

// Get visits By status -----------------------------------------
router.get('/status/:status',auth,(req,res)=>{
    const Status = req.params.status.toString();
    Visit.find({status : Status })
     .then(visit=>res.json(visit))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________
// Get visits By status  & date -----------------------------------------
router.get('/date/:date/status/:status',auth,(req,res)=>{
    const Status = req.params.status.toString();
    const DatePar = req.params.date;
    Visit.find({date : DatePar , status : Status })
     .then(visit=>res.json(visit))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________

// Delete visit By id -----------------------------------------
router.delete('/:id',AdminAuth,(req,res)=>{
    Visit.findOneAndDelete(req.params.id)
     .then(()=>res.json('visit deleted'))
     .catch(err => res.status(400).json('Error : '+err));
});
//_________________________________________________________

// Add visit---------------{ Servant & Admin }-----------------------------
router.post('/add',auth,(req,res)=>{
    
     let patients=req.body.patients; 
     let  servants=req.body.servants;
     
    const place= req.body.place;
    const date= new Date(Date.now()) ;
    let status = '';
    if(   req.body.status === 'new' 
       || req.body.status === 'complete'
       || req.body.status === 'assigned' 
       || req.body.status === 'cancelled' ){
      status = req.body.status;
    }else
    {
        res.status(400).send('Error :'+ 'status should be {new or complete or assigned or cancelled} ');
    }
    
    const NewVisit=new Visit({
        patients,
        servants,
        place,
        date,
        status
    });
     /*  for(servant  in servants){
      const ServantID = servant.id;
        Servant.findById(ServantID)
       .then(servant=>{
           servant.visits.push(NewVisit);
       })
       .catch(err => res.status(400).json('Error : '+err));
    } */
    
    NewVisit.save()
    
    
    .then(visit=>res.json('Visit Added! '))
    .catch(err=> res.status(400).send('Error :'+err));
});
//_____________________________________________________

// Update Visit---------------{ Servant & Admin }-----------------------

router.patch('/update/:id',auth,(req,res)=>{
    Visit.findById(req.params.id)
    .then(visit =>{
        
        visit.patients=req.body.patients;
        visit.servants=req.body.servants;
        visit.place= req.body.place ;
        visit.date=new Date( req.body.date) ;
        if(   req.body.status === 'new' 
       || req.body.status === 'complete'
       || req.body.status === 'assigned' 
       || req.body.status === 'cancelled' ){
    const status = req.body.status;
    }else
    {
         res.status(400).send('Error :'+ 'status should be {new or complete or assigned or cancelled} ');
    }
        

    visit.save()
    .then(()=>res.json('Visit Updated'))
    .catch(err=>res.status(400).json('Error: '+err))
    })

    .catch(err=>res.status(400).json('Error : '+err));
});
   

//______________________________________________________
module.exports=router;