const authroutes = require("./authRoutes.routes");

const initRoutes = (app) => {

    app.use('/api/auth',authroutes);
    return app.use('/',(req,res)=>{
        return res.status(401).json('Not found route');
    });
  
}

module.exports = initRoutes;