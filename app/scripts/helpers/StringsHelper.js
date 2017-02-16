var StringsHelper = {
	key : "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare",

	encodeString : function(uncoded){
	  uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
	  var coded = "";
	  var chr;
	  for (var i = uncoded.length - 1; i >= 0; i--) {
	    chr = uncoded.charCodeAt(i);
	    coded += (chr >= 65 && chr <= 90) ?
	      this.key.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) :
	      String.fromCharCode(chr);
	    }
	  return encodeURIComponent(coded);
	},

	validateEmail : function(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	},

	toTitleCase : function(str)
	{
	    var st = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    var stArr = st.split(",");
	    stArr[stArr.length -1] = " " + stArr[stArr.length-1].toUpperCase();

	    return stArr.join(",");
	},

	decodeString : function(coded) {
	  coded = decodeURIComponent(coded);
	  var uncoded = "";
	  var chr;
	  for (var i = coded.length - 1; i >= 0; i--) {
	    chr = coded.charAt(i);
	    uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
	      String.fromCharCode(65 + this.key.indexOf(chr) % 26) :
	      chr;
	    }
	  return uncoded;
	},

	getParameterByName : function(name, url) {
	    if (!url) {
	      url = window.location.href;
	    }
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
}

module.exports = StringsHelper;
