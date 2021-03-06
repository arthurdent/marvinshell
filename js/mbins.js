/* 
 * Binaries live here. 
 * Returns 0 on success.
 */

var Builtin = {

	flags: function(stdin, args) {
		var output;
		output = "Flags: ";

		output += getflags(args);

		Terminal.stdout(output + '\n');
		return 0;
	},

	test: function(stdin, args) {
		Terminal.stdout("ARGS: " + args + '\n');
		return 0;
	},

	echo: function(stdin, args) {
		Terminal.stdout(args.join(' ') + '\n');
		return 0;
	},

	pwd: function(stdin, args) {
		Terminal.stdout(active().vars["PWD"] + "\n");
		return 0;
	},

	cd: function(stdin, args) {
		if (!args[0]) {
			active().vars.PWD = active().vars["HOME"];
		}
		else if (active().isDir(args[0])) {
			active().vars.PWD = args[0];
			return 0;
		} 
		else {
			Terminal.stdout("-mash: cd: " +  args[0] + ": no such directory.\n");
			return 1;
		}
	},

}

var Binary = {

	clear: function(stdin, args) {
		if (args[0] == undefined) {
			Terminal.clear();
		}
		return 0;
	},

	env: function(stdin, args) {
		vars = active().vars;

		// List all vars
		Object.keys(vars).forEach(function(k) {
			Terminal.stdout(k+'='+vars[k]+'\n');
		});
		return 0;
	},


	ls: function(stdin, args) {
		
		if (args[0]) {
			if (!active().isDir(args[0])) {
				Terminal.stdout("-mash: cd: " +  args[0] + ": no such directory.\n");
				return 1;
			}
			files = active().getDir(args[0]);
		}
		else {
			files = active().getDir(active().vars.PWD);
		}

		for (fname in files) {
			Terminal.stdout(fname+' ');
		}
		
		Terminal.stdout('\n');

		return 0;
	}

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

