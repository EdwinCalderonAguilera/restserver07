const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        } );

        console.log('conectado a la BDD');
        

     } catch (error) {
         throw new Error('error al iniciar esa cosa del server');
     }


}


module.exports = {
    dbConnection
}