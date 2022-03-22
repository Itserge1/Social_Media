const express = require("express");
const cors = require('cors')

const app = express();
const port = 8000;

const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path')


//  Using dotenv. (Getting info from .env)
dotenv.config();

const cookieParser = require('cookie-parser'); // so that the server can understand 
// the cookie information that is comming from the client (Browser)

// start the confi file to communicate with the DB - 1
require("./server/config/mongoose.config");
// require("./server/config/jwt.config");

//  important to accept post data(post request) - 2
app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'https://dojosocial.netlify.app/'}));

// sending the app over to the route folder inside the server folder
require("./server/routes/users.routes")(app);
require("./server/routes/auths.routes")(app);
require("./server/routes/post.routes")(app);

// middleware
app.use(helmet());
app.use(morgan("common"));

app.listen( process.env.PORT || port, () => console.log(`Backed Server is Running on port ${port}`) )