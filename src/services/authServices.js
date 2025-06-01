const data = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
require("dotenv").config();

const hasPass = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(12));


const loginService = ({ email, password }) => new Promise(async (relsove, reject) => {
    try {
        const responsive = await data.User.findOne({
            where: { email }
        })

        const isPass = responsive && bcrypt.compareSync(password, responsive?.password);
        const token = isPass ? jwt.sign({ id: responsive?.id, username: responsive?.username, avatar: responsive?.avatar, role: responsive?.role }, process.env.SECRET_JWT, { expiresIn: "2d" }) : null

        return relsove({
            code: token ? 0 : 1,
            message: token ? "User login successfully !" : responsive ? "Password is wrong!" : "Account is not exitsed!",
            access_token: token ? token : null
        })

    } catch (error) {
        return reject(error);
    }
})

const registerService = ({ email, password, role = "User", username, avatar = 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=' }) => new Promise(async (resolve, reject) => {
    try {
        console.log(email,password,role,username,avatar)
        const responsive = await data.User.findOrCreate({
            where: { email },
            defaults: {
                id: v4(),
                username,
                password: hasPass(password),
                avatar,
                email,
                role
            }
        })
        return resolve({
            code: responsive[1] ? 0 : 1,
            message: responsive[1] ? "User created successfully" : "User already exists",
        })
    } catch (error) {
        return reject(error);
    }
});

const usersService = () => new Promise(async(relsove,reject)=>{
    try {

        console.log('database before')

        const responsive = await data?.User?.findAll({
            attributes:{
                exclude:['password']
            }
        });
        console.log('database after')
        return relsove({
            code:responsive? 0 : 1,
            message:responsive ? "OK" : "Fail!",
            data: responsive ? responsive : null
        })
    } catch (error) {
        return reject(error);
    }
})
module.exports = {
    loginService,
    registerService,
    usersService
}