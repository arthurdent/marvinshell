$(document).ready(function() {

	// supposedly kills opera backspace, I dunno.
	//$(document).onkeydown = document.onkeypress = function(e) { return $.hotkeys.specialKeys[e.keyCode] != 'backspace'; };

	var key = {};

	// Push a pressed key into the key array.
	$(document).keydown(function(e) {
		
		key[e.which] = true;
		
		// Move cursor left
		if (key[37]) {
			Terminal.cursorLeft(1);
		}

		// Move cursor right
		if (key[39]) {
			Terminal.cursorRight(1);
		}
		
		// Move history back.
		if (key[38]) {
			Terminal.histPrev();
		}

		// Move history forward.
		if (key[40]) {
			Terminal.histNext();
		}


		// Enter key
		if (key[13]) {
			key[13] = false; //prevents corner-case bug
			Terminal.enter();
		}

		// Backspace key
		if (key[8]) {
			key[8] = false; //prevents corner-case bug
			Terminal.backspace();
			// BACKSPACE NO MAKE BROWSER GO BACK!!!1
			e.preventDefault();
			e.stopPropagation();
			return false;
		}

		// Handle CTRL key events
		// TODO: Add ctrl-a, ctrl-e
		if (key[17]) {

			// Cancel: bookmarking, file saving, highlight all
			if (key[68] || key[83] || key[65]) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			
			// Clear screen
			if (key[76]) {
				Terminal.clear();
				e.preventDefault();
				e.stopPropagation();
				return false;
			}

		}
		
		// Delete key
		if (key[46]) {
			Terminal.delChar();
		}
	
	});

	// Delete an upressed key that made it into the array!
	$(document).keyup(function(e) {
		delete key[e.which];
	});

	// Letters, numbers, spacebar
	$(document).keypress(function(e) {
		if (e.which >= 32 && e.which <= 126) {
			Terminal.addChar(String.fromCharCode(e.which));
		}
	});

});
