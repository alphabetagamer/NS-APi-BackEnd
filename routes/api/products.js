const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var product = require("./../../models/Product");
var blog_table=require("./../../models/blog");
var reviews_table=require("./../../models/reviews");
var comments_table=require("./../../models/comments");
var orders=require("../../models/order");
var coupon_table=require("../../models/coupon");
var ObjectId = require('mongodb').ObjectId; 
var deals=require("../../models/deals");
var navbar = require("../../models/navbar");
var jwt_decode = require("jwt-decode");
var user_table = require("../../models/user");
var jwt = require("jsonwebtoken");
var refer=require("../../models/refer");
const keys = require('../../config/keys');
// const passport = require('passport');
var cashback = require('../../models/cashback');
const middleware = require("../../middleware/index");
// const Grid = require('gridfs-stream');
// const async = require("async");
const { check, validationResult } = require('express-validator');
// Load User Model
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
// router.get("/product_details",async(req,res)=>{
//   var prod=await product.find()
//   return res.json(prod)
// });
router.get("/product_details",async(req,res)=>{
  try {
    var cond=[]
    if(req.query.weight){
      cond.push({"weight":req.query.weight})
    }
    if(req.query.goal){
      var summ=[]
      var m_goals=req.query.goal.split(',')
      for(let a of m_goals){
        summ.push({"goal":a})
      }
      cond.push({"goals":{"$in":summ}})
    }
    if(req.query.categories){
      var summ=[]
      var m_goals=req.query.categories.split(',')
      for(let a of m_goals){
        summ.push({"category":a})
      }
      cond.push({"categories":{"$in":summ}})
    }
    if(req.query.price){
      var summ=[]
      var m_goals=req.query.price.split(',')
      cond.push({"price":{$lte:m_goals[1],$gte:m_goals[0]}})
    }
    if(req.query.brand){
      cond.push({"brand_id":req.query.brand})
    }
    if(req.query.rating){
      var summ=[]
      var m_goals=req.query.rating
      cond.push({"price":{$gte:m_goals}})
    }
    console.log(cond)
    if(req.query.sort=="popularity"){
      console.log(cond)
      if(cond.length>0){
      var prod_w=await product.find({'$and':cond}).sort({"rating":1})
      console.log(prod_w)
      res.json(prod_w)
      }
      else{
        var prod_w=await product.find().sort({"rating":1})
      console.log(prod_w)
      res.json(prod_w)
      }
    }
    else if(!req.query.sort){
      if(cond.length>0){
        console.log("empty sort and filter")
        var prod_w=await product.find({'$and':cond})
        console.log(prod_w)
        res.json(prod_w)
        }
        else{
        var prod_w=await product.find()
        console.log(prod_w)
        res.json(prod_w)
        }
    }


  } catch (error) {
    console.log(error)
    res.json(500)
  }
});
// router.get("/product_details/:search/:value?",async(req,res)=>{
//   var prod=await product.find()
//   var a = req.params.search
//   console.log(a)
//   if(req.params.search!==""){
//     if(req.params.search=="weight"){
//       var weight=req.params.value
//       var prod_w=await product.find({"weight":weight})
//       return res.json(prod_w)
//     }
//     else if(req.params.search=="goal"){
//       var go=req.params.value
//       var prod_g=await product.find({"goals":{"$in":[{"goal":go}]}})
//       return res.json(prod_g)
//     }
//     else if(req.params.search=="brand"){
//       var br=req.params.value
//       var prod_g=await product.find({"brand_id":br})
//       return res.json(prod_g)
//     }
//     else if(req.params.search=="popularity"){
//       var prod_g=await product.find()
//       var arr=[]
//       for (var i =0;i<Object.keys(prod_g).length;i++){
//         arr.push(prod[i])
//       }
//       console.log(arr)
//       prod_sorted=arr.sort(function(a,b){return b["product_id"]-a["product_id"] })

//       return res.json(prod_sorted)
//     }
//     else if(req.params.search=="category"){
//       var go=req.params.value
//       var prod_g=await product.find({"categories":{"$in":[{"category":go}]}})
//       return res.json(prod_g)
//     }
//     else if(req.params.search=="price"){
//       var go=req.params.value
//       var rang=go.split("to")
//       console.log(rang)
//       var prod_g=await product.find({"price":{$lt:rang[1],$gte:rang[0]}})
//       return res.json(prod_g)
//     }

//   }  // return res.json(product_schema)


// });
router.get('/:prodID',async (req, res) => {
  var prod=await product.findOne({'product_id':req.params.prodID});
  var similar=await product.find({"categories":{"$in":prod["categories"]}})
  var review=await reviews_table.find({"product_id":req.params.prodID})
  console.log(similar)
  console.log(prod["categories"])
  res.json({"product":prod,"similar":similar,"reviews":review})
});
router.post("/signup",(req,res)=>{
var number = req.body.mobile_no

console.log(req.body.mobile_no)
if (number.length == 10){
  return res.json({status:"SignedUp"})
}
else{
  return res.json({status:"Incorrect number"})
}

});
router.post("/signup_comp",async(req,res)=>{
  var f_name = req.body.fname
  var l_name = req.body.lname
  var email = req.body.email
  var mob = req.body.mobile
  var name = req.body.username
  try{
  if(req.body.ref.length>0){
    var refer2=await refer.update({referral_code:req.body.ref},{$push:{referred:{user_id:mob}}},(err,created)=>{
      if(err){
        return res.json({status:"Invalid Referral code"})
      }
      else{
        return res.json({status:"referred"})
      }
    });
    var refer2=await refer.create({user_id:req.body.mobile,referral_code:"!@#$"})
  }
}
catch(err){
  console.log("ERROR")
}
  var newuser=await user_table.create({name:{first_name:f_name,last_name:l_name},email:email,referral_code:'ref',mobile:mob,user_id:mob,username:name},(err,created)=>{
    if(err){
      console.log(err)
      return res.json({status:"Unable to signup"})
    }
    else{
      return res.json({status:"signed up"})
    }
  });
  

  });
  router.post("/account_details",middleware.checkToken,async (req,res)=>{
    console.log(req.user._id)
    if(req.body.fname && req.body.lname && req.body.email && req.body.mobile && req.body.username){
    var update = await user_table.update({'_id':req.user._id},{name:{first_name:req.body.fname,last_name:req.body.lname},email:req.body.email,mobile:req.body.mobile,user_id:req.user.mobile,username:req.body.username},function(err,completed){
      if(err){
        res.json({error:err})
      }else{
        return res.json({status:"Success"})
      }
    })
      
  }
  else{
    var up = await user_table.find({"_id":req.user._id})
    return res.json(up)
  }
  });
  router.post("/address_change",middleware.checkToken,async(req,res)=>{
    if(req.body.type=="new"){
    var update =await  user_table.update({'_id':req.user._id},{$push:{address:{state:req.body.state,pin:req.body.pincode,address:req.body.address,name:req.body.name,city:req.body.city,country:req.body.country}}},(err,created)=>{
      if(err){
        res.json({error:err})
      }else{
        res.json({success:true})
      }
    })


    }
    else if(req.body.type=="update"){
      var update = await user_table.update({"_id":req.user._id,'address.name':req.body.name},{$set:{'address.$.state':req.body.state,'address.$.pin':req.body.pincode,'address.$.address':req.body.address,'address.$.name':req.body.name,'address.$.city':req.body.city,'address.$.country':req.body.country}},(err,created)=>{
        if(err){
          res.json({error:err})
        }else{
          res.json({success:true})
        }
      })
  
    }
    else if(req.body.type=="delete"){
      var dele= await user_table.update({"_id":req.user._id},{$pull:{address:{"name":req.body.name}}},function(err,comp){
        if(err){
          res.json(err)
        }
        else{
          res.json({success:"deleted"})
        }
      });
    }
    else{
      res.json({error:"invalid call"})
    }
  });
  router.post("/orders",middleware.checkToken,async(req,res)=>{
    try {
      if(req.body.type=="again"){
        var f=await user_table.update({'_id':req.user._id},{$push:{cart_items:{product_id:req.body.id}}},(err,created)=>{
          if(err){
            res.json({error:err})
          }else{
            res.json({success:true})
          }
        })
      }
      
    } catch (error) {
      
    }
    console.log(req.user)
    var ordes= await orders.find({user_id:req.user.mobile})
    if(ordes.length>0){
    var items =[]
    for (let a of ordes){
      var orders1={}
      for (let c of a["items"]){
      var f= await products.find({product_id:c["product_id"]})
      orders1.a["order_id"]=f

    }
    items.push({items:orders1,details:a})
  }
  return res.json(items)
}
else{
  res.json([])
}
 
});
router.post("/coupon",async (req,res)=>{
  var coupon=req.body.coupon
  console.log(coupon)
  var check= await coupon_table.findOne({'coupon_code':coupon})
  if(check==null){
    res.json({status:"Invalid"})
  }
  else{
    res.json(check)
  }

});
router.post("/coupon_page",middleware.checkToken,async(req,res)=>{
var f= await coupon_table.find({$or:[{select_user:{user_id:req.user.mobile}},{'coupon_type.all_user':true}]})
return res.json(f)
});
router.post("/wishlist",middleware.checkToken,async(req,res)=>{
  try{
  if(req.body.type=="cart"){
    var item=req.body.product_id
    var f=await user_table.update({'_id':req.user._id},{$push:{cart_items:{product_id:req.body.id}}},(err,created)=>{
      if(err){
        return res.json({error:err})
      }else{
        return res.json({success:true})
      }
    })
  }
  if(req.body.type=="remove"){
    var item=req.body.product_id
    var f=await user_table.update({'_id':req.user._id},{$pull:{cart_items:{product_id:req.body.id}}},(err,created)=>{
      if(err)
      {
        res.json({error:err})
      }else{
        res.json({success:true})
      }
    });
  }
}
catch(err){
  console.log(err)
}
  var wishlist_items=await user_table.findOne({'_id':req.user._id})
  var wishlist_items = wishlist_items["wishlist"]
  var items=[]
  for(let a of wishlist_items){
    var f=await products.find({product_id:a["product_id"]})
    items.push(f)
  }
  return res.json(items)
});
router.post("/cashback",async(req,res)=>{
try{
  var g =await cashback.find({user_id:req.body.mobile})
  return res.json(g)
}
catch(err){
console.log(err)
}
});
router.post("/checkout", async (req,res)=>{
try {
var state = req.body.state 
var city = req.body.city
var address = req.body.address
var pincode = req.body.pincode
var payment_method = req.body.payment_method
var user = req.body.user
var items = req.body.user
var items_re=[]
for (let a of items)
{
items_re.push({"vendor_id":a[0],"product_id":a[1]})
}
var date = req.body.date
var total = req.body.total
var coupon_cashback= req.body.cashback
var tax = req.body.tax
var discount = req.body.discount
var tot={"net_total":total,"tax":tax,"discount":discount,"cashback":coupon_cashback}
var add={address:address,city:city,pincode:pincode,state:state}
var insert_order=await orders.create({user_id:user,items:items_re,total:tot,order_date:date,payment_method:payment_method,state:"ongoing",address:add})
// var insert_order=await orders.create({user_id:user})

res.json({success:insert_order.id})
} catch (error) {
  res.json({error:error})
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
router.post("/login",[check('mobile',"please enter a valid 10 digit phone number").isLength({min:10})],async (req,res)=>{
  var login_c=await user_table.findOne({mobile:req.body.mobile})
  console.log(login_c)
  var errors={};
  if(login_c){
    const payload = { id: login_c.id, mobile:login_c.mobile }; // Create JWT Payload
       // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 360000 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
  }
  else {
    errors.password = 'Password incorrect';
    return res.status(400).json(errors);
  }
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
router.post("/topseller",async (req,res)=>{

  var best = await orders.find({})
  var products_sold=[]
  console.log(best)
  for(let a of best){
  for(let b of a["items"]){
    products_sold.push(b["product_id"])
  }
}
 var counts={}
 for (var i = 0; i < products_sold.length; i++) {
  var num = products_sold[i];
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}
var items = Object.keys(counts).map(function(key) {
  return [key, counts[key]];
});
items.sort(function(first, second) {
  return second[1] - first[1];
});
console.log(items)
var products=[]
for (let a of items){
// var obj ={}
// var name=a[0]
// obj[name]=a[1]
// products.push(obj)
var prod = await product.find({product_id:a[0]})
products.push(prod)
}
res.json(products)
});
router.post("/banner",async(req,res)=>{
  var date = req.body.date
  var offers= await deals.find({date:date})
  res.json(offers)
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
  try {
    var cond=[]
    if(req.query.categories){
      var summ=[]
      var m_goals=req.query.categories.split(',')
      for(let a of m_goals){
        summ.push({"category":a})
      }
      console.log(summ)
      cond.push({"categories":{"$in":summ}})
    }
    if(req.query.rating){
      var summ=[]
      var m_goals=req.query.rating
      cond.push({"views":{$gte:m_goals}})
    }
    if(req.query.sort=="popularity"){
      console.log(cond)
      if(cond.length>0){
      var prod_w=await blog_table.find({'$and':cond}).sort({"views":1})
      console.log(prod_w)
      res.json(prod_w)
      }
      else{
        var prod_w=await blog_table.find().sort({"views":1})
      console.log(prod_w)
      res.json(prod_w)
      }
    }
    if(req.query.sort=="date"){
      console.log(cond)
      if(cond.length>0){
      var prod_w=await blog_table.find({'$and':cond}).sort({"publish_date":1})
      console.log(prod_w)
      res.json(prod_w)
      }
      else{
        var prod_w=await blog_table.find().sort({"publish_date":1})
      console.log(prod_w)
      res.json(prod_w)
      }
    }
    else{
      if(cond.length>0){
        var prod_w=await blog_table.find({'$and':cond})
        console.log("empty cat"+prod_w)
        res.json(prod_w)
        }
        else{
          var prod_w=await blog_table.find()
        console.log(prod_w)
        res.json(prod_w)
        }
    }


  } catch (error) {
    console.log(error)
    res.json(500)
  }
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
router.post("/blog/:blogID/post_comment",middleware.checkToken,(req,res)=>{

  var comment=req.body.comment
  var blog_id=req.params.blogID
  var replyTo=-1
  var date=req.body.date
  var email=req.user.email
  try{if(req.body.replyTo){
    replyTo=req.body.replyTo
  }}catch(err){console.log(err)}
  var add_c = comments_table.create({blog_id:blog_id,text:comment,user_id:req.user._id,parent_comment_id:replyTo,username:req.user.username},function(err,completed){
    if(err){
      res.json(err)
    }else{
      res.json({success:true})
    }
  })
});
router.post("/navbar",async(req,res)=>{
  var nav = await navbar.find()
  res.json(nav)
});
router.get("/blog/:blogID",async (req,res)=>{
  var blogs= await blog_table.findOne({blog_id:req.params.blogID});
  var similar=await blog_table.find({"categories":{"$in":blogs["categories"]}})
  var comments_blog=await comments_table.find({"blog_id":req.params.blogID})
  console.log(similar)
  console.log(blogs["categories"])

  res.json({"blogs":blogs,"similar":similar,"comments":comments_blog})

});
router.post("/header",middleware.checkToken,async(req,res)=>{
if(req.user._id){
  var user = req.user._id
var sum_wishlist=user_table.findOne({"_id":user},function(err,results){
  if(err){
    res.json(err)
  }else{
    var wishl=results.wishlist.length
    var cart = results.cart_items.length
    // console.log(results)
    // console.log(wishl)
    // console.log(cart)

    res.json({wishlist_no:wishl,cart_no:cart})
  }
})
}
else{
  res.json({status:"Not logged in"})
}
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
