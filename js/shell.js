function encode(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/  /g, ' &nbsp;');
	str = str.replace(/(\x0D|\n)/g, '&nbsp;<br />');
	return str;
}

/* Is this really how you do things in javascript? */
var Terminal = {

	version: '0.2a',                // Version number, no real purpose
	buffer: '',                     // current text in the shell
	history: [],                    // array of entered history
	histPos: 0,                     // position in history
	cursPos: 0,                     // cursor Position
	PS1: 'wat@do:~$ ',              // bash $PS1
	motd: 'Welcome to MarvinShell', // prints whenn shell starts
	bgColor: '#000700',             // background color
	fgColor: '#15cc15',             // foreground color

	/* Move back one place in history */
	histPrev: function() {
		if (this.histPos > 0) {
			this.histPos -= 1;
			this.buffer = this.history[this.histPos];
			this.cursPos = this.buffer.length;
			this.refresh();
		}
	},

	/* Move forward one place in history */
	histNext: function() {
		if (this.histPos < this.history.length) {
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

	histLine: function() {
		return this.history[this.histPos];
	},

	/* Add a typed character to the shell */
	addChar: function(c) {
		this.buffer = this.buffer.substring(0,this.cursPos) + c + this.buffer.substring(this.cursPos,this.buffer.length);
		this.cursorRight(1);
		this.histMod(this.buffer);
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
		this.refresh();
	},
	
	/* Clear the output of the shell */
	clear: function() {
		$("#shell").html('');
	},

	/* Remove all text from the line to be printed */
	clearBuffer: function(c) {
		this.buffer = '';
		this.cursPos = 0;
		this.histPos = this.history.length - 1;
		this.refresh();
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
		$('#shell').append(this.PS1 + encode(this.buffer) + '<br />');
		this.runCommand(this.buffer);
		
		// Add to history
		if (this.buffer != '') {
			this.histMod(this.buffer);
			this.histPos = this.history.length;
			this.history[this.history.length] = '';
		}

		this.clearBuffer();
		this.refresh();
	},

	/* Initialize the shell. Write the motd, etc. */
	init: function() {
		this.stdout(this.motd + '\nVersion ' + this.version + '\n');
		$('#PS1').html(this.PS1);
		this.refresh();
	},
	
	/* Redraw the output */
	refresh: function() {
		$('#left-input').html(encode(this.buffer.substring(0,this.cursPos)));
		$('#cursor').html(encode(this.buffer.substring(this.cursPos,this.cursPos+1)));
		$('#right-input').html(encode(this.buffer.substring(this.cursPos+1,this.buffer.length)));
		// Special cases for cursor
		if (this.cursPos == this.buffer.length || $('#cursor').html() == ' ') {
			$('#cursor').html('&nbsp;');
		}
		this.scrollToBottom();
	},

	/* Run the command typed in by the user */
	runCommand: function(str) {
		if (str != "") {

			// Retrieve the command.
			var cmd = str.split(" ")[0];
			var args = str.replace(cmd,"").replace(" ","");

			// This whole section is complete hax.
			if (Binary[cmd] != undefined ) {
				this.stdout(Binary[cmd]("",args));
			} else {
				this.stdout("bash: " + str + ": command not found");
			}
		}
	},

	/* Send output to the shell. No unbuffered stderr in this iteration of MarvinShell. */
	stdout: function(str) {
		$('#shell').append(encode(str + "\n"));
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

		Terminal.init();

});
