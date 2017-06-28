/* 
 * Stuff I didn't put in other files (yet?)
 */

function encode(str) {
	if (str == undefined) return;
	str = str + '';
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/  /g, ' &nbsp;');
	str = str.replace(/(\x0D|\n)/g, '&nbsp;<br />');
	return str;
}

/* Is this really how you do things in javascript? */

// Terminal Emulator (mterm)
var Terminal = {

	version: '0.2a',                // Version number, no real purpose
	buffer: '',                     // current text in the shell
	history: [],                    // array of entered history
	histPos: 0,                     // position in history
	cursPos: 0,                     // cursor Position
	bgColor: '#000700',             // background color
	fgColor: '#15cc15',             // foreground color

	/* Move back one place in history */
	histPrev: function() {
		if (this.histPos > 0) {
			this.histMod(this.buffer);
			this.histPos -= 1;
			this.buffer = this.history[this.histPos];
			this.cursPos = this.buffer.length;
			this.refresh();
		}
	},

	/* Move forward one place in history */
	histNext: function() {
		if (this.histPos < this.history.length - 1) {
			this.histMod(this.buffer);
			this.histPos += 1;
			if (this.history[this.histPos] != undefined)
				this.buffer = this.history[this.histPos];
			else
				this.buffer = '';
			this.cursPos = this.buffer.length;
			this.refresh();
		}
	},

	/* Modify history (the ultimate superpower) */
	histMod: function(line) {
		this.history[this.histPos] = line;
	},

	histAppend: function(line) {
		if (this.buffer !== '') {
			this.history.pop();
			if (this.buffer !== this.history[this.history.length-1]) {
				this.history.push(this.buffer);
			}
			this.history.push('');
			this.buffer = '';
			this.histPos = this.history.length-1;
			this.cursPos = 0;
		}
	},

	histLine: function() {
		return this.history[this.histPos];
	},

	/* Add a typed character to the shell */
	addChar: function(c) {
		this.buffer = this.buffer.substring(0,this.cursPos) + c + this.buffer.substring(this.cursPos,this.buffer.length);
		this.cursorRight(1);
		this.refresh();
	},

	/* Remove a character from the left of cursor position in the shell */
	backspace: function() {
		this.buffer = this.buffer.substring(0, this.cursPos-1) + this.buffer.substring(this.cursPos, this.buffer.length);
		this.cursorLeft(1);
		this.refresh();
	},

	/* Delete the character to the right of the cursor position. */
	delChar: function() {
		this.buffer = this.buffer.substring(0, this.cursPos) + this.buffer.substring(this.cursPos+1, this.buffer.length);
		this.histMod(this.buffer);
		this.refresh();
	},

	/* Clear the output of the shell */
	clear: function() {
		$("#shell").html('');
	},

	/* Move the cursor to the left */
	cursorLeft: function(val) {
		if (this.cursPos - val >= 0) {
			this.cursPos -= val;
			this.refresh();
		}
	},

	/* Move the cursor to the right */
	cursorRight: function(val) {
		if (this.cursPos+val <= this.buffer.length) {
			this.cursPos += val;
			this.refresh();
		}
	},

	/* Send command and clear the current line */
	enter: function() {

		// Append to screen
		$('#shell').append(State.active_term().vars.PS1 + encode(this.buffer) + '<br />');
		this.parse(this.buffer);

		// Append to history
		this.histAppend(this.buffer);

		// Redraw
		this.refresh();

	},

	/* Redraw the output */
	refresh: function() {
		//this.histMod(this.buffer);
		$('#left-input').html(encode(this.buffer.substring(0,this.cursPos)));
		$('#cursor').html(encode(this.buffer.substring(this.cursPos,this.cursPos+1)));
		$('#right-input').html(encode(this.buffer.substring(this.cursPos+1,this.buffer.length)));
		// Special cases for cursor
		if (this.cursPos == this.buffer.length || $('#cursor').html() == ' ') {
			$('#cursor').html('&nbsp;');
		}
		this.scrollToBottom();
	},

	parse: function(str) {

		//TODO: - escape sequences (probably can't actually do with regex)

		if (str == '') {
			Terminal.stdout('');
			return;
		}

		// Pretty good regex for tokenizing (doesn't handle escaped quotes)
		var tokens = str.match(/\S+?\=|[^\s"']+|"[^"]*"|'[^']*'/g);

		for (var ti in tokens) {

			if (tokens[ti].charAt(0) !== "'") {
				var varlist = tokens[ti].match(/\$\S+?\b/g);
				for (var vi in varlist) {
					tokens[ti] = tokens[ti].replace(varlist[vi], State.active_term().vars[varlist[vi].replace('$','')] || '');
				}
			}

			tokens[ti] = tokens[ti].replace(/['"]/g,'');

		}

		// Remove empty tokens
		tokens = tokens.filter(function (e) { return e !== ''});

		var cmd = tokens[0];
		var args = tokens.slice(1);

		// Set Var
		if (cmd.slice(-1) == '=') {
			State.active_term().vars[cmd.slice(0,-1)] = args[0];
		}
		// Run builtin
		else if (Builtin[cmd] != undefined) {
			Builtin[cmd]("", args);
		}
		// Run binary
		else if (Binary[cmd] != undefined) {
			Binary[cmd]("", args);
		}
		// ???
		else {
			Terminal.stdout("mash: " + cmd + ": command not found\n");
		}

	},

	/* Send output to the shell. No unbuffered stderr in this iteration of MarvinShell. */
	stdout: function(str) {
		$('#shell').append(encode(str));
	},

	/* Hopefully this works in all browsers, I don't know. 
	 * I left a note to myself about it being broken a while back.
	 */
	scrollToBottom: function() {
		$(document).scrollTop($('#screen').prop('scrollHeight'));
	},

}

// GO GO GO!
$(document).ready(function() {

	State.active_term().init();

});
