const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("DB connection success");
    }
    catch(error) {
        console.log(error);
        console.log('DB connection fail');

    }
}

module.exports = {connection}