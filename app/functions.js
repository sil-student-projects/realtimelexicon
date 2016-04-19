var exports = module.exports = {};

exports.makeKey = function(string) {
	if (typeof(string) == "string") {
		var id = "";
		if(string == "addEntryInput") {
			for (var i = 0, len = string.length; i < len; i++) {
				id += string.charCodeAt(i);
			}
		}
		else {
			var randomLetter = "";
			for(var i=0; i<10; i++) {
				randomLetter += String.fromCharCode(65+Math.floor(Math.random()*26));
			}
			id = randomLetter + Date.now();
		} //end else
		return id;
	} else {
		console.log("input was not a string");
	}
}
