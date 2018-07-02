
var soundtrack; 
var playbutton
var stopbutton;
var analyzer;
var vol;
var img;
var soundflow = [];
var rotateApple = 0;
var bookHoly;
var r5 = 0;

/* function convertToCsv(fName, rows) {
	var csv = '';
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		for (var j = 0; j < row.length; j++) {
			var val = row[j] === null ? '' : row[j].toString();
			val = val.replace(/\t/gi, " ");
			if (j > 0)
				csv += '\t';
			csv += val;
		}
		csv += '\n';
	}

	// for UTF-16
	var cCode, bArr = [];
	bArr.push(255, 254);
	for (var i = 0; i < csv.length; ++i) {
		cCode = csv.charCodeAt(i);
		bArr.push(cCode & 0xff);
		bArr.push(cCode / 256 >>> 0);
	}

	var blob = new Blob([new Uint8Array(bArr)], { type: 'text/csv;charset=UTF-16LE;' });
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, fName);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) {
			var url = window.URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", fName);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}
	}
} */


 function preload() {
	soundtrack = loadSound('VoyageToAvalon.mp3');
	appleBlue = loadImage('public/Scene1/AppleBlue.png');
	appleRed = loadImage('public/Scene1/AppleRed.png');
	applePinkish = loadImage('public/Scene1/ApplePinkish.png');
	circle = loadImage('public/Scene1/circle.png');
	ALess = loadImage('public/Scene2/ALowDetail.png');
	AMid = loadImage('public/Scene2/AMidDetail.png');
	AMore = loadImage('public/Scene2/AMoreDetail.png');
	AFull = loadImage('public/Scene2/AFullDetail.png');
	TheIsland = loadImage('public/Scene4/TheIsland.png');
	LongingLight = loadImage('public/Scene4/LongingLight.png');
	//bookHoly = loadModel('public/Scene5/book.obj', true, success);
	waterLoop = loadImage('public/Scene5/WaterLoop.png');
	ArthurCircle = loadImage('public/Scene5/KingArthur.png');
  }


function setup() {
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	rectMode(CENTER);

	 // play button
	 playbutton = createButton('Play');
	 playbutton.position(25, 25);
	 playbutton.mousePressed(playsound);
	 
	 // stop button
	 stopbutton = createButton('Stop');
	 stopbutton.position(75, 25);
	 stopbutton.mousePressed(stopsound);

	 analyzer = new p5.Amplitude();
	 analyzer.setInput(soundtrack);
	 fft = new p5.FFT();
}

function draw() {

	
	var vol = analyzer.getLevel();
	var analyze = fft.analyze();
	var bass = fft.getEnergy('lowMid');
	var mid = fft.getEnergy('mid');
	var treb = fft.getEnergy('treble');

	if(soundtrack.currentTime()>=0 && soundtrack.currentTime()<=39){

		push();
		rotateZ(radians(treb*25));
		//rotateZ(radians(treb*6));
		//pass image as texture
		background(237, 233, 230);
		scale(1.3);
		texture(circle);
		translate(0, 0);
		plane(600, 600);
		pop();


		if(treb<6){
			push();
			scale(6/8);
			//rotateZ(radians(treb*6));
			//pass image as texture
			texture(appleBlue);
			translate(0, 0);
			plane(600, 600);
			pop();
		}
		if(treb>=8 && treb<9){
			push();
			scale(9/8);
			//rotateZ(radians(treb*6));
			//pass image as texture
			texture(appleRed);
			translate(0, 0);
			plane(600, 600);
			pop();
		}
		if(treb>=9 && treb<=10){
			push();
			scale(9/8);
			//rotateZ(radians(treb*6));
			//pass image as texture
			texture(applePinkish);
			translate(0, 0);
			plane(600, 600);
			pop();
		}

	}
 
	if(soundtrack.currentTime()>=40 && soundtrack.currentTime()<=90){

		var r = random(-1, 1);
		if(r<-0.5){push();
			background(44, 49, 60);
			scale(1);
			texture(ALess);
			translate(r*treb, 0);
			plane(600, 600);
			pop();}
		if(r>=-0.5 && r>0.5){push();
			background(44, 49, 60);
			scale(1);
			texture(AMid);
			translate(r*treb, 0);
			plane(600, 600);
			pop();}
		if(r>0.5){push();
			background(44, 49, 60);
			scale(1);
			texture(AMore);
			translate(r*treb, 0);
			plane(600, 600);
			pop();}

	} 

	 if(soundtrack.currentTime()>=91 && soundtrack.currentTime()<=100){

		push();
		background(237, 233, 230);
		rect(0,0,5,5);
		rotateZ(radians(rotateApple));
		for (var j = 0; j < 6; j++) {
			push();
			rotate(TWO_PI * j / 6);
			texture(appleBlue);
			rect(300, 0, 60, 60);
			pop();
		}
		translate();
		pop();

		rotateApple += mid/2; 

		push();
		scale(1);
		texture(AFull);
		plane(600, 600);		
		translate();	
		pop();
	}
 

	if(soundtrack.currentTime()>=101 && soundtrack.currentTime()<=131){

		var r2 = random(-1,1);

		push();
		background(44, 49, 60);
		scale(1);
		texture(TheIsland);
		plane(600, 600);		
		translate(0,0);	
		pop();

		push();
		scale(2);
		texture(LongingLight);		
		translate(100+r2*treb,0);
		// rotateY(radians(r2*mid*100));
		plane(600, 600);
		pop();
	}


	if(soundtrack.currentTime()>=132 && soundtrack.currentTime()<=161){

		var r3 = random(-1,1);
		var r4 = Math.round(r3);
		var linesPosition=0;

		push();
		background(231, 197, 194);
		pop();


		while (linesPosition !== 100) {

			push();
			ambientMaterial(231, 197, 194);
			rect(0,0,30,30);
			scale(1);	
			rotateZ(radians(180+frameCount+treb*10));		
			for (var j = 0; j < 8; j++) {
				push();
				rotate(TWO_PI * j / 8);		
				stroke(255, linesPosition*10, linesPosition*10);
				triangle(linesPosition, linesPosition+500, 10, 2000, -10, 2000);
				pop();
			}
			translate();
			pop();



			linesPosition=linesPosition+5;
		}
	
		push();
		scale(1.5);
		rotateZ(radians(180+frameCount+treb*10));
		texture(waterLoop);
		plane(800,800);
		pop();

		push();
		scale(2);
		translate(0,50);
		texture(ArthurCircle);
		plane(400,400);
		pop();
	
	}

	console.log(soundtrack.currentTime());

	/* 	if(soundtrack.isPlaying() == true){
			if(soundtrack.currentTime()<600)
				{
				soundflow.push([soundtrack.currentTime().toFixed(2), bass.toFixed(2), mid.toFixed(2), treb.toFixed(2)]);
				console.log([soundtrack.currentTime().toFixed(2), bass.toFixed(2), mid.toFixed(2), treb.toFixed(2)]);
				}
			if(soundtrack.currentTime()>600 && soundtrack.currentTime()<605)
				{
				convertToCsv('musicflow.csv', soundflow);
				}
		} */
	};



function playsound() 
{
  if(soundtrack.isPlaying() == false) 
  {
	soundtrack.play();
  } 
}
 
function stopsound() 
{
  if(soundtrack.isPlaying() == true) 
  {
    soundtrack.pause();
  } 
}

function success(data) {
	// Output the object to console to investigate its content
	console.log(data);
	// Now, how do I specify the fill color of an individual face?
	// Something like data.faces[0].fill('#ff7700'); would be desirable
	// but doesn't seem to be an option?
  }