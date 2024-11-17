const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
require('./models/db'); 
const authRouter = require("./Routes/authRouter");
const productRouter = require("./Routes/productRouter")

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());


app.use('/auth', authRouter);
app.use('/products', productRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
