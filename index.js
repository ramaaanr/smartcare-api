const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const root = require('./api/index');
const signUp = require('./api/sign-up');
const signIn = require('./api/sign-in');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", root);
app.use("/api/sign-up", signUp);
app.use("/api/sign-in", signIn);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));