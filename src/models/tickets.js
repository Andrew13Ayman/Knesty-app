const mongoose=require('mongoose');


/**
 * 
 * typeID(1 or 2 ) 1 : suggestion -  2:complaint

subject : string

body : string

needContact : bool

name : string

phone : string

email : string

 
 */
const ticket_schema=new mongoose.Schema({
  // TypeID(1 or 2 ) 1 : suggestion -  2:complaint
    typeID : {
         type:Number,
         trim:true,
         required:true
    },
    subject :{ 
      type : String,
      require: true,
      trim:true,
    },
    body :{ 
      type : String,
      trim:true,
    },
    needContact:{
      type: Boolean,
      required:true,
      trim : true
    },
    name :{ 
      type : String,
      require: false,
      trim:true,
    },
      email :{ 
        type : String,
        require: false,
        trim:true,
      },
      
      phone :{ 
        type : String,
        require: false,
        trim:true,
      },

})

const Ticket = mongoose.model('ticket',ticket_schema);

module.exports=Ticket;