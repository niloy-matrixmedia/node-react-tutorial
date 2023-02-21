import Auth from "../Model/UserModel.js"
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";


export const Register = async(req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Auth.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error,"register failed");
    }
}


export const login = async (req, res, next) => {
    try {
        const user = await Auth.findOne({ email: req.body.email })
        if (!user) return next (createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next (createError(400,"wrong password"))

        const token = jwt.sign(
            { id: user._id}, 
            process.env.JWT_KEY);

        const { password,...otherDetails} = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200)
        .json({ details: { ...otherDetails }});
    } catch (err) {
        next(err)

    }
}

export const getUsers = async (req,res,next)=>{
    try {
        const users = await Auth.find();
          res.status(200).json(users)
          
      } catch (err) {
        next(err)
        
    }
}
