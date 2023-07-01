const mongoose = require('mongoose')

//Database name created here in the connection method
mongoose.connect('mongodb://localhost/quill-notes',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("Connected to Quill Note Database")
}).catch((err) => {
    console.log(err)
})