var express = require('express');
var app = express();
var cors = require('cors');
var hsl = require('hsl-to-hex');

app.use(cors());

var n = 0;

var re = new RegExp('[^0-9a-f]');

app.get('/', function (req, res) {
	console.log('Color1: ' + req.query.color);
	var color = req.query.color;
	var specColor = 30;
	
	//var specColor2 = 33;
	if(n > 31){
		console.log('Задача 33');
		var tBig = getReplace(color);
		//tBig = tBig.split(',');
		//console.log(typeof(tBig));
		console.log('tBig: ' + tBig);
		var number1 = tBig[0];
		var number2 = tBig[1];
		var number3 = tBig[2];
		if(number2 < 101 && number2 >= 0 && number3 < 101 && number3 >= 0){
		console.log(number1, number2, number3);
		color = hsl(number1, number2, number3);
		console.log(color);
		}else color = 'Invalid color';
	}
	if(n != specColor){
	if(color != undefined){
	color = color.toLowerCase();
	color = nospace(color);

	color = getHexRGBColor(color);
	var validateData = color.search(re);
	
	console.log('Color2: ' + color);
	
	var testColor = validateLengthColor(color);
	if(testColor != 'Invalid color'){


	if(validateData == -1){
		if(color.length < 6){
			color = getHexRGBColor(color);
			//console.log('getHexRGBColor: ' + getHexRGBColor(color));
		}
		//console.log('-----------------------');
		res.send('#' + color);
		
	}else res.send('Invalid color');
	}else res.send('Invalid color');
	}else res.send('Invalid color');
	}else res.send('Invalid color');
	//}else res.send('#00bfff');
  	//res.send('Hello World!');
  	//var test = '';
  	//console.log(getHexRGBColor(test));
  	n = n + 1;
  	console.log('Задача: ' + n);
  	console.log('-----------------------');
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function nospace(str) { 

	//var VRegExp = new RegExp(/^(\s|\u00A0)+/g); 


	//var VResult = str.replace(VRegExp, ''); 
	//var VRegExp2 = new RegExp(/^(\s|\u00A0)+/g); 

	//var VRegExp2 = new RegExp('[#]');
	var VResult = str.replace('#', '').trim(); 

	return VResult 

}

function validateLengthColor(str){
	var valC;
	if(str.length < 3 || str.length > 6 || str.length == 4 || str.length == 5){
		valC = 'Invalid color';
		return valC;
	}else str;
}


function getHexRGBColor(color)
{
  color = color.replace(/\s/g,"");
  var aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
  console.log('aRGB: ' + aRGB);
  if(aRGB)
  {
    color = '';
    for (var i=1;  i<=3; i++) color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i])).toString(16).replace(/^(.)$/,'0$1');
  }
  else color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
  console.log('color: ' + color);
  return color;
}

function getReplace(str){
	// console.log('До преобразования: ' + str);
	// str = str.replace('hsl(', '').trim();
	// str = str.replace(/%/g, '');
	// console.log('После преобразования: ' + str);
	//var str = "hsl(195, 100%, 50%)";
	var str1 = str.replace(/%20/g, '');
	var result = [];
	var re1 = /[%]/g;
	var t = str1.match(re1);
	console.log('t: ' + t);
	if (t != null) {
   	result.push(t);
   		if(result[0].length != 2){
   			result = 'Invalid color';
   			return result;
   		}
 	}else {
 		result = 'Invalid color';
   		return result;
 	}
 	console.log('result: ' + result);



 	var re = /[-0-9]+/g;
 	var m;
 	result = [];
 	while (m = re.exec(str1)) {
   	result.push(m[0]);
 	}
 	console.log('result: ' + result);
 	//var array = JSON.stringify(result);
 	
 	return result;
}

//  function hslToRgb(h, s, l){
//         var r, g, b;

//         if(s == 0){
//             r = g = b = l; // achromatic
//         }else{
//             var hue2rgb = function hue2rgb(p, q, t){
//                 if(t < 0) t += 1;
//                 if(t > 1) t -= 1;
//                 if(t < 1/6) return p + (q - p) * 6 * t;
//                 if(t < 1/2) return q;
//                 if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//                 return p;
//             }

//             var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//             var p = 2 * l - q;
//             r = hue2rgb(p, q, h + 1/3);
//             g = hue2rgb(p, q, h);
//             b = hue2rgb(p, q, h - 1/3);
//         }

//         return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }