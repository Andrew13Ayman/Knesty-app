const mongoose=require('mongoose');


const hospital_schema=new mongoose.Schema({
    
    name :{ 
      type : String,
      require: true,
      trim:true,
    },
      address :{ 
        type : String,
        require: true,
        trim:true,
      }

})

const Hospital=mongoose.model('hospital',hospital_schema);

module.exports=Hospital;