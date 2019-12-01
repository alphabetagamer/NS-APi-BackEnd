const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/api/products');

// const seeddb = require('./seedDb');
const app = express();



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// DB Config
// const db = require('./config/keys').mongoURI;
// // Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

//   // seeddb();

// // Passport middleware
// app.use(passport.initialize());

// // Passport Config
// require('./config/passport')(passport);


// Use Routes
app.use('/api/products', products);
app.use("/",products)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
