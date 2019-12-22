const express = require('express');
const router = express.Router();
var request = require('request');
const mongoose = require('mongoose');
var product = require("./../../models/Product");
var exer = require("../../models/exercise");
var blog_table=require("./../../models/blog");
var reviews_table=require("./../../models/reviews");
var comments_table=require("./../../models/comments");
var orders=require("../../models/order");
var vendor = require("../../models/vendor");
var coupon_table=require("../../models/coupon");
var ObjectId = require('mongodb').ObjectId; 
var deals=require("../../models/deals");
var deals_home=require("../../models/deals_home");
var navbar = require("../../models/navbar");
var jwt_decode = require("jwt-decode");
const Instagram = require('node-instagram').default;
var user_table = require("../../models/user");
var brandtable = require("../../models/brand");
var jwt = require("jsonwebtoken");
var refer=require("../../models/refer");
var testimonial = require("../../models/testimonials");
const keys = require('../../config/keys');
var fs = require('fs');
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

const instagram = new Instagram({
  clientId: '2513681332286663',
  clientSecret: '34b370203713df267ea1e2f0702c8b12',
  accessToken: 'EAAjuLgrjtMcBAK6M4vlR8CoOBF9pJu0O2FDhxLTBgvVAQYfo3TmwaMP6r3qQyFBPUJdHrhLCJ1vFiEyu8o4WRIgJnk2lb9uypypZCyG1hszlRCH89AHF3xOZBEJS5DOETaDKrz2sEATjQavPXy7aSyZBJSwdqvGLnshZBBjRUQzxaYGj3C2YXapgHR5SvMoZD',
});

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
router.post("/post_review",middleware.checkToken, async (req,res)=>{
  if(req.body.type == "new"){
    var dd = new Date();
    var cr = reviews_table.create({product_id:req.body.id,rating:req.body.rating,review_text:req.body.text,author_id:req.user.user_id,date:dd},function(err,comp){
      if(err){
        res.json(err)
      }else{
        res.json({success:true})
      }
    });
    var c = await product.findOne({product_id:req.body.id})
    var f=c.rating.rating
    var g=c.rating.total
    var nf=((f*g)+req.body.rating)/g+1
    var g=g+1
    var m = await product.update({"product_id":req.body.id},{rating:nf,total:g})
  }else if(req.body.type=="delete"){
    var cr = reviews_table.deleteOne({product_id:req.body.id},function(err,comp){
      if(err){
        res.json(err)
      }else{
        res.json({success:true})
      }
    });
    var c = await product.findOne({product_id:req.body.id})
    var f=c.rating.rating
    var g=c.rating.total
    var nf=((f*g)-req.body.rating)/g-1
    var g=g-1
    var m = await product.update({"product_id":req.body.id},{rating:nf,total:g})
  }else if(req.body.type=="edit"){
    var cr = reviews_table.update({product_id:req.body.id},{rating:req.body.rating,review_text:req.body.text,author_id:req.user.user_id},function(err,comp){
      if(err){
        res.json(err)
      }else{
        res.json({success:true})
      }
    });

  }
});
router.post("/tool",(req,res)=>{
  console.log(req.body)
  console.log(req.body.wgl)
  var goal_weight=req.body.goalw
  var age = req.body.inputEmail4
  var name = req.body.name
  var weight = req.body.Weight
  var height = req.body.Height
  var meals = req.body.Meals
  var losegain = req.body.wgl
  var gender = req.body.gender
  var diet= req.body.diet
  var goal = req.body.goal
  var bodyfat=req.body.bodyfat
  var lifestyle = req.body.lifestyle

  var bmr=0
  if(gender=="Female"){
    bmr=10*weight+6.25*height-5*age-161
  }else{
    bmr=9*weight+6.25*height-5*age+5
  }
  if(goal=="Loose Weight"){
    bmr=bmr*0.88
  }
  else{
    bmr=bmr*1.18
  }
  var seed = bmr;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
  var days=[]
  for (var i=0;i<7;i++){
    var day=[]
    for (var c=0;c<meals;c++){
      var cal=bmr/meals
      cal=cal*random()
      // while(Math.floor(cal)<15){
      //   var g=cal*random()
      //   cal=g
      // }
      day.push({calorie:cal})
    }
    days.push(day)
  }
  console.log(days)
  // var options = {
  //   method: 'GET',
  //   url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
  //   qs: {targetCalories: bmr*7, timeFrame: 'week'},
  //   headers: {
  //     'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  //     'x-rapidapi-key': 'e605ec1c2cmshf06bf65422f60f8p19c5bcjsn2785f088e33a'
  //   }
  // };
  var days=[]
  var c =request("https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&apiKey=0aef793f5f7545b9b2d0e623cd8a5dd5&targetCalories="+bmr*7+"&diet="+diet, function (error, response, body) {
    if (error) throw new Error(error);
    var s = body.replace('/',"")
    var f = JSON.parse(s)
    var days=[]
    for(let a of f["items"]){
    var j=JSON.parse(a["value"])
    days.push([{day:a["day"],slot:a["slot"],food:j["title"]}])}
    if(meals==3){
    console.log(days)
  res.json(days)
    }
    else if(meals>3 && meals <=6){
    var k =request("https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&apiKey=0aef793f5f7545b9b2d0e623cd8a5dd5&targetCalories="+bmr*7+"&diet="+diet,function (error, response, body) {
    if (error) throw new Error(error);
    var s = body.replace('/',"")
    var f = JSON.parse(s)
    for(let a of f["items"]){
    var j=JSON.parse(a["value"])
    days.push([{day:a["day"],slot:a["slot"],food:j["title"]}])
    var sort_days=[]
    for(var i=1;i<=7;i++){
    var k=1
    for(let a of days){
    console.log(a[0]["day"])

    if(a[0]["day"]==i && k<=meals){
    a[0]["slot"]=k
    k=k+1
    sort_days.push(a)}}

    }

    }
    res.json(sort_days)
    // res.render("index",{data:sort_days})
    });
}
  });
});
router.post("/instagram",(req,res)=>{
  res.json([{url:"instagram.com",text:"Holla"}]);
});
router.post("/shipping",async(req,res)=>{
  var f = parseInt(req.body.pincode)
  var pro = req.body.product_id
  var k =  await product.findOne({product_id:pro})
  var kk = k.vendor_id
  var f2 = await vendor.findOne({vendor_id:kk})
  for(let b of f2.service_pin){
    if(b.pin==f){
      var c = new Date()
      var end=new Date(c.getTime()+5*60000)
      return res.json({success:"true",start:c,end:end})
      break
    }
  }
  return res.json({success:"false"})
//   if(f2.service_pin.indexOf({pin:f}) == -1){
//     
    
// } else{
  
// }
});
router.post("/insta_posts",(req,res)=>{
  var posts=[]
  var j=0
    var i=0
    var posts=[]
  var a =  request("https://graph.facebook.com/v5.0/17841407933359107/media?access_token=EAAjuLgrjtMcBAK6M4vlR8CoOBF9pJu0O2FDhxLTBgvVAQYfo3TmwaMP6r3qQyFBPUJdHrhLCJ1vFiEyu8o4WRIgJnk2lb9uypypZCyG1hszlRCH89AHF3xOZBEJS5DOETaDKrz2sEATjQavPXy7aSyZBJSwdqvGLnshZBBjRUQzxaYGj3C2YXapgHR5SvMoZD",function(err,response,body){
  if(err){
    res.json(err)
  }  
     var k = body.replace("/","");
     var g=JSON.parse(k)
     var dat =g.data
     var i=0
    accountdata(g.data);
});
function accountdata(a){
  for( i=0;i<5;i++){
    gj=a[i]
    var post= request("https://graph.facebook.com/"+gj.id+"?fields=id,media_type,media_url,owner,timestamp&access_token=EAAjuLgrjtMcBAK6M4vlR8CoOBF9pJu0O2FDhxLTBgvVAQYfo3TmwaMP6r3qQyFBPUJdHrhLCJ1vFiEyu8o4WRIgJnk2lb9uypypZCyG1hszlRCH89AHF3xOZBEJS5DOETaDKrz2sEATjQavPXy7aSyZBJSwdqvGLnshZBBjRUQzxaYGj3C2YXapgHR5SvMoZD", function(err,response,body){
      if(err){
        res.json(err)
      } 
      var k1 = body.replace("/","")
      var g1=JSON.parse(k1)
     call(g1);
    });
    function call(g1){
      j=j+1
      console.log(j)
      posts.push(g1)
      if(j==5){
        res.json(posts)
      }
    }
  }
}
    

});
router.post("/side_banner",(res,req)=>{
res.json([{image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",url:"abc.com"}])
});
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
    if(req.query.category){
      var summ=[]
      var m_goals=req.query.category
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
    if(req.query.sort=="popularity" || req.query.sort=="rating" ){
      console.log(cond)
      if(cond.length>0){
      var prod_w=await product.find({'$and':cond}).sort({"rating":1})
      console.log(prod_w)
      res.json(prod_w)
      }
      else{
        var prod_w=await product.find().sort({"rating":1})
      res.json(prod_w)
      }
    }
    else if(req.query.sort=="priceh"){
      if(cond.length>0){
        var prod_w=await product.find({'$and':cond}).sort({"current_price":1})
        console.log(prod_w)
        res.json(prod_w)
        }
        else{
          var prod_w=await product.find().sort({"current_price":1})
        res.json(prod_w)
        }
    }      
    else if(req.query.sort=="pricel"){
      if(cond.length>0){
        var prod_w=await product.find({'$and':cond}).sort({"current_price":-1})
        console.log(prod_w)
        res.json(prod_w)
        }
        else{
          var prod_w=await product.find().sort({"current_price":-1})
        res.json(prod_w)
        }
    }          
    else if(req.query.sort=="discount"){
      if(cond.length>0){
        var prod_w=await product.find({'$and':cond}).sort({"discount":-1})
        console.log(prod_w)
        res.json(prod_w)
        }
        else{
          var prod_w=await product.find().sort({"discount":-1})
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
router.post("/list", async (req,res)=>{
  if(req.body.type=="blog"){
    var goals=[]
   var blo=await blog_table.find()
   for(let a of blo){
    for(let b of a.categories){
      if(goals.indexOf(b.category)==-1){
        goals.push(b.category)
      }
    }
  }
  res.json({category:goals})
  }
  else if(req.body.type=="products"){
    var prods = await product.find()
    var prices=prods.map(prods => prods.current_price).filter((value, index, self) => self.indexOf(value) === index)
    var weights=prods.map(prods => prods.weight).filter((value, index, self) => self.indexOf(value) === index)
    var cate=prods.map(prods => prods.prime_category).filter((value, index, self) => self.indexOf(value) === index)
    var brand=prods.map(prods => prods.brand).filter((value, index, self) => self.indexOf(value) === index)
    var goals=[]
    for(let a of prods){
      for(let b of a.goals){
        if(goals.indexOf(b.goal)==-1){
          goals.push(b.goal)
        }
      }
    }
    res.json({"prices":prices,"weights":weights,cate:cate,brand:brand,goals:goals})
  }
});
router.get('/:prodID',async (req, res) => {
  var wish="false"
  if(typeof header !== 'undefined') {
    const header = req.headers['authorization'];

    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    const decoded = jwt_decode(token);
    var g=await user_table.findById(decoded.id)
    for(let f of g.wishlist){
      if(f.product_id==req.params.prodID){
        wish="true"
        break
      }
    }
  }
  var prod=await product.findOne({'product_id':req.params.prodID});
  var similar=await product.find({"categories":{"$in":prod["categories"]}})
  var review=await reviews_table.find({"product_id":req.params.prodID})
  var brandf = brandtable.find({brand_id:prod.brand_id})
  console.log(similar)
  console.log(prod["categories"])
  var rati={"1":0,"2":0,"3":0,"4":0,"5":0}
  for(let a of review){
    rati[a.rating]=rati[a.rating]+1
  }
  res.json({"product":prod,"similar":similar,"reviews":review,"graph":rati,brand:brandf.name,wishlist:wish})
});
router.post("/testimonial",async(req,res)=>{
  var s=testimonial.find()
  res.json(s)
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
// router.post("/tool",(req,res)=>{
//   console.log(req.body)
//   console.log(req.body.wgl)
//   var goal_weight=req.body.goalw
//   var age = req.body.inputEmail4
//   var name = req.body.name
//   var weight = req.body.Weight
//   var height = req.body.Height
//   var meals = req.body.Meals
//   var losegain = req.body.wgl
//   var gender = req.body.gridRadios
//   var diet= req.body.inlineRadioOptions2
//   var goal = req.body.inlineRadioOptions
//   var bodyfat=req.body.inlineRadioOptions3
//   var lifestyle = req.body.inlineRadioOptions4

//   var bmr=0
//   if(gender=="Female"){
//     bmr=10*weight+6.25*height-5*age-161
//   }else{
//     bmr=9*weight+6.25*height-5*age+5
//   }
//   if(goal=="Loose Weight"){
//     bmr=bmr*0.88
//   }
//   else{
//     bmr=bmr*1.18
//   }
//   var seed = bmr;
// function random() {
//     var x = Math.sin(seed++) * 10000;
//     return x - Math.floor(x);
// }
//   var days=[]
//   for (var i=0;i<7;i++){
//     var day=[]
//     for (var c=0;c<meals;c++){
//       var cal=bmr/meals
//       cal=cal*random()
//       // while(Math.floor(cal)<15){
//       //   var g=cal*random()
//       //   cal=g
//       // }
//       day.push({calorie:cal})
//     }
//     days.push(day)
//   }
//   console.log(days)
//   // var options = {
//   //   method: 'GET',
//   //   url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate',
//   //   qs: {targetCalories: bmr*7, timeFrame: 'week'},
//   //   headers: {
//   //     'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
//   //     'x-rapidapi-key': 'e605ec1c2cmshf06bf65422f60f8p19c5bcjsn2785f088e33a'
//   //   }
//   // };
//   var c =request("https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&apiKey=0aef793f5f7545b9b2d0e623cd8a5dd5&targetCalories="+bmr*7, function (error, response, body) {
//     if (error) throw new Error(error);
//     console.log(body)
//   res.json(body)
//   });
// });
router.post("/toolshort",(req,res)=>{
  console.log(req.body)
  console.log(req.body.wgl)
  var age = req.body.inputEmail4
  var gender = req.body.gridRadios
  var diet= req.body.inlineRadioOptions2
  var goal = req.body.inlineRadioOptions
  var bmr=0
  if(gender=="Female"){
    bmr=9*60+6.25*150-5*age-161
  }else{
    bmr=10*75+6.25*175-5*age+5
  }
  if(goal=="Loose Weight"){
    bmr=bmr*0.88
  }
  else{
    bmr=bmr*1.18
  }
  var c =request("https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=week&apiKey=0aef793f5f7545b9b2d0e623cd8a5dd5&targetCalories="+bmr*7, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body)
  res.json(body)
  });
  
});
router.post("/signup_comp",async(req,res)=>{
  var f_name = req.body.fname
  var l_name = req.body.lname
  var email = req.body.email
  var mob = req.body.mobile
  var name = req.body.username
  var ref = new mongoose.mongo.ObjectId()
  var newId = new mongoose.mongo.ObjectId();
  var wallet_id= new mongoose.mongo.ObjectId();
  try{
  if(req.body.ref){
    var newuser=await user_table.create({name:{first_name:f_name,last_name:l_name},email:email,referral_code:ref,mobile:mob,user_id:newId,username:name,wallet:{wallet_id:wallet_id}},function(err,created){
      if(err){
        console.log(err)
        return res.json({status:"Unable to signup"})
      }
      else{
        console.log(created)
        
        var refer2= refer.create({user_id:created.user_id,referral_code:ref})
        var re= refer.update({referral_code:req.body.ref},{$push:{referred:{user_id:created.user_id}}},(err,created)=>{
          if(err){
            console.log(err)
             res.json({status:"Invalid Referral code"})
          }
          else{
             res.json({status:"referred"})
          }
        
        });
      
      }
    });
  }else
  {  var newuser=await user_table.create({name:{first_name:f_name,last_name:l_name},email:email,referral_code:ref,mobile:mob,user_id:newId,username:name,wallet:{wallet_id:wallet_id}},function(err,created){
      if(err){
        console.log(err)
        return res.json({status:"Unable to signup"})
      }
      else{
        console.log(created)
        var refer2= refer.create({user_id:created.id,referral_code:ref})
        return res.json({status:"signed up"})
      }
    });
  }
}
catch(err){
  console.log(err)
}

  });
  router.post("/account_details",middleware.checkToken,async (req,res)=>{
    console.log(req.user.user_id)
    if(req.body.fname && req.body.lname && req.body.email && req.body.mobile && req.body.username){
    var update = await user_table.update({"user_id":req.user.user_id},{name:{first_name:req.body.fname,last_name:req.body.lname},email:req.body.email,mobile:req.body.mobile,username:req.body.username},function(err,completed){
      if(err){
        res.json({error:err})
      }else{
        return res.json({status:"Success"})
      }
    })
      
  }
  else{
    var up = await user_table.find({"user_id":req.user.user_id})
    return res.json(up)
  }
  });
  router.post("/address_change",middleware.checkToken,async(req,res)=>{
    if(req.body.type=="new"){
    var update = user_table.update({"user_id":req.user.user_id},{$push:{address:{state:req.body.state,pin:req.body.pincode,address:req.body.address,name:req.body.name,city:req.body.city,country:req.body.country}}},function (err,created){
      if(err){
        res.json({error:err})
      }else{
        res.json({success:true})
      }
    })


    }
    else if(req.body.type=="update"){
      const update = user_table.update({"user_id":req.user.user_id,'address.name':req.body.name},{$set:{'address.$.state':req.body.state,'address.$.pin':req.body.pincode,'address.$.address':req.body.address,'address.$.name':req.body.name,'address.$.city':req.body.city,'address.$.country':req.body.country}},function(err,created){
        if(err){
          res.json({error:err})
        }else{
          res.json({success:true})
        }
      })
  
    }
    else if(req.body.type=="delete"){
      const dele= await user_table.update({"user_id":req.user.user_id},{$pull:{address:{"name":req.body.name}}},function(err,comp){
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
  router.post("/cart",middleware.checkToken,async(req,res)=>{
    try {
      if(req.body.type=="remove"){
        var pid=req.body.id
        var f=await user_table.update({"user_id":req.user.user_id},{$pull:{cart_items:{product_id:pid}}},(err,created)=>{
          if(err)
          {
            res.json({error:err})
          }else{
            res.json({success:true})
          }
        });
      }
      else if(req.body.type=="add"){
        var pid=req.body.id
        var f= user_table.update({"user_id":req.user.user_id},{$push:{cart_items:{product_id:pid}}},(err,created)=>{
          if(err)
          {
            res.json({error:err})
          }else{
            res.json({success:true})
          }
        });
      }
    } catch (error) {
      console.log(error)
    }
    var f = await user_table.findOne({"user_id":req.user.user_id});
    var items=[]
    console.log(f['cart_items'])
    console.log(f)
    for (let c of f["cart_items"]){
      var k = await product.find({"product_id":c['product_id']})
      items.push(k)
    }
    return res.json(items)
    

  });
  router.post("/product_rec",async(req,res)=>{
    var c = await product.find();
    function shuffle(c) {
      var currentIndex = c.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = c[currentIndex];
        c[currentIndex] = c[randomIndex];
        c[randomIndex] = temporaryValue;
      }
    
      return c
    }
    console.log(c)
    var k = shuffle(c)
  
    res.json(k)
  });
  router.post("/iniwork",middleware.checkToken,async(req,res)=>{
    // var g=request("https://wger.de/api/v2/exercise",function(error,response,body){
    //   var js=JSON.parse(body)
    //   res.json(js)
    // });
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./exe.txt')
    });
   //exer.create({exercise:[{name:"one",muscle:"one"}]})
    lineReader.on('line', function (line) {
      var k=line.split(',')
      var c= exer.findByIdAndUpdate("5df935bda036ad2cb4e62b6e",{$push:{exercise:{name:k[0],muscle:k[1]}}},function(err,comp){
        if(err){
          console.log(err)
        }

      })
    });
    res.json({success:true})
  });
  router.post("/workout",middleware.checkToken,async(req,res)=>{
    // var g=request("https://wger.de/api/v2/exercise",function(error,response,body){
    //   var js=JSON.parse(body)
    //   res.json(js)
    // });
    var c = await exer.findOne({"_id":"5df935bda036ad2cb4e62b6e"})
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var exercise = []
  for (var i =0;i<=9;i++){
    var r=getRandomInt(1,897)
    var h=getRandomInt(8,17)
    var k=c["exercise"][r].toObject()
    k.reps= h
    k["_id"]= undefined
    console.log(k)
    exercise.push(k)
  }
  res.json(exercise)
});
  router.post("/orders",middleware.checkToken,async(req,res)=>{
    try {
      if(req.body.type=="again"){
        var f=await user_table.update({"user_id":req.user.user_id},{$push:{cart_items:{product_id:req.body.id}}},(err,created)=>{
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
    console.log(ordes)
    if(ordes.length>0){
    var items =[]
    for (let a of ordes){
      var orders1={}
      console.log(a)
      for (let c of a["items"]){
      var f= await product.find({product_id:c["product_id"]})
      orders1[a["order_id"]]=f

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
    var f=await user_table.update({"user_id":req.user.user_id},{$push:{cart_items:{product_id:item}}},(err,created)=>{
      if(err){
        return res.json({error:err})
      }else{
        return res.json({success:true})
      }
    })
  }
  if(req.body.type=="remove"){
    var item=req.body.product_id
    var f=await user_table.update({"user_id":req.user.user_id},{$pull:{wishlist:{product_id:item}}},(err,created)=>{
      if(err)
      {
        res.json({error:err})
      }else{
        res.json({success:true})
      }
    });
  }
  if(req.body.type=="add"){
    var item=req.body.product_id
    var f= user_table.update({"user_id":req.user.user_id},{$push:{wishlist:{product_id:req.body.product_id}}},(err,created)=>{
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
  var wishlist_items=await user_table.findOne({"user_id":req.user.user_id})

  var wishlist_items = wishlist_items["wishlist"]
  var items=[]
  for(let a of wishlist_items){
    var f= await product.findOne({product_id:a["product_id"]},function(err,success){
      if(err){
        console.log(err)
        res.json(err)
      }else{
        console.log(success)
      }
    })
    console.log(f)
    items.push(f)
  }
  return res.json(items)
});
router.post("/cashback",middleware.checkToken,async(req,res)=>{
try{
  var g =await cashback.find({user_id:req.user.user_id})
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

var products=[]
for (let a of items){
// var obj ={}
// var name=a[0]
// obj[name]=a[1]
// products.push(obj)
var prod = await product.findOne({product_id:a[0]})
products.push(prod)
}
if(req.body.category){
  var cat=[]
    for(let a of products){
      if(a["prime_category"]==req.body.category){
        
        cat.push(a)
      }
    }
    cat.push([{url:"www.abc.com/products/"+req.body.category}])
    res.json(cat)
}
else{
res.json(products)
}
});
router.post("/brands",async(req,res)=>{
  try {
    if(req.body.brand){
      var c=await brandtable.find({name:req.body.brand})
      res,json(c)
    }
  } catch (error) {
    
  }
});
router.post("/:page/banner",async(req,res)=>{
  var date = req.body.date
  var page = req.param.page
  var offers= await deals.find({date:date,page:page})
  res.json(offers)
});
router.get("/search",async(req,res)=>{
var c = product.find( { $text: { $search: req.query.search } } )
res.json(c)
});
router.post("/deals",async(req,res)=>{
var date = req.body.date
var c = await deals_home.find({date:{$lte:new Date(date)},date_end:{$gte:new Date(date)}},function(err,comp){
  if(err){
    res.json(err)
  }
});
console.log(c)
var items=[]
for(let a of c){
  for (b of a["deal"]){
    var temp= await product.findOne({product_id:b["product_id"]})
    temp["discount"]=b["discount"]
    items.push(temp)
  }
}
res.json({items:items})
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
router.post("/blog/:blogID/post_comment",middleware.checkToken,async (req,res)=>{
if(req.body.type=="new"){
  var id = new mongoose.mongo.ObjectId();
  var comment=req.body.comment
  var blog_id=req.params.blogID
  var dd= new Date();
  var replyTo=-1
  //var date=req.body.date
  var email=req.user.email
  try{if(req.body.replyTo){
    replyTo=req.body.replyTo
  }}catch(err){console.log(err)}
  var add_c = comments_table.create({blog_id:blog_id,text:comment,user_id:req.user.user_id,parent_comment_id:replyTo,username:req.user.username,comment_id:id,date:dd},function(err,completed){
    if(err){
      res.json(err)
    }else{
      res.json({success:true})
    }
  })
}
else if (req.body.type=="delete"){
  var s= await comments_table.remove({"_id":req.body.id},function(err,succ){
    if(err){
      res.json(err)
    }else{
      res.json({success:true})
    }
  })
}
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
if(req.user.user_id){
  var user = req.user.user_id
var sum_wishlist=user_table.findOne({"user_id":user},function(err,results){
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
