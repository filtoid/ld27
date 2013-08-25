/*enemy.js*/
var ENEMY_BASIC = "BASIC";

function Enemy(_type,_wave){
	this.loc = new Location(112,0);
	this.size = new Location(10,10);
	 
	this.draw = EnemyDraw;
	this.update = EnemyUpdate;

	if(_wave!=null)
		this.wave = _wave;
	else
		this.wave=0;
	
	this.click = EnemyClick;
	this.mouseMove = EnemyMouseMove;
	
	this.path = new Array();
	this.path[0] = new Location(112,0);
	this.path[1] = new Location(112,112);
	this.path[2] = new Location(687,112);
	this.path[3] = new Location(687,312);
	this.path[4] = new Location(112,312);
	this.path[5] = new Location(112,506);
	this.path[6] = new Location(712,506);
	
	this.attack = EnemyAttack;
	this.value = 25 + (5*_wave);
	this.damage = 5+(5*_wave);
	
	this.type = _type;
	
	this.waveBalance = new Array();
	this.waveBalance[0] = 0;
	this.waveBalance[1] = 50;
	this.waveBalance[2] = 150;
	this.waveBalance[3] = 300;
	this.waveBalance[4] = 600;
	this.waveBalance[5] = 1000;
	this.waveBalance[6] = 1500;
	this.waveBalance[7] = 2100;
	this.waveBalance[8] = 3000;
	this.waveBalance[9] = 4000;
	this.waveBalance[10] = 5000;
	
	this.curPathNum = 0;
	this.delay = Math.floor(Math.random()*201);
	this.MAX_HEALTH = 100;
	if(this.wave>this.waveBalance.length-1)
		this.wave = this.waveBalance.length-1;
	
	this.MAX_HEALTH +=this.waveBalance[this.wave];
	this.health = this.MAX_HEALTH;
	
	
	this.SPEED = 1.2-(0.1*this.wave);
}

function EnemyDraw(ctx){
	var oldStyle = ctx.fillStyle;
	ctx.fillStyle="rgb(150,150,0)";
	ctx.fillRect(this.loc.x-5,this.loc.y-5,10,10);
	ctx.fillStyle = oldStyle;
	
	drawHealthBar(this,ctx);
}

function EnemyUpdate(){
	if(this.delay!=0){
		this.delay-=1;
		if(this.delay<0)
			this.delay=0;
		return;
	}
	
	if(this.curPathNum<this.path.length){
		if(this.loc.x>this.path[this.curPathNum].x){
			this.loc.x-=this.SPEED;
			if(this.loc.x<=this.path[this.curPathNum]){
				this.loc.x=this.path[this.curPathNum];
			
			}
		}else if(this.loc.x<this.path[this.curPathNum].x){
			this.loc.x+=this.SPEED;
			if(this.loc.x>=this.path[this.curPathNum].x){
				this.loc.x=this.path[this.curPathNum].x;
				
			}
		}
		
		if(this.loc.y>this.path[this.curPathNum].y){
			this.loc.y-=this.SPEED;
			if(this.loc.y<=this.path[this.curPathNum].y){
				this.loc.y=this.path[this.curPathNum].y;
				
			}
		}else if(this.loc.y<this.path[this.curPathNum].y){
			this.loc.y+=this.SPEED;
			if(this.loc.y>=this.path[this.curPathNum].y){
				this.loc.y=this.path[this.curPathNum].y;
				
			}
		}
		if(this.loc.x==this.path[this.curPathNum].x && this.loc.y==this.path[this.curPathNum].y)
			this.curPathNum++;
	}
	
	if(this.curPathNum==this.path.length){
		if(this.health!=0)
			_game.attackBase(this.damage);
		this.health=0;
	}
}

function EnemyAttack(_amount){
	this.health-=_amount;
	if(this.health<=0)
		return true;
	
	return false;
}

function EnemyClick(_x,_y){
	
}

function EnemyMouseMove(_x,_y){
	
}
