const express = require("express")
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cors = require("cors")
const AdminRoute = require("./routes/AdminRoute")
const UserRoute = require("./routes/UserRoute")
const PaymentRoute = require("./routes/payment")
require("dotenv").config()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors())

const session=require("express-session");
const passport=require("passport");

const OAuth2Strategy= require("passport-google-oauth2").Strategy;

const userDB= require("./models/googleModel");

const client_id ="1002227653971-qs4oq8q13mhbq6a4m7f8dibsdf7jorqu.apps.googleusercontent.com";
const clientsecret="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";


app.use(cors({ 
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
}));

app.use(express.json());

// setup session
app.use(session({
    secret:"manku1234",
    resave:false,
    saveUninitialized:true
}))

// setup passport

app.use(passport.initialize());
app.use(passport.session());

passport.use(

    new OAuth2Strategy({
        clientID:client_id,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile", "email"]
    },
    
     async(accessToken, refreshToken, profile, done)=>{   
             console.log("profile", profile);
        
        try {
              let user= await userDB.findOne({googleId:profile.id});
              if(!user)
                {
                    user= new userDB({
                        googleId:profile.id,
                        displayName:profile.displayName,
                        email:profile.emails[0].value,
                        image:profile.photos[0].value
                    });
                    await user.save();
                }
                return done(null, user);
        } catch (error) {
            return done(error, null)
        }
     }
)
)

passport.serializeUser((user, done)=>{ 
        done(null, user);
})

passport.deserializeUser((user, done)=>{
     done(null, user);
})

  //initialize google auth login

  app.get("/auth/google", passport.authenticate("google", {scope:["profile", "email"]}));

  app.get("/auth/google/callback", passport.authenticate("google", {
         successRedirect:"http://localhost:5173/home", 
         failureRedirect:"http://localhost:5173/login"

  }))
 

  app.get("/login/success", async(req, res)=>{
     
    console.log("reqqqq", req.user);

    if (req.user)
        {
            res.status(200).json({message:"user Login", user:req.user})
        }
        else 
        {
            res.status(400).json({message:"not Athorized"})
        }


  })

app.get("/logout", (req, res, next)=>{ 
          req.logout(function(err){
             if(err){return next(err)}
             res.redirect("http://localhost:5173/");
          })

})
mongoose.connect(process.env.DONCON).then(() => {
  console.log("database connected!!!");
});
app.use( "/admin" , AdminRoute)
app.use("/user" , UserRoute );
app.use("/api/payment" , PaymentRoute );
app.listen(process.env.PORT,()=>{
  console.log(`server run on ${process.env.PORT} port`)
})
