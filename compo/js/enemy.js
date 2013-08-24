/*enemy.js*/
var ENEMY_BASIC = "BASIC";

function Enemy(_type){
	this.loc = new Location(112,0);
	this.size = new Location(10,10);
	 
	this.draw = EnemyDraw;
	this.update = EnemyUpdate;
	
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
	this.value = 25;
	this.type = _type;
	
	this.curPathNum = 0;
	this.delay = Math.floor(Math.random()*201);
	this.MAX_HEALTH = 100;
	this.health = this.MAX_HEALTH;
	this.SPEED = 1;
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
