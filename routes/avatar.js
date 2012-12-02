
/*
 * GET avatars
 */

exports.img = function(req, res){

  /**
   * Variables.
   */

  var Canvas = require('canvas'),
      canvas = new Canvas(150, 160),
      ctx = canvas.getContext('2d'),
      fs = require('fs'),
      Image = Canvas.Image,
      width = [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350],
      height = [0, 160, 320, 480, 640, 800],
      ar_imgs = [
        {
          "dir"    : __dirname + '/../public/base.jpg',
          "width"  : 2, // in array width[2], width image 450-150
          "height" : 2  // in array height[2], height image 480-160
        },
        {
          "dir"    : __dirname + '/../public/color_overlay.png',
          "width"  : 4,
          "height" : 4
        },
        {
          "dir"    : __dirname + '/../public/mister.png',
          "width"  : 0,
          "height" : 0
        },
        {
          "dir"    : __dirname + '/../public/mouths.png',
          "width"  : 6,
          "height" : 3
        },
        {
          "dir"    : __dirname + '/../public/facial_hair_noses.png',
          "width"  : 8,
          "height" : 3
        },
        {
          "dir"    : __dirname + '/../public/hats_ears.png',
          "width"  : 6,
          "height" : 3
        },
        {
          "dir"    : __dirname + '/../public/eyewear.png',
          "width"  : 5,
          "height" : 3
        },
        {
          "dir"    : __dirname + '/../public/smoking.png',
          "width"  : 4,
          "height" : 2
        }
      ],
      randw = 0,
      randh = 0;

  /**
   * Functions.
   */

  function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  for(var i = 0; i < ar_imgs.length; i++){

    var img = null; // fix memory leak
    var data = fs.readFileSync(ar_imgs[i].dir);
    img = new Image;
    img.src = data;
    randw = getRandomInt(0, ar_imgs[i].width);
    randh = getRandomInt(0, ar_imgs[i].height);
    ctx.drawImage(img, width[randw], height[randh], 150, 160, 0, 0, 150, 160);
    if (i === ar_imgs.length-1) {
      canvas.toBuffer(function(err, buf){
        res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': buf.length});
	 	    res.end(buf);
	    });

    }
  }
};