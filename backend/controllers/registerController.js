const bcrypt = require("bcrypt");
const { User, validateRegister } = require("../models/userModel.js");
const { Token } = require("../models/tokenModel.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

const registerController = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        
        
        //Check if user with given mail already exists
        let user = await User.findOne({ email: req.body.email });

        if (user && user.verified) {
            return res.status(409).send({ message: "User with given mail already exists" })
        }

        if (user && user.verificationLinkSent) {
            return res.status(400).send({ message: "A verification link has been already sent to this Email" })
        }

        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));

        const hashPassword = await bcrypt.hash(req.body.password, salt);
 


        //save user with Hashed Password
        user = await new User({ ...req.body, password: hashPassword }).save();

        //generate verification token and send an memail 

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(16).toString("hex")
        }).save();


        const url = `${process.env.BASE_URL}/api/user/${user._id}/verify/${token.token}`;

        await sendEmail(user.email, "Verify Email", url);
        user.verificationLinkSent = true;
        await user.save();
        res.status(201).send({ message: `Verification Email Sent to ${user.email}` });

    }
    catch (error) {
        console.error("Error in registation:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = registerController;