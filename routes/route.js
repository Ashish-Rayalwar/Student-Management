const express = require("express")
const { createStudent, getStudents, updateStudent, delteStudent } = require("../controller/studentController")
const { loginUser, logout } = require("../controller/userController")
const { verifyToken, verifyTokenAndAuthorization } = require("../middleware/auth")


const route = express.Router()

route.post("/user/login",loginUser)
route.post("/user/logout",logout)

route.post("/student/user/:userId", verifyTokenAndAuthorization, createStudent )
route.get("/student/user/:userId",verifyTokenAndAuthorization, getStudents )
route.put("/student/:studentId/user/:userId", verifyTokenAndAuthorization, updateStudent )
route.delete("/student/:studentId/user/:userId",verifyTokenAndAuthorization, delteStudent )




route.all("/*",(req,res)=>{
    console.log("Plz enter valid route");
    res.status(400).send({status:false,message:"invalid route"})
})


module.exports = route