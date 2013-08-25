/* game.js */
function Game(){
	this.update = GameUpdate;
	this.draw = GameDraw;
	
	this.img = new Image();
	this.img.src = "./images/background.png";
	
	this.aryConcrete = new Array();
	this.imgConcrete = new Image();
	this.imgConcrete.src = "./images/concrete.png";
	
	this.countdown = 10;
	this.countdownDelay = 60; // 30 frames per second
	this.wave = 0;
	
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
	
	this.aryEnemies = new Array();
	
	this.createWave = GameCreateWave;
	this.createWave(this.wave);
	
	for( var i=0;i<20;i++){
		this.aryEnemies[i] = new Enemy(ENEMY_BASIC);
	}
	
	var aryCt = 0;
	for(var i=0;i<12;i++){
		for(var j=0;j<4;j++){
			if(aryCt<this.aryTypes.length){
				this.aryButtons[aryCt] = new TowerButton(this.aryTypes[aryCt],(j*25)+800,i*25);
			}else{
				this.aryButtons[aryCt] = new TowerButton(null,(j*25)+800,i*25);
			}
			
			aryCt++;
		}
	}
	
	this.aryMenuButtons = new Array();
	this.aryMenuButtons[0] = new MenuButton("./images/icons/sell.png",800,575);
	this.aryMenuButtons[1] = new MenuButton("./images/icons/cancel.png",825,575);
	this.aryMenuButtons[2] = new MenuButton("./images/icons/exit.png",850,575);
	
	this.score = 0;
	this.money = 100;
}

function GameCreateWave(_num){
	
	var spares = 20;
	// Go through and set enemies that are dead to life again
	for( var i=0;i<20;i++){
		if(this.aryEnemies[i]==null){
			this.aryEnemies[i] = new Enemy(ENEMY_BASIC);
			spares-=1;
		}
		//	else
	//		i--;
	}
	
	for(var i=0;i<spares;i++){
		this.aryEnemies[this.aryEnemies.length] = new Enemy(ENEMY_BASIC);
	}
	
}

function GameUpdate(){
	
	//this.countdown = 10;
	//this.countdownDelay = 30;
	if(this.countdownDelay>0){
		this.countdownDelay-=1;
	}else{
		this.countdown-=1;
		this.countdownDelay=60;
		if(this.countdown<0){
			this.countdown = 10;
			this.wave+=1;
			//start next wave
			this.createWave(this.wave);
		}
	}
	
	for(var i=0;i<this.aryEnemies.length;i++){
		if(this.aryEnemies[i]!=null)
			this.aryEnemies[i].update();
	}
	for(var i=0;i<this.aryConcrete.length;i++){
		if(this.aryConcrete[i].type!=UNUSED){
			this.aryConcrete[i].update(this.aryEnemies);
		}
	}
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
				if(this.money >= getSelectedTower(this).getCost()){
					if(this.aryConcrete[j].click(_x,_y,getSelectedTower(this)))
						this.money -= getSelectedTower(this).getCost();
				}
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
	
	//context.fillStyle = "rgb(150,29,28)";
	ctx.fillRect (800,300,100,300);
	
	for(var i=0;i<this.aryConcrete.length;i++){
		this.aryConcrete[i].draw(ctx);
	}
	
	var cacheAryButton = null;
	
	for(var i=0;i<this.aryButtons.length;i++){
		this.aryButtons[i].draw(ctx);//ctx.drawImage(this.imgButton,this.aryButtons[i].loc.x, this.aryButtons[i].loc.y);
		if(this.aryButtons[i].isSelected)
			cacheAryButton = this.aryButtons[i];
	}
	
	if(cacheAryButton!=null){
		if(cacheAryButton.getProfilePic()!=null){
			ctx.drawImage(cacheAryButton.getProfilePic(),810,310);
		}
	}
	
	
	for(var i=0;i<this.aryEnemies.length;i++){
		if(this.aryEnemies[i]!=null)
			this.aryEnemies[i].draw(ctx);
	}
	
	var oldStyle = ctx.fillStyle;
	ctx.fillStyle = "rgb(15,254,15)";
	if(cacheAryButton!=null)
		ctx.fillText("$" + cacheAryButton.getCost(),840,310);
	
	ctx.fillText("Next Wave: " + this.countdown, 817, 475);
	ctx.fillText("Cur Wave: " + this.wave, 819, 495);
	ctx.fillText("$" + this.money, 810,565);
	ctx.fillStyle = oldStyle;
	
	for(var i=0;i<this.aryMenuButtons.length;i++){
		this.aryMenuButtons[i].draw(ctx);
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
	
	/*blank out the blocked squares*/
	for(var i=0;i<24;i++){
		//Find the right sqare
		for(var j=0;j<_this.aryConcrete.length;j++){
			if(_this.aryConcrete[j].loc.x==0 && _this.aryConcrete[j].loc.y==(i*25))
				_this.aryConcrete[j].setType(BLOCKED);
		}
	}
	for(var i=1;i<24;i++){
		//Find the right sqare
		for(var j=0;j<_this.aryConcrete.length;j++){
			if(_this.aryConcrete[j].loc.x==i*25 && _this.aryConcrete[j].loc.y==200)
				_this.aryConcrete[j].setType(BLOCKED);
		}
	}
	/*top line*/
	for(var i=1;i<25;i++){
		//Find the right sqare
		for(var j=0;j<_this.aryConcrete.length;j++){
			if(_this.aryConcrete[j].loc.x==(i*25)+175 && _this.aryConcrete[j].loc.y==0)
				_this.aryConcrete[j].setType(BLOCKED);
		}
	}
	
	/* right hand edge*/
	for(var i=1;i<24;i++){
		//Find the right sqare
		for(var j=0;j<_this.aryConcrete.length;j++){
			if(_this.aryConcrete[j].loc.x==775 && _this.aryConcrete[j].loc.y==(i*25))
				_this.aryConcrete[j].setType(BLOCKED);
		}
	}
	
	/*top line*/
	for(var i=1;i<25;i++){
		//Find the right sqare
		for(var j=0;j<_this.aryConcrete.length;j++){
			if(_this.aryConcrete[j].loc.x==(i*25)+175 && _this.aryConcrete[j].loc.y==400)
				_this.aryConcrete[j].setType(BLOCKED);
		}
	}
	
}
