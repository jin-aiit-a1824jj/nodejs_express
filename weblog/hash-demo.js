var crypto = require("crypto");

const PASSOWRD_SALT = "YOUR-PASSWORD-SALT";
const PASSWORD_STRETCH = 3;

var digest = function(text) {
  var hash;
  text += PASSOWRD_SALT;
  for(var i = PASSWORD_STRETCH; i--;) {
    hash = crypto.createHash("sha256");
    hash.update(text);
    text = hash.digest("hex");
    console.log(i);
    console.log(text);
  }
  
  return text;
}

digest("qwerty");

// before => qwerty 
// after  => 77d1fb804f4e1e6059377122046c95de5e567cb9fd374639cb96e7f5cc07dba1