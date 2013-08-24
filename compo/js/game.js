/* game.js */
function Game(){
	this.update = GameUpdate;
	this.draw = GameDraw;
	
	this.img = new Image();
	this.img.src = "./images/background.png";
	
	this.aryConcrete = new Array();
	this.imgConcrete = new Image();
	this.imgConcrete.src = "./images/concrete.png";
	
	loadArray(this);
	
	this.base = new Base(SCREEN_WIDTH-100,SCREEN_HEIGHT-100);
}

function GameUpdate(){
	
}

function GameDraw(ctx){
	ctx.drawImage(this.img,0,0);
	for(var i=0;i<this.aryConcrete.length;i++){
		ctx.drawImage(this.imgConcrete,this.aryConcrete[i].x,this.aryConcrete[i].y);
	}
	
	this.base.draw(ctx);
}


function loadArray(_this){
	var aryCount = 0;
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new Location(0,i*25);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(25,i*25);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(50,i*25);
		aryCount++;
	}
	
	// Top right block
	for(var i=0;i<3;i++){
		for(var j=0;j<30;j++){
			_this.aryConcrete[aryCount] = new Location(j*25+150,i*25);
			aryCount++;
		}
	}
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new Location(0,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(25,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(50,(i*25)+75);
		aryCount++;
	}
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new Location(825,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(850,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(875,(i*25)+75);
		aryCount++;
	}
	
	/*2nd line of building concrete*/
	for(var i=0;i<6;i++){
		for(var j=0;j<30;j++){
			_this.aryConcrete[aryCount] = new Location(j*25,(i*25)+150);
			aryCount++;
		}
	}
	
	for(var i=0;i<6;i++){		
		_this.aryConcrete[aryCount] = new Location(825,(i*25)+150);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(850,(i*25)+150);
		aryCount++;
		_this.aryConcrete[aryCount] = new Location(875,(i*25)+150);
		aryCount++;
	}
	
}
