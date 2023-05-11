import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/authSchema.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

const JWT_SECRET = 'password changing ...';

app.get('/', (req, res) => {
    res.redirect('/forgot-password')
})

app.get('/forgot-password', (req, res, next) => {
    res.render('forgot-password.ejs')

})

app.post('/forgot-password', async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (email != user.email) {
        res.send('User not registered')
        return;
    }

    const secret = JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id,
    }
    const token = jwt.sign(payload, secret, {expiresIn: '15m'})
    const link = `http:localhost:3000/reset-password/${user.id}/${token}`;
    console.log(link);
    res.send(`Password reset link has been sent to ur email.
              ${link}`)
})

app.get('/reset-password/:id/:token', async (req, res, next) => {
    const { id, token, email } = req.params;
    const user = await User.findOne({ email: value.email });
    if (id !== user.id) {
        res.send('Invalid id')
        return
    }
    const secret = JWT_SECRET + user.password
    try  {
        const payloard = jwt.verify(token, secret)
        res.render('reset-password', {email: user.email})
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
})

app.post('/reset-password/:id/:token', async (req, res, next) => {
    const { id, token, email } = req.params;
    const user = await User.findOne({ email: value.email });
    const { password, password2 } = req.body;
    
    if (id !== user.id) {
        res.send('Invalid id...')
    }
    const secret = JWT_SECRET + user.password
    try {
        const payload = jwt.verify(token ,secret)
        await User.updateOne({ username: req.params.email }, { $set: { password: password } })
        // user.password = password
        res.send(user) 

    } catch (error) {
        console.log(error.message);
        res.send(error.message);

    }
});


app.listen(3000, () => console.log('@http://localhost:3000'));

// const mongoose = require("mongoose");
// app.use(express.json());
// const cors = require("cors");
// app.use(cors());
// const bcrypt = require("bcryptjs");
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// var nodemailer = require("nodemailer");


// const User = mongoose.model("User");

// app.post("/register", async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);
//     try {
//         const oldUser = await User.findOne({ email });

//         if (oldUser) {
//             return res.json({ error: "User Exists" });
//         }
//         await User.create({
//             firstName,
//             lastName,
//             email,
//             password: encryptedPassword
//         });
//         res.send({ status: "ok" });
//     } catch (error) {
//         res.send({ status: "error" });
//     }
// });


// app.post("/login-user", async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ error: "User Not found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
      
  
//       if (res.status(201)) {
//         return res.json({ status: "ok" });
//       } else {
//         return res.json({ error: "error" });
//       }
//     }
//     res.json({ status: "error", error: "Invalid Password" });
// });


// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const oldUser = await User.findOne({ email });
//     if (!oldUser) {
//       return res.json({ status: "User Not Exists!!" });
//     }
//     const secret =  oldUser.password;
//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);
//     const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "@gmail.com",
//         pass: "",
//       },
//     });

//     var mailOptions = {
//       from: "youremail@gmail.com",
//       to: "thedebugarena@gmail.com",
//       subject: "Password Reset",
//       text: link,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     console.log(link);
//   } catch (error) { }
// });

// app.get("/reset-password/:email/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ emaile: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
   
    
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });
