const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `user` WHERE `user_Email`=?",
            [req.body.user_Email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.user_password, row[0].user_password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        //const theToken = jwt.sign({iduser:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            message: "you are in your account",
        });

    }
    catch(err){
        next(err);
    }
}