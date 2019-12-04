const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var product = require("./../../models/Product"),
    blog_table=require("./../../models/blog");
// const passport = require('passport');
// const middleware = require("../../middleware/index");
// const Grid = require('gridfs-stream');
// const async = require("async");
const { check, validationResult } = require('express-validator');
// Load User Model
const Product = require('../../models/Product');
const conn = mongoose.createConnection(require('../../config/keys').mongoURI);

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
  router.get('/allproducts',async (req, res) => {
      var prod=await product.find();
      res.json(prod)
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
var product_schema={
p_name:"name",
p_vendor:"vendor",
p_desc:"Description",
p_image:[{image_url:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"},{image_url:"https://images.unsplash.com/photo-1566408716503-7f1e65675c41?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"}],
p_main_image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
p_features:[{feature:"feature1"},{feature:"feature2"}],
p_reviews:[
  {name:"username1",date:"2019-07-18T21:33:46.097Z",description:"really good product, a must try!!",rating:"5"},
  {name:"username2",date:"2019-08-12T15:53:46.097Z",description:"it is really good for health",rating:"4"}
    ],
p_areviews:"Uncertain",
p_price:100,
p_dis_price:80,
p_variety:[{variety:"flavor1"},{variety:"flavor2"}],
p_weight:[{weight:100},{weight:200},{weight:500}],
max_quant:2,
p_daily_deal:60,
p_nutri_info:{serve_size:100,serve_cont:20},
p_ingredients:[{ingredient:"water"},{ingredient:"sugar"},{ingredient:"lemon"}],
p_long_desc:"long text",
p_video:[{video_url:"https://www.youtube.com/watch?v=DWlfYOpgFSM"},{video_url:"https://www.youtube.com/watch?v=DQniWOTizpA"}],
p_highlight_review:[ {name:"username1",date:"2019-07-18T21:33:46.097Z",description:"really good product, a must try!!",rating:"5"}],
p_similar:[{similar:"p_id1"},{similar:"p_id2"}],
p_similar_vendor:[{similar:"v_id1"},{similar:"v_id2"}]

}

router.get("/product_details",async(req,res)=>{

  return res.json(product_schema)


});
router.get('/:prodID',async (req, res) => {
  var prod=await product.findOne({product_id:req.params.prodID});
  res.json(prod)
});
router.post("/signup_verify",(req,res)=>{
var number = req.body.mobile_no
console.log(req.body.mobile_no)
if (number.length == 10){
  return res.json({status:"SignedUp"})
}
else{
  return res.json({status:"Incorrect number"})
}

});

var header = {
link:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
}
router.post("/header_api",(req,res)=>{
return res.json(header)
});

router.post("/email_api",[
  check('email','Please include a valid email').isEmail(),
  check('password',"Pleas enter a valid password").isLength({min:8})
],(req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
  return  res.status(400).json({errors:errors.array()})

}
return res.json({status:"SignedUP"})
});
// @route   GET api/news/:id
// @desc    Get  news ID
// @access  Public
router.post("/forgot_pass",check("email","Please input correct email").isEmail(),(req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return  res.status(400).json({errors:errors.array()})

  }
  return res.json({status:"Working on finding your account"})
});

var blog_listing={
  banner:[{
    banner:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"},{
    banner:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
  }],
  blog_item:[{
    blog_image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
    blog_title:"Lorem Ipsum",
    blog_short_desc:"Lorem Ipsum",
    blog_category:[{category:"Fitness"},{category:"Health"}],
    blog_date:"2019-07-18T21:33:46.097Z"
  },{
    blog_image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
    blog_title:"Lorem Ipsum",
    blog_short_desc:"Lorem Ipsum",
    blog_category:[{category:"Fitness"},{category:"Health"}],
    blog_date:"2019-07-18T21:33:46.097Z"
  }],
  top_blogs:[{blog:"www.blog.com",views:100},{blog:"www.blog2.com",views:300}]
}
router.get("/blog/blog_list",async (req,res)=>{

  var blogs= await blog_table.find();
  res.json(blogs);
});
blog_details={
  blog_image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
  blog_category:[{category:"Fitness"},{category:"Health"}],
  blog_title:"Lorem Ipsum",
  blog_text:"Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
  top_blogs:[{blog:"www.blog.com",views:100},{blog:"www.blog2.com",views:300}],
  blog_comments:[{comment:"Great blog",author:"Sam cook",date:"2019-07-18T21:33:46.097Z",comment_id:"1",user_avatar:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"},{comment:"superb blog",author:"rachel cook",date:"2019-07-18T21:33:46.097Z",comment_id:"2",user_avatar:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"}],
  similar_blogs:[{category:"Health",blogs:[{blog:"www.blog3.com"},{blog1:"www.blog4.com"}]}]

}
router.post("/blog/:blogID/post_comment",(req,res)=>{
  var username = req.body.username
  var comment=req.body.comment
  var blog_id=req.params.blogID
  var replyTo=""
  var date=req.body.date
  var email=req.body.email
  if(req.body.replyTo){
    replyTo=req.body.replyTo
  }
  return res.json({
    user:username,
    user_comment:comment,
    blog_id:blog_id,
    date:date,
    email:email
  })
});
router.get("/blog/:blogID",async (req,res)=>{
  var blogs= await blog_table.findOne({blog_id:req.params.blogID});
  res.json(blogs)

});

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