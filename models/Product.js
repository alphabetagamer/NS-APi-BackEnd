const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price:{
    type: Number,
    required: true
  },
  joining_date: {
    type: Date,
    default: Date.now
  },
  refer_code:{
    type:String
  },
  referred_code:{
    type: String
  },

  referred_by_name:{
    type: String
  },
  referred_by_phone:{
    type: String
  },
  use_time:{
    type: Number,
    default: 0
  },

  active_time:{
    type: Number,
    default: 0
  },

  wallet_balance:{
    type:Number,
    default:0
  },
  total_news_read:{
    type: Number,
    default: 0
  },

  self_time_redeemed:{
    type: Number,
    dafault: 0
  },
  refer_friend_earning_time:{
    type: Number,
    default: 0
  },

  ad_time:[
    {
      date:{
        type: String
      },
      count:{
        type: Number
      }
    }
  ],
  ad_view:[
    {
      date:{
        type: String
      },
      count:{
        type: Number
      }
    }
  ],
  ad_click:[
    {
      date:{
        type: String
      },
      count:{
        type: Number
      }
    }
  ],
  news_read:[
    {
      date:{
        type: String
      },
      count:{
        type: Number
      }
    }
  ],

  referred_friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      name:{
        type:String
      },
      time_redeemed:{
        type: Number,
        default: 0
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],
  
  redeem_history:[
    {
      name:{
        type: String
      },
      amount:{
        type: Number,
        required: true    
      },
      date: {
        type: Date,
        default: Date.now
      },
      status:{
        type: String
      },
      time_redeemed:{
        type:Number
      },
      total_time:{
        type: Number
      }
    }
  ],

  credit_history:[
    {
      name:{
        type: String
      },
      amount:{
        type: Number,
        required: true    
      },
      date: {
        type: Date,
        default: Date.now
      },
     
      status:{
        type: String
      }
    }
  ],

  total_ads_clicked:{
    type: Number,
    default: 0
  },
  
  total_ads_viewed:{
    type: Number,
    default: 0
  },

  state:{
    type: String,
    required: true
  },

  city:{
    type: String,
    required: true
  },

  gender:{
    type: String,
    enum:["male","female"],
    required: true
  },

  phone:{
    type: Number,
    minlength:10,
    maxlength:10,
    required: true
  },

  device_id: {
    type: String,
    required: true
  },

  total_app_usage_time:{
    type: Number ,
    default: 0
  },

  total_ad_time:{
    type: Number,
    default: 0
  },

  total_earning:{
    type: Number,
    default: 0
  },

  total_withdrawal:{
    type: Number,
    default: 0
  },

  blocked:{
    type: Boolean,
    default: false
  },  
  messages:[
    {
      msg:{
        type: String,
        required:true
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],

  notification:[
    {
      msg:{
        type: String,
        required:true
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],

  paytm:[{
    phone:{
      type:Number,
      required:true
    }
  }],
  bank:[{
    account_holder_name:{
      type:String,
      required:true
    },
    ifsc:{
      type: String,
      required:true
    },
    account_number:{
      type:String,
      required:true
    }
  }],

  favourites: [
    {
      news: {
        type: Schema.Types.ObjectId,
        ref: 'news'
      },
     
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date:{
    type:Date,
    dafault: Date.now
  }

});

module.exports = User = mongoose.model('users', UserSchema);
