
let model;
let strokePath = null;

let ModelName = "snowFlake";

let x, y;
let pen = "down";

var SnowFlake = {
	dx:0,
	dy:0,
	pen:'end',
}

let snow = [];

let textArea = document.getElementById('textmessage');

function modelReady() {
  console.log("model ready");
	starterMessage('Drawing something...');
	model.reset();
  model.generate(gotSketch);
}

function setup() {
 	createCanvas(600, 300);
  x = width / 2;
  y = height / 2;
	let button = document.getElementById("start");
	button.addEventListener("click", function(){
		console.log('clicked');
		//fillup the message
		starterMessage('Hello baby jiii...i tried to make something , so hopefully you will like it...');
		loadSnowFlakes();
		//loadCatModel();
		//loadCruiseShip();
	});
	
}

function starterMessage(message){
	textArea.value = message;
	
}


function loadCruiseShip(){
	ModelName = 'truck';
	x = width / 2;
  y = height / 2;
	model = ml5.SketchRNN("truck", TruckModelReady);
  background(0);
}

function loadSnowFlakes(){
	ModelName = 'snowflake';
	x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
	model = ml5.SketchRNN("snowflake", snowFlakeModel);
  background(0);
}


function loadCatModel(){
	ModelName = 'cat';
	x = width / 2;
  y = height / 2;
	model = ml5.SketchRNN("cat", modelReady);
  background(0);
}

function loadModel(){
	console.log('loading the model');
  
}

function gotSketch(error, s) {
  if (error) {
    console.error(error);
  } else {
    strokePath = s;
  }
}


function draw() {
	if(ModelName == "cat"){
		 drawCat();
	
	}		

	if(ModelName == 'snowflake'){
			drawSnowFlake();
	}
	if(ModelName == "truck"){
		drawTruck();
	}
	
}

function drawCat(){
	if(strokePath !=null){
		let newX = x + strokePath.dx ;//*0.9 ;
    let newY = y + strokePath.dy ;//*0.9 ;
    if (pen == "down") {
      stroke(255);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

		if (pen !== "end") {
      model.generate(gotSketch);
    }
		else{
			console.log('drawing complete');
			starterMessage('baby jiii...it was suppose to be a CAT but just in case it did not turn that way sorry...');
			setTimeout(setRomanticMessage, 9000);

		}
	}

}

function setRomanticMessage(){
	starterMessage('baby jiii you are very special to me.. and i love my baby soooo soooo much...');
	loadCruiseShip();
}


function drawTruck(){
	if(strokePath !=null){
		let newX = x + strokePath.dx;// * 0.4;
    let newY = y + strokePath.dy ;//* 0.4;
    if (pen == "down") {
      stroke(255);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

		if (pen !== "end") {
      model.generate(gotSketch);
    }
		else{
			console.log('drawing complete');
			starterMessage('And this is the car we are going to use to travel and go to all the places... I LOVE YOU');
			setTimeout(endMessage, 8000);

		}
	}

}

function endMessage(){
	starterMessage('I LOVE YOU Baby jiiiiiiiiiii \n THE ENDa');

}

function askForTheMessages(){
	starterMessage('I WANT TO TAKE YOU TO LOTS OF PLACES PLEASE COME WITH ME . LOVE YOU ALOT BABY JII...');
}


function drawSnowFlake(){
translate(width / 2, height / 2);
  if (strokePath != null) {
		var xx = strokePath.dx;
		var yy = strokePath.dy;
		var pp = pen;
		
    let newX = x + strokePath.dx * 0.06;
    let newY = y + strokePath.dy * 0.06;
    if (pen == "down") {
      stroke(255);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;
		//console.log(xx +" , "+yy+" , "+pp);
		var SnowFlake = {
			dx:xx,
			dy:yy,
			pen:pp,
		}
		snow.push(SnowFlake);
    if (pen !== "end") {
      model.generate(gotSketch);
    } else {
      console.log("drawing complete");
      model.reset();
			drawFakeSnowFlakes();
			
    }
  }
}

function drawFakeSnowFlakes(){
	for (var j=0;j<100;j++){
		console.log('drawing snow flakes');
		x = random(-width / 2, width / 2);
  	y = random(-height / 2, height / 2);
		for (var i=0;i<snow.length;i++){
			let newX = x + snow[i].dx * 0.02;
    	let newY = y + snow[i].dy * 0.02;
			if (pen == "down") {
				stroke(255);
				strokeWeight(2);
				line(x, y, newX, newY);
			}
			pen = snow[i].pen;
			x = newX;
			y = newY;
	}
		
	}
	starterMessage(' these are suppose to be snow flakes for us so that we can dance in it...');
	//lets draw cat after deay
	setTimeout(loadCatModel, 6000);
}

function snowFlakeModel(){
  console.log("snow flake model ready");
	starterMessage('Drawing something...');
	model.reset();
  model.generate(gotSketch);
}

function TruckModelReady(){
  console.log("truck model ready");
  starterMessage('Drawing the car...');
  model.reset();
  model.generate(gotSketch);

}

