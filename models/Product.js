const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var product_types = new Schema ({
	id : {
		type : Number,
		unique : true,
    required:true
	},
	category_id:{
		type:Number,
    required:true
	},
	name:{
		type:String,
    required:true
	}
});
var products = new Schema({
	id : {
		type : Number,
		unique : true,
    required:true
	},
	product_type_id:{
		type: Number,
    required:true
	},
	category_id:{
		type:Number,
    required:true
	},
	market_id:{
		type:Number,
    required:true
	},
	shop_id:{
		type:Number,
    required:true
	},
	country_id:{
		type:Number,
    required:true
	},
	name:{
		type:String,
    required:true
	},
	price:{
		type:Number,
    required:true
	},
	discount_price:{
		type:Number
	},
	discount:{

		type:Number,
		min:0,
		max:100
	},
	quantity:{
		type:Number,
    required:true
	},
	views:{
		type:Number
	},
	likes:{
		type:Number
	},
	sort_order:{
		type:Number
	},
	status:{
		type:Number
	}

});
var shops = new Schema({
	id:{
		type:Number,
		unique:true,
    required:true
	},
	market_id:{
		type:Number,
    required:true
	},
	name:{
		type:String,
    required:true
	},
	address:{
		type:String,
    required:true
	},
	product_types_count:{
		type:Number,
    required:true
	},
	product_count:{
		type:Number,
    required:true
	},
	views:{
		type:Number
	},
	photo:{
		type:String
	},
	status:{
		type:Number
	}

});
var admins = new Schema({
	id: {
    type: Number,
    unique: true,
    required:true
  },
  shop_id:{
		type:Number,
    required:true
	},
	name:{
		type:String,
    required:true
	},
	username:{
		type:String,
		unique:true,
    required:true
	},
	phone:{
		type:Number,
		unique:true,
		maxlength:10,
		minlength:10,
    required:true

	},
	email:{
		type:String,
		unique:true,
    required:true
	},
	email_verified_at:{
		type:Date
	},
	password:{
		type:String,
		required:true
	},
	remember_token:{
		type:String
	}

});
var markets = new Schema({
	id:{
		type:Number,
		unique:true,
		required:true
	},
	name: {
    type: String,
    required: true
  	},
  	address: {
    type: String,
    required: true
  	},
  	shops_count: {
    type: Number,
    required: true
  	},
  	products_count: {
    type: Number,
    required: true
  	},
  	photo:{
    type: String
  	},
  	status: {
    type: Number
  	}
});
var countries = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	}
});
var product_option_values= new Schema({
id:{
	type:Number,
	required:true,
	unique:true
},
product_id:{
	type:Number,
	required:true
},
option_id:{
	type:Number,
	required:true
},
option_value_id:{
	type:Number,
	required:true
}
});
var option_values = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	option_id:{
		type:Number,
		required:true
	}
});
var options = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	},
	product_type_id:{
		type:Number,
		required:true
	}
});
var brands = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	}
});
var brand_models = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	},
	product_type_id:{
		type:Number,
		required:true
	},
	brand_id:{
		type:Number,
		required:true
	}
});
var categories = new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	_lft:{
		type:Number,
		required:true
	},
	_rgt:{
		type:Number,
		required:true
	},
	parent_id:{
		type:Number,
		required:true
	},
	top:{
		type:Number,
		required:true
	},
	sort_order:{
		type:Number,
		required:true
	},
	status:{
		type:Number,
		required:true
	},
});
var product_type_m_options=new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	product_type_id:{
		type:Number,
		required:true
	},
	m_option_id:{
		type:Number,
		required:true
	},
	m_option_value_id:{
		type:Number,
		required:true
	}
});
var product_m_option_values=new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	product_type_id:{
		type:Number,
		required:true
	},
	m_option_id:{
		type:Number,
		required:true
	}
});
var m_options= new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	}
});
var m_option_values= new Schema({
	id:{
		type:Number,
		required:true,
		unique:true
	},
	m_option_id:{
		type:Number,
		required:true
	}
});

module.exports = product_types = mongoose.model('product_types', product_types);
module.exports = products = mongoose.model('products', products);
module.exports = shops = mongoose.model('shops', shops);
module.exports = markets = mongoose.model('markets', markets);
module.exports = admins = mongoose.model('admins', admins);
module.exports = countries = mongoose.model('countries', countries);
module.exports = categories = mongoose.model('categories', categories);
module.exports = product_m_option_values = mongoose.model('product_m_option_values', product_m_option_values);
module.exports = m_options = mongoose.model('m_options', m_options);
module.exports = m_option_values = mongoose.model('m_option_values', m_option_values);
module.exports = product_type_m_options = mongoose.model('product_type_m_options', product_type_m_options);
module.exports = product_option_values = mongoose.model('product_option_values', product_option_values);
module.exports = options = mongoose.model('options', options);
module.exports = option_values = mongoose.model('option_values', option_values);
module.exports = brand_models = mongoose.model('brand_models', brand_models);
module.exports = brands = mongoose.model('brands', brands);