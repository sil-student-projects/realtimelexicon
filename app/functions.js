var exports = module.exports = {};

exports.makeKey = function(string) {
	var id = "";
	if (typeof(string) == "string" && string == "addEntryInput") {
			for (var i = 0, len = string.length; i < len; i++) {
				id += string.charCodeAt(i);
			}
			return id;
	} else {
		var randomLetter = "";
		for(var i=0; i<10; i++) {
			randomLetter += String.fromCharCode(65+Math.floor(Math.random()*26));
		}
		id = randomLetter + Date.now();
		return id;
	}
}
