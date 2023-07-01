const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./config/mongoose.config')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(
    cors({
        origin: 'http://localhost:3000', 
        credentials: true
    })
)

require('./routes/note.routes')(app)

app.listen(PORT, ()=> {
    console.log(`Server is up on port ${PORT}`)
})