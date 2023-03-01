const cookieParser = require("cookie-parser")
const express = require("express")
const  mongoose  = require("mongoose")
mongoose.set('strictQuery', false);
// require("dotenv").config()
const cors =require("cors")
const route = require("./routes/route.js")
const { dbConnection } = require("./database/db.js");
const multer = require("multer");
const PORT = 5000
const url = "mongodb+srv://Ashish:WeUTlaZDDXnrAyKM@test.ghtltbu.mongodb.net/bonus"

const app = express()

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(multer().any())


app.use("/", route)


dbConnection(url)

app.listen(PORT ,()=>{
    console.log(`server start on port ${PORT}`);
})