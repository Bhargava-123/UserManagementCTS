var mongoose = require("mongoose");


var run = async() => {
    await mongoose.connect("mongodb+srv://bhargavashankar2003:HYd1lPosf8OZDXAG@cluster0.fhdikdq.mongodb.net/UserMangementDB?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("connected"));
}

module.exports = {
    run
}