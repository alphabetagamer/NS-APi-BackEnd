var mongoose = require("mongoose"),
    product = require("./models/Product"),
    blog_table=require("./models/blog"),
    orders = require('./models/order'),
    deals = require('./models/deals'),
    navbar = require("./models/navbar")
    cashback = require('./models/cashback')
var blog1 = [{blog_id:1,
title:"Title",
body:"lorem Ipsum",
images:[{
    image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
}],
views:100,
user_id:1,
categories:[{
    category:
        "Health"},{category: "Fitness"}],
publish_date:"2019-07-18T21:33:46.097Z",
likes:[{
    user_id:2
}]
},{blog_id:2,
title:"Title",
body:"lorem Ipsum",
images:[{
    image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
}],
views:100,
user_id:1,
categories:[{
    category:
        "Health"},{category: "Fitness"}],
publish_date:"2019-07-18T21:33:46.097Z",
likes:[{
    user_id:2
}]
},{blog_id:3,
    title:"Title2",
    body:"lorem Ipsum",
    images:[{
        image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
    }],
    views:100,
    user_id:4,
    categories:[{
        category:
            "Health"},{category: "Fitness"}],
    publish_date:"2019-07-18T21:33:46.097Z",
    likes:[{
        user_id:2
    }]
    }];
var prod=[{product_id :2,
name: "Whey Protein2",
vendor_id:3,
price:1800,
discount:20,
images:[{
    image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
,
image_alt_text:"Whey Powder",
image_caption:"Image Caption"
}],
thumbnails:[{
    thumbnail:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
    }],
short_desc:"SHort Description",
long_desc:"The best whey powder in the market",
categories:[{
    category:
        "Health"},{category: "Fitness"}],
flavor:"Strawberry",
other_flavors:[{
    product_id:2,
    flavor:"Banana"
}],
weight:100,
other_weights:[{
    product_id:2,
    weight:200
}],
goals:[{
    goal:"Fitness"
}],
brand_id:2


},{product_id :3,
    name: "Whey Protein2",
    vendor_id:3,
    price:1800,
    discount:20,
    images:[{
        image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
    ,
    image_alt_text:"Whey Powder",
    image_caption:"Image Caption"
    }],
    thumbnails:[{
        thumbnail:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
        }],
    short_desc:"SHort Description",
    long_desc:"The best whey powder in the market",
    categories:[{
        category:
            "Health"},{category: "Fitness"}],
    flavor:"Strawberry",
    other_flavors:[{
        product_id:2,
        flavor:"Banana"
    }],
    weight:100,
    other_weights:[{
        product_id:2,
        weight:200
    }],
    goals:[{
        goal:"Fitness"
    }],
    brand_id:2
    }];
var offers=[{
        deals:
        [{
            url:"url.com",
        image:"https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"}],
    date:"2019-07-18T21:33:46.097Z"
}]
var orders2 = [{
    order_id:1,
    user_id:"5df68a58cca8e623e055646f",
    items:[{
        product_id:2,
        vendor_id:2
    }]
},{
    order_id:2,
    user_id:"5df68a58cca8e623e055646f",
    items:[{
        product_id:2,
        vendor_id:2
    }]
},{
    user_id:"5df68a58cca8e623e055646f",
    order_id:3,
    items:[{
        product_id:2,
        vendor_id:2
    }]
},{
    user_id:"5df68a58cca8e623e055646f",
    order_id:4,
    items:[{
        product_id:1,
        vendor_id:1
    }]
}]
var nv={
    entries:[{
        name:"Protein",
        subentries:[{
            name:"abc",
            url:"abc.com"
        }]
    },{
    name:"Bars",
    subentries:[{
        name:"abc",
        url:"abc.com"
    },{
        name:"abc",
        url:"abc.com"
    }]
}
    ]
}
var ca=[{
    user_id:"5df4cbbabddde052cc6e9887",
    order_id:1,
    wallet_id:"somesrting",
    date:"2019-07-18T21:33:46.097Z",
    amount:100
},{
    user_id:"5df4cbbabddde052cc6e9887",
    order_id:3,
    wallet_id:"somesrting",
    date:"2019-07-18T21:33:46.097Z",
    amount:200
}]
// var user = {name: "Daphnis", email:"daphnis@gmail.com",age:29,refer_code:"daph123", state:"delhi", city:"West delhi",gender:"female",phone:9999999999,device_id:"moto 2011"
//             ,use_time:10,active_time:9,total_news_read:4,refer_friend_earning_time:0,total_ads_clicked:6,total_ads_viewed:4,total_app_usage_time:12,total_ad_time:7,total_earnings:300
//             ,credit_history:[{amount:200,status:"complete"},{amount:100,status:"complete"}],redeem_history:[{amount:250,status:"complete"},{amount:50,status:"complete"}]
//         }

// var employ = {name: "employ 1", email:"employ@gmail.com",state:"haryana", city:"gurugram",gender:"male",salary:"102500",phone:9716822108,isSuper:true}
//  var refermanager = {redeem_amount : 25, redeem_time: 36000};

function seedDB(){
    blog1.forEach(function(seed){
        blog_table.create(seed,(err,created)=>{
            if(err){
                console.log(err)
            } else{
                console.log("refermanager created with id "+ created._id )
            }
        })
    });
    
    prod.forEach(function(seed){product.create(seed,(err,created)=>{
        if(err){
            console.log(err)
        } else{
            console.log("refermanager created with id "+ created._id )
        }
    })});
    offers.forEach(function(seed){deals.create(seed,(err,created)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("refermanager created with id "+ created._id )
        }
    })});
    orders2.forEach(function(seed){orders.create(seed,(err,created)=>{
        if(err){
            console.log(err)
        } else{
            console.log("refermanager created with id "+ created._id )
        }
    })});
    var a=navbar.create(nv)
    console.log(a)
    ca.forEach(function(seed){cashback.create(seed,(err,created)=>{
        if(err){
            console.log(err)
        } else{
            console.log("refermanager created with id "+ created._id )
        }
    })});
    // data.forEach(function(seed){
    //     News.create(seed,function(err,news){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("added a news : "+news._id);
                
    //         }
    //     });
    // }); 
    // User.create(user,function(err,user){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("added a user: " + user._id)
    //     }
    // })

    // Employ.create(employ,function(err,employ){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("added a employ: " + employ._id)
    //     }
    // })
}

module.exports = seedDB;