# Marvin Shell

Bash-like fake cli written in javascript / jquery. To be embedded in a webpage. Inspired by uni.xkcd.com; 
not intended to be as flashy, but a closer mimic to a real bash shell. I have learned a lot about language 
parsing since starting this project a couple of years ago. I plan to rewrite most of this eventually.

### Complete
* Binaries with stdin, stdout, args. (No pipes/redirection yet so stdin is not functional)
* History (Not a perfect mimic yet, but I will revisit history when I rewrite everything else)

### Todo
* Variables
* Pipes, Redirection
* &&, ||, ;
* Some bash builtins ( [, alias, cd, echo, history, pwd, read, return, set, shift, test, unalias, unset)
* Some coreutils file utilities (cp, ln, mkdir, mkfifo (maybe), mv, rm, rmdir, touch)
* Some corutils text utilities ( cat, head, tac, tail, wc)
* Some corutils shell utilities (basename, date, dirname, false, pwd, sleep, true, uname, whoami, yes)
* JSON mock-filesystem. 
* Offer storing filesystem with cookies for (semi) persistency.
