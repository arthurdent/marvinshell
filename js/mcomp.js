/*
 * Computer
 */


/* Is this really how you do things in javascript? */

// Computer Object
function Computer() {

	this.vars = {
		PS1: 'wat@dox:~$ ',
		PATH: '/bin',
		PWD: '/home',
		SHELL: '/bin/mash',
		USER: 'neo',
		HOME: '/home/neo',
	}

	this.sys = {
		version: '0.2a',
		motd: 'Welcome to MarvinShell: \'cat /tmp/tutorial\' for further instructions.',
		histPos: 0,
		curPos: 0,
	}

	this.history = [];

	this.filesystem = basic_fs();

	this.init = function() {
		Terminal.stdout(this.sys.motd + '\nVersion ' + this.sys.version + '\n');
		$('#PS1').html(this.vars.PS1);
		Terminal.refresh();
	}

}

// Basic File system
function basic_fs() {

	return {
		'bin' : {
			'type' : 'dir',
			'files' : {
				'ls' : {
					'type' : 'bin',
						'bin'  : 'ls',
				},
					'cd' : {
						'type' : 'bin',
							'bin'  : 'cd',
					},
					'mash' : {
						'type' : 'bin',
							'bin'  : 'mash',
					},
					'femto' : {
						'type' : 'bin',
							'bin'  : 'femto',
					},
			},
		},
		'home' : {
			'type' : 'dir',
			'files' : {
				'neo' : {
					'type' : 'dir',
					'files' : {
						
					},
				},

			},
		},
		'log' : {
			'type' : 'dir',
			'files' : {
				'test' : {
					'type'  : 'ascii',
					'ascii' : 'test file\n',
				},
			},
		},
		'tmp' : {
			'type' : 'dir',
			'files' : {
				'tutorial' : {
					'type'  : 'ascii',
					'ascii' : 'Welcome to the tutorial.\n',
				},
			},
		},
	}

}
