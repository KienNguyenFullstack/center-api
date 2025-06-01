const express =  require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const initRoutes = require("./routes/initRoutes.routes");
const {connect} = require("./config/connectDatabase");

// database
connect();

// JSON bady parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

// Routes
initRoutes(app);

// Listening to the server
app.listen(PORT, () => {
    console.log('App is running on port', PORT);
});