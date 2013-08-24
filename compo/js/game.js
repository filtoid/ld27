/* game.js */
function Game(){
	this.update = GameUpdate;
	this.draw = GameDraw;
	
	this.img = new Image();
	this.img.src = "./images/background.png";
	
	this.aryConcrete = new Array();
	this.imgConcrete = new Image();
	this.imgConcrete.src = "./images/concrete.png";
	
	this.click = GameClick;
	this.mouseMove = GameMouseMove;
	
	loadArray(this);
	
	this.base = new Base(SCREEN_WIDTH-200,SCREEN_HEIGHT-140);
	
	this.imgButton = new Image();
	this.imgButton.src = "./images/button_background.png";
	
	this.aryButtons = new Array();
	
	this.aryTypes = new Array();
	this.aryTypes[0]= TYPE_MACHINE_GUN;
	this.aryTypes[1]= TYPE_FLAME_TOWER
	
	var aryCt = 0;
	for(var i=0;i<24;i++){
		for(var j=0;j<4;j++){
			if(aryCt<this.aryTypes.length){
				this.aryButtons[aryCt] = new TowerButton(this.aryTypes[aryCt],(j*25)+800,i*25);
			}else{
				this.aryButtons[aryCt] = new TowerButton(null,(j*25)+800,i*25);
			}
			
			aryCt++;
		}
	}
	
}

function GameUpdate(){
	
}

function GameClick(_x,_y){
	
	var bQuitLoop = false;
	if(_x>800){
		/*We are clicking on menu items - either select or clear selection*/
		for(var i = 0;i<this.aryButtons.length&&bQuitLoop==false;i++){
			if(!this.aryButtons[i].click(_x,_y))
				this.aryButtons[i].isSelected = false;
		}
	}else{
		/*We are clicking on the main game area*/
		if(isAnyTowerSelected(this)){
			for(var j=0;j<this.aryConcrete.length;j++){
				this.aryConcrete[j].click(_x,_y,getSelectedTower(this));
			}
		}
		
	}		
	bQuitLoop = false;
}

function GameMouseMove(_x,_y){
	
	for(var i = 0;i<this.aryButtons.length;i++){
		this.aryButtons[i].mouseMove(_x,_y);
	}
	for(var i=0;i<this.aryConcrete.length;i++)
		this.aryConcrete[i].mouseMove(_x,_y);
}

function GameDraw(ctx){
	ctx.drawImage(this.img,0,0);
	for(var i=0;i<this.aryConcrete.length;i++){
		this.aryConcrete[i].draw(ctx);
	}
	
	for(var i=0;i<this.aryButtons.length;i++){
		this.aryButtons[i].draw(ctx);//ctx.drawImage(this.imgButton,this.aryButtons[i].loc.x, this.aryButtons[i].loc.y);
	}
	
	this.base.draw(ctx);
}

function isAnyTowerSelected(_this){
	for(var i=0;i<_this.aryButtons.length;i++){
		if(_this.aryButtons[i].isSelected==true)
			return true;
	}
	
	return false;
}

function getSelectedTower(_this){
		for(var i=0;i<_this.aryButtons.length;i++){
		if(_this.aryButtons[i].isSelected==true)
			return _this.aryButtons[i];
	}
	
	return null;
}

function loadArray(_this){
	var aryCount = 0;
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(0,i*25);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(25,i*25);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(50,i*25);
		aryCount++;
	}
	
	// Top right block
	for(var i=0;i<3;i++){
		for(var j=0;j<26;j++){
			_this.aryConcrete[aryCount] = new PlaceBlock(j*25+150,i*25);
			aryCount++;
		}
	}
	
	/*First battle line*/
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(0,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(25,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(50,(i*25)+75);
		aryCount++;
	}
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(725,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(750,(i*25)+75);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(775,(i*25)+75);
		aryCount++;
	}
	
	/*2nd line of building concrete*/
	for(var i=0;i<5;i++){
		for(var j=0;j<26;j++){
			_this.aryConcrete[aryCount] = new PlaceBlock(j*25,(i*25)+150);
			aryCount++;
		}
	}
	
	for(var i=0;i<5;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(725,(i*25)+150);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(750,(i*25)+150);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(775,(i*25)+150);
		aryCount++;
	}
	
	/*2nd Enemy line*/
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(0,(i*25)+275);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(25,(i*25)+275);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(50,(i*25)+275);
		aryCount++;
	}
	
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(725,(i*25)+275);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(750,(i*25)+275);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(775,(i*25)+275);
		aryCount++;
	}
	
	/*3rd block*/
	for(var i=0;i<5;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(0,(i*25)+350);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(25,(i*25)+350);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(50,(i*25)+350);
		aryCount++;
	}
	
	for(var i=0;i<5;i++){
		for(var j=0;j<26;j++){
			_this.aryConcrete[aryCount] = new PlaceBlock(j*25+150,(i*25)+350);
			aryCount++;
		}
	}
	
	/*Last enemy line*/
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(0,(i*25)+475);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(25,(i*25)+475);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(50,(i*25)+475);
		aryCount++;
	}
	for(var i=0;i<3;i++){		
		_this.aryConcrete[aryCount] = new PlaceBlock(725,(i*25)+475);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(750,(i*25)+475);
		aryCount++;
		_this.aryConcrete[aryCount] = new PlaceBlock(775,(i*25)+475);
		aryCount++;
	}
		
	/*bottom line*/
	for(var i=0;i<2;i++){
		for(var j=0;j<32;j++){
			_this.aryConcrete[aryCount] = new PlaceBlock(j*25,(i*25)+550);
			aryCount++;
		}
	}
}
