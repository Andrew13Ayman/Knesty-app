const router=require('express').Router();
let Ticket =require('../models/tickets')

// Ticket Router ----------------------------------------------------------------------
// GET All Tickets
router.get('/',(req,res)=>{
    Ticket.find()
     .then(tickets=>res.json(tickets))
     .catch(err => res.status(400).json('Error : '+err));
});

// Get Ticket By id ____________________________________
router.get('/:id',(req,res)=>{
    Ticket.findById(req.params.id)
     .then(ticket=>res.json(ticket))
     .catch(err => res.status(400).json('Error : '+err));
});

// Delete Ticket By id -----------------------------------------
router.delete('/:id',(req,res)=>{

    Ticket.findByIdAndRemove(req.params.id)
     .then(()=>res.json('Ticket deleted'))
     .catch(err => res.status(400).json('Error : '+err));
});

// Add New Ticket_________________________
router.post('/add',(req,res)=>{

   
    const Body = req.body;
    let typeIDval = false ;

    if(Body.typeID === '1' || Body.typeID === '2'){
        typeIDval = true;
    }
    if(!typeIDval){
        res.status(400).send('Error : TypeID(1 or 2 ) 1 : suggestion -  2:complaint ')
    }

    if(Body.phone.length !== 11 && Body.phone[0] !== 1)
    {  return res.status(400).send('phone number should be 11 number must begin with 01');  }

    const typeID = Body.typeID
    const subject = Body.subject
    const body = Body.body
    const needContact = Body.needContact
    const name = Body.name
    const email = Body.email
    const phone = Body.phone

    const NewTicket=new Ticket({
        typeID,
        subject, 
        body ,
        needContact ,
        name ,
        email ,
        phone
    });
    NewTicket.save()
    
    .then(()=>res.json('Ticket Added! '))
    .catch(err=> res.status(400).send('Error :'+err));
});

// Update Exercise--------------------------------------

router.patch('/update/:id',(req,res)=>{
   
    

    Ticket.findById(req.params.id)
    .then(ticket =>{
        
        const Body = req.body;
        if(Body.typeID === '1' || Body.typeID === '2'){
            typeIDval = true;
        }
        if(!typeIDval){
            res.status(400).send('Error : TypeID(1 or 2 ) 1 : suggestion -  2:complaint ')
        }
    if(Body.phone.length !== 11 && Body.phone[0] !== 1)
    {  return res.status(400).send('phone number should be 11 number must begin with 01');  }

    ticket.typeID = Body.typeID
    ticket.subject = Body.subject
    ticket.body = Body.body
    ticket.needContact = Body.needContact
    ticket.name = Body.name
    ticket.email = Body.email
    ticket.phone = Body.phone

    ticket.save()
    .then(()=>res.json('patient Updated'))
    .catch(err=>res.status(400).json('Error: '+err))
    })

    .catch(err=>res.status(400).json('Error : '+err));
});
//---------------------------------------------------------------------------------------------   

module.exports=router;