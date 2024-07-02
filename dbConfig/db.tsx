
import mongoose from "mongoose";

export async function connect(){

  try{
        mongoose.connect(process.env.MONGO_URI!);
        console.log(process.env.MONGO_URI);
         const connection= mongoose.connection
         connection.on('connected',()=>{
            console.log("MongoDb is connected");
         })

         connection.on('error',(err) =>{
            console.log("MongoDb is not connected"+err);
             process.exit(); 
        })

    }
    catch(error){
         console.log("something went wrong");
         console.log(error);            
    }
}