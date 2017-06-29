/*
 * Computer
 */

/* Is this really how you do things in javascript? */

// Computer Object
function Computer() {

	this.vars = {
		HOME: '/home/ford',
		PATH: '/bin',
		PS1: 'ford@prefect:~$ ',
		PWD: '/home',
		SHELL: '/bin/mash',
		USER: 'ford',
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

	/* Checks if dir exists and is dir */
	this.isDir = function(path) {
		if (path == '/')
			return true;
		if (path.replace(/^\/|\/$/g,'').split('/').reduce((o,i)=>o.files[i], this.filesystem))
			return true;
		return false;
	}

	/* Returns file object of dir, full path only */
	this.getDir = function(path) {
		return this.getDirMeta(path).files;
	}

	/* Dir meta attributes, full path only */
	this.getDirMeta = function(path) {
		return path.replace(/^\/|\/$/g,'').split('/').reduce((o,i)=>o.files[i], this.filesystem) || this.filesystem;
	}

	/* Add a file to a dir */
	this.addDir = function(dest,name) {
		dest[name] = { 
			'type':'dir',
			'files' : {},
		}
	}

	/* Add a file.
	 * type: bin, ascii
	 * data: binary name or ascii data
	 */
	this.addFile = function(dest,name,ftype,data) {
		dest.files[name] = {
			'type' : ftype,
			'data' : data,
		}
	}

}

// Basic File system
function basic_fs() {

	return {
		'files' : {
			'bin' : {
				'type' : 'dir',
				'files' : {
					'ls' : {
						'type' : 'bin',
						'data'  : Binary.ls,
					},
					'cd' : {
						'type' : 'bin',
						'data'  : Binary.cd,
					},
					/*
					'mash' : {
						'type' : 'bin',
						'data'  : 'mash',
					},
					'femto' : {
						'type' : 'bin',
						'data'  : 'femto',
					},
					*/
				},
			},
			'home' : {
				'type' : 'dir',
				'files' : {
					'ford' : {
						'type' : 'dir',
						'files' : {
						},
					},

				},
			},
			'log' : {
				'type' : 'dir',
				'files' : {
					'syslog' : {
						'type'  : 'ascii',
						'data' : 'test file\n',
					},
				},
			},
			'tmp' : {
				'type' : 'dir',
				'files' : {
					'tutorial' : {
						'type'  : 'ascii',
						'data' : 'Welcome to the tutorial.\n',
					},
				},
			},
		}, 
	}

}
