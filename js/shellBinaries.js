var Binary = {
	   
	/* 
	 * Binaries live here. Anything returned
	 * is printed to "stdout". Don't forget to
	 * add a newline, if the binary prints.
	 */

	flags: function(stdin, args) {
		var output;
		output = "Flags: ";
	
		output += getflags(args);

		return output + '\n';
	},

	test: function(stdin, args) {
		return "ARGS: " + args + '\n';
	},
	
	clear: function(stdin, args) {
		if (args[0] == undefined) {
			Terminal.clear();
		}
		return '';
	}
	/*
	rt: function(args) {
		var re = new RegExp("-[0-9a-zA-Z]*.","g");
		return (re.exec(args) + "").split("");
	},
	*/
	
	

}

/* Flag Helper
 * Usage: 
 * 	getflag("program args", "flag");
 * Ex: getflag(args, "l");
 * 	This will return true if -l, -Al, -ll, -lx, etc. is in args
 */
function getflag(args, flag) {
	var re = new RegExp(".{0}-[0-9a-zA-Z]*"+flag,"g");
	return re.test(args);
}

/* Flag Helper
 * Usage:
 * 	getflags(args);
 * Ex: getflags("-ls --al wat")
 * 	This will return ["-l, "-s", "--al", "wat"]
 */
function getflags(args) {
	var presplit = args.split(" ");
	var oargs = [];

	for (var i = 0; i < presplit.length; i++) {
		if (presplit[i].substring(0,1) == "-" && presplit[i].substring(1,2) != "-") {
			eargs = presplit[i].split("");
			for (var j = 0; j < eargs.length; j++) {
				if (eargs[j] != "-")
					oargs.push("-" + eargs[j]);
			}
		} else {
			oargs = oargs.concat(presplit[i]);
		}
	}

	return oargs;
}

