const { json } = require("express");
const { findOne, findOneAndUpdate } = require("../model/studentModel");
const studentModel = require("../model/studentModel");


const createStudent = async(req,res)=>{
    try {
        let data = req.body
        let userId = req.params.userId
        if(Object.keys(data).length===0) return res.status(400).send({status:false,message:"Provide data"})
        let {name,lname,subject,marks} = data

        if(!name) return res.status(400).send({status:false,message:"name is required"})
        if(!lname) return res.status(400).send({status:false,message:"lname is required"})
        if(!subject) return res.status(400).send({status:false,message:"subject is required"})
        if(!marks) return res.status(400).send({status:false,message:"marks is required"})
        let finduser = await studentModel.findOne({name:name,lname:lname,userId:userId,isDeleted:false})
       
      if(finduser){
   
        let duplicateSubject = finduser.subject.filter((x)=>{
            return x.name == subject
        })
     
        
        if(duplicateSubject.length===0){
            let studentData = await studentModel.findOneAndUpdate({name,lname},{$push:{subject:{name:subject,marks:marks}}},{new:true})
            return res.status(201).send({data:studentData,message:"Success"})
        }else{
            let updateMarks = Number(duplicateSubject[0].marks) + Number(marks)
            let studentData = await studentModel.findOneAndUpdate({"subject.name":subject},{$set:{"subject.$.marks":updateMarks}},{new:true})
            return res.status(201).send({data:studentData,message:"Success"})
        }
      
      } else if(finduser === null) {

        let createData = {
            name,lname,subject:[{name:subject,marks:marks}],userId:userId
        }
       
        let studentData = await studentModel.create(createData)
     
        return res.status(201).send({data:studentData,message:"Success"})
      }

        
    } catch (error) {
        console.log("error in create student", error.message);
        res.status(500).send({status:false,message:error.message})
    }
}


const getStudents = async(req,res)=>{
    try {
        let data = req.query
        let userId = req.params.userId
        console.log(userId);
        let {name,subject}=data
        
        if(Object.keys(data).length===0) {
            let findStudents = await studentModel.find({userId:userId, isDeleted:false})
            if(findStudents.length===0) return res.status(404).send({status:false,message:"No data found"})
            return res.status(200).send({status:true,data:findStudents})
        }
    
        let subname = subject
        let filter = {}

   if(name){
    filter.name = name
    filter.userId=userId
   }

   if(subject){
       filter["subject.name"] = subname
       filter.userId=userId
   }
   console.log("77");
   let filterData = await studentModel.find(filter,{isDeleted:false})
   console.log(filterData);
   if(filterData.length===0) return res.status(404).send({status:false,message:"data not found"})
   console.log(filterData);
   return res.status(200).send({status:true,data:filterData})

    } catch (error) {
        console.log("error in getStudent",error.message);

        return res.status(500).send(error.message)
    }
}

const updateStudent = async(req,res)=>{
    try {
        let data = req.body
   let studentId = req.params.studentId
    let {name,lname,subject,marks} = data

    let updateData= {}
    
    if(name){
        updateData.name=name
    }

    if(lname){
        updateData.lname=lname
    }

    if(marks){
        if(!subject) return res.status(400).send({status:false,message:"provide subject details"})
        updateData["subject.$.marks"] = marks
       
     }

    //  if(subject){

    //      updateData["subject.$.name"] = subject
    //  }
    let updateStudent = await studentModel.findOneAndUpdate({$or:[{_id:studentId,"subject.name":subject}],isDeleted:false},updateData,{new:true})
   
     if(!updateStudent) return res.status(404).send({status:false,message:"data not found or deleted.You cannot change subject name "})
    return res.status(200).send({status:true,data:updateStudent})

    } catch (error) {

        console.log(error.message);
    }
}


const delteStudent = async(req,res)=>{
    let studentId = req.params.studentId

    let delteStudent = await studentModel.findOneAndUpdate({_id:studentId,isDeleted:false},{$set:{isDeleted:true}})
    console.log(delteStudent);
    return res.status(200).send({status:true,message:"Data deleted"})

}




module.exports={createStudent,getStudents,updateStudent,delteStudent}