const bcrypt = require("bcrypt");
const { User, valdiateLogin, validateLogin } = require("../models/userModel.js");;


const loginController = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);

        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        const user = await User.findOne({ email: req.body.email });
        
        

        if(!user){
            return res.status(401).send({
                message: "Invalid Email"
            })
        }

        //Check password validity using bcrpyt

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(!validPassword){
            return res.status(401).send({
                message: "Invalid Password"
            })
        }

        if(!user.verified){
            return res.status(400).send({
                message: "User is not verified"
            })
        }


        

        const token = user.generateAuthToken();
        // console.log("Setting cookie with token:", token);
        return res.status(200).cookie("authToken",token,{
            httpOnly:false,
            sameSite:"none",
            secure:true,
            expires: new Date(Date.now() + 7 *24 * 60 * 60 * 1000),
        }).send({message:"login successfull"})

    }
    catch (error) {

        console.error("Error in login", error);
        res.status(500).send({message:"Internal Server Error"})
        
    }
}

module.exports = loginController;