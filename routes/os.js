
/*
 * GET os
 */

exports.index = function(req, res){
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) {
    res.send(stdout);
  }
  exec("uname -a;cat /etc/*-release", puts);
};