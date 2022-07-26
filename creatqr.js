/**
This is a node gadget for batch generation of QR codes, 
which can easily generate a large number of regular QR codes. 
You need a node environment.
Just set the basic link address and file directory. Come and try it.
*/

const qrCreate = require("qr-image");
const fs = require("fs");
const express = require("express");
const directoryStr = "D:/works/creat-qr-image/";
const pathStr = "https://fanyi.baidu.com/appdownload/download.html?tab=desktop&timestr=";
var app = express();
var server = app.listen(3002);
setTimeout(function() {
	server.close();
}, 30000);


/**
Generate a QR code image according to the given format.
This is just a demo. More rules are up to your needs
*/
clearDir(directoryStr + 'dist/');
setTimeout(function(){
	doCreatcodeimage(pathStr, 202104210201, 200);
},3000)

/**
You can modify the address rules here to meet your needs.
You can also customize the file name of the QR code image
*/

function doCreatcodeimage(url, startstr, num) {	
	for (var i = 0; i < num; i++) {
		var userStr = url + Number(startstr + i);
		var qrimage = qrCreate.image(userStr, {
			ec_level: "M",
			type: "png",
			size: 6,
			margin: 2
		});
		var img = fs.createWriteStream('./dist/' + Number(startstr + i) + '.png');
		qrimage.pipe(img);
		app.get('/getqr', function(req, res) {
			res.writeHead(200, {
				'Content-Type': 'image/png'
			});
		});
	}
}

/**
Help you remove the last generated content of the specified folder
*/
function clearDir(path) {
	console.log(path);
	let files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach((file, index) => {
			let curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				clearDir(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
	}
}
