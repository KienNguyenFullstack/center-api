const services = require("../services/authServices");

const login = async (req, res) => {
    try {
        const responsive = await services.loginService(req.body);
        return res.status(200).json(responsive);
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Internal server error",
        })
    }
}

const register = async (req, res) => {
    try {
        const responsive = await services.registerService(req.body);
        return res.status(200).json(responsive);
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Internal server error",
        })
    }
}

const users = async(req,res) => {
    try {
        const responsive = await services.usersService();
        return res.status(200).json(responsive);
    } catch (error) {
        return res.status(500).json({
            code:-1,
            message:"Interal Server Error"
        })
    }
}



module.exports = {
    login,
    register,
    users
}