const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user.js");

const router =  new express.Router();
const app = express();

app.use(express.json()); //Setting up our Server to Accept JSON
app.use('*', router);
app.use(express.urlencoded({ extended: false }));

//Server started
app.listen(process.env.APP_PORT, function () {
  console.log("listen on port " + process.env.APP_PORT);
});



//  Connecting to Our Database
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("connected to db")
);

// // Route : POST :  ADD A NEW USER TO THE DATABASE 
router.post("/users ", async (req, res) => {
  
  console.log("-----in POST user: ", req.body);
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    console.log(error);
  }
});



//Route : GET :  RETURN ALL USERS

router.get('/users', async (req, res) => {
  console.log("In find users ")
  try {
      const users = await User.find()
      console.log("users: ", users)
      res.status(200).json({
          users: users,
          message: "Users found successfully"
      })
  } catch (e) {
      res.status(404).send()
  }
})

//Route : PUT : EDIT A USER BY ID 
router.put('/users/:id', async (req, res) => {
  try {
      const userFound = await User.findOne({_id: req.params.id})
      console.log("userFound: ",userFound )
      if(!userFound){
          res.status(404).json({
              message: "Object with these information doesn't exist",
              data: {}
          })
      }
      await User.findByIdAndUpdate({_id: req.params.id}, req.body)
      res.status(200).json({
          message: "Updatedsuccessfully",
          data: {}
      })
  } catch (e) {
      res.status(500).send()
  }
})

//Route : DELETE : REMOVE A USER BY ID  

router.delete('/users/:id', async (req, res) => {
  try {
      const userFound = await User.findOne({_id: req.params.id})
      console.log("userFound: ",userFound )
      if(!userFound){
          res.status(404).json({
              message: "Object with these information doesn't exist",
              data: {}
          })
      }
      await userFound.remove()
      res.status(200).json({
          message: "Deleted successfully",
          data: {}
      })
  } catch (e) {
      res.status(500).send()
  }
})





