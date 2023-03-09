const express = require('express');
const User = require('./User');
const cors = require('cors')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const JWT_SECRET = 'Secret@4588';

app.use(cors())
app.use(express.json())

// ROUTE 1: Create a user using: POST "/register". No login required

app.post('/register', [
    body('name', 'Enter a valid name').isLength({ min:3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('phone', 'Enter a valid phone no.').isLength({ min: 10 })
] , async (req,res)=>{
    let success = false;
    // If there are errors then return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try{
        let userIndex = (function(){
          for (let i of User){
            if(i.email === req.body.email){return true}
          }
          return false;
        })();
        if (userIndex === true){
            return res.status(400).json({success, error: 'Sorry a user with this email already exists'})
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new user
        User.push({
            id: User.length,
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone: req.body.phone
        })
        success = true;
        res.json({success, "message":'User successfully registered'});
        console.log("The existing user's are =>", User);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/login". No login required
app.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
  ], async (req, res) => {

    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {email, password} = req.body;
    try {
      // let user = await User.findOne({email});
      let user = (function(){
        for (let i of User){
          if(i.email === email){return i}
        }
        return false;
      })();
      if(user === false){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({success, error: "Please try to login with correct credentials"});
      }
  
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});