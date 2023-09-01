const express = require('express')
const app = express()
const UserModel = require('./models/Users')
const mongoose = require('mongoose')
app.use(express.json())
const cors = require('cors')
app.use(cors())
mongoose.connect('mongodb+srv://akramaffou:akramaffou@cluster0.fna70au.mongodb.net/mern-tuto')
.then((res) => {
    app.listen(3001, () => {
        console.log('server run')
    })
}).catch(err => {
    console.log(err)
})

app.get('/getUsers' , (req,res) => {
         UserModel.find() 
         .then((result) => {
            console.log(result)
            res.json(result)
         })  
         .catch(err => {
            console.log(err ,'########################')
         })
        
    })
app.post('/createUser' , async (req,res) => {
       const user = req.body;
       const newUser  = new UserModel(user);
       await newUser.save()
    })
app.delete('/deleteUser/:id' , async (req,res) => {
    const  id=req.params.id
     UserModel.findByIdAndDelete(id)
     .then(res => {
        console.log(res)
     }).catch(err => {
        console.log(err)
     })
})
   


