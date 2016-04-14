var exports = module.exports = {};

exports.makeKey = function(string) {
	if (typeof(string) == "string") {
		var id = "";
		for (var i = 0, len = string.length; i < len; i++) {
			id += string.charCodeAt(i);
		}
		return id;
	} else {
		console.log("input was not a string");
	}
}
