const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');
// const middleware = require("../../middleware/index");
// const Grid = require('gridfs-stream');
// const async = require("async");

// Load User Model
const Product = require('../../models/Product');

// const conn = mongoose.createConnection(require('../../config/keys').mongoURI);

//     let gfs;
//     conn.once('open', () => {
//         // Init stream
//         gfs = Grid(conn.db, mongoose.mongo);
//         gfs.collection('uploads');
//       });


var product1 = {  
  name:"Lorem Ipsum",
  _id:1,
  product_thumb_image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
  product_sku:"Lorem Ipsum",
  product_price:"500",
  product_category:"healthcare",
  product_flavor:"vanilla",
  product_size:"XL",
  product_after_discount:"350",
  product_discount_percentage:"15",
  total_reviews:5,
  product_nutri_info:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",

  }
var product2 = {  
  name:"Lorem Ipsum",
  _id:1,
  product_thumb_image:"https://images.unsplash.com/photo-1525093996726-e6bcd6db395a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  product_sku:"Lorem Ipsum",
  product_price:"700",
  product_category:"protein diet",
  product_flavor:"chocolate",
  product_size:"XXL",
  product_after_discount:"450",
  product_discount_percentage:"25",
  total_reviews:1,
  product_nutri_info:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  
}
var products = [product1,product2]

// @route   GET api/news/test
// @desc    Tests news route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'News Works' }));

// @route   GET api/news
// @desc    Get current users profile
// @access  Private
router.get(
  '/all',
  (req, res) => {

    res.json(products)
  //   Product.find().sort({post_date:1}).populate("added_by")
  //     .then(news => {
  //       if (!news) {
  //         errors.nonews = 'There is no news';
  //         return res.status(404).json(errors);
  //       }
  //       res.json(news);
  //     })
  //     .catch(err => res.status(404).json(err));
  });

// @route   GET api/news/:id
// @desc    Get  news ID
// @access  Public




// router.post('/update/:id', middleware.checkToken,async (req, res) => {
//   const errors = {};
//   // console.log("inside update")
//   News.findById(req.params.id)
//     .then(news => {
//       // if (news) {
//         // Update
//         news.headline= req.body.headline;
//         news.description= req.body.description;
//         news.author= req.body.author;
//         news.added_by= req.body.added_by;
//         news.tags= req.body.tags;
//         news.category= req.body.category;
//         // news.photo_download_url= req.file.filename;
//         if(typeof req.body.photo_download_url !== 'undefined'){ news.photo_download_url= req.body.photo_download_url}
//         // console.log("news-----")
//         // console.log(news);
//         News.findByIdAndUpdate(
//          news._id,
//           news,
//           { new: true }
//       ).then(news => res.json(news));
//     })
//     .catch(err =>{
//       // console.log(err)
//       res.status(404).json({ nouserfound: 'No news found with that ID' })
//     }).then();
//     // .catch(err =>
//     //   res.status(404).json({ news: 'There is no news present' })
//     // );
// });

// @route   POST api/news/add
// @desc    Create news
// @access  Private
// router.post(
//   '/add',middleware.checkToken,
//   (req, res) => {
//     // const { errors, isValid } = validateProfileInput(req.body);

//     // Check Validation
//     // if (!isValid) {
//     //   // Return any errors with 400 status
//     //   return res.status(400).json(errors);
//     // }

//     // Get fields

//     News.findOne({headline : req.body.headline}).then(found=>{
//       if(found)
//         res.status(401).json("News alredy exist")
//       else{
//         const newNews = new Product({
//           headline: req.body.headline,
//           description: req.body.description,
//           author: req.body.author,
//           photo_download_url: req.body.photo_download_url,
//           added_by: req.body.added_by,
//           tags: req.body.tags,
//           category: req.body.category,
//           isTop: req.body.isTop
//         });
    
//         newNews.save().then(news => res.json(news)).catch(err=> res.json("error while creating news"));
      
//       }  
//     })
   
   
//   }
// );

module.exports = router;