const mongoose = require('mongoose')

module.exports = () => {
    const connectionParams = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    };
    try{
        mongoose.connect('mongodb://localhost:27017/test',connectionParams)

            console.log("Connected to database successfully")
        
    }
    catch(err){
        console.log("error:",err)
        console.log("could not connected")
    }
}
