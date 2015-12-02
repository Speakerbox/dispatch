exports.init = function(mongoose) {
	mongoose.model('token', require('./token'));
};