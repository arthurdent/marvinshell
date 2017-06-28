# Marvin Shell

Bash-like game/cli-sim written in javascript / jquery. To be embedded in a webpage. Originally inspired by uni.xkcd.com.

When complete, it will have multiple computers, filesystems, and a decent bash clone.

### Complete
* binaries with stdin, stdout, args. (No pipes/redirection yet so stdin is not functional)
* history
* variables
* builtins: echo
* coreutils (filesys): pwd

### In Progress
* coreutils (text): cat
* filesystem (JSON with LocalStorage persistence)
* builtins: cd, unset
* coreutils (file): cp, file, mkdir, mv, rmdir, touch

### Todo
* pipes, redirection
* &&, ||, ;
* builtins: [, alias, history, read, return, set, shift, test, unalias
* coreutils (file): ln, mkfifo, basename, dirname
* coreutils (text): head, tac, tail, wc, femto (nano clone)
* coreutils (shell): (basename, date, dirname, false, pwd, sleep, true, uname, whoami)
* multi-user support
