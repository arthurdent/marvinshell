/*
 * Networking mumbo
 */

function active() {
	return State.active_term();
}

var State = {

	computer    : {
		'127.0.0.1': new Computer(),
	},

	active_term : function() { return this.computer['127.0.0.1'] },

};
