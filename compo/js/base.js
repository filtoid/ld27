/*Base.js - the javascript for the base*/

function Base(_x,_y){
	this.draw = BaseDraw;
	this.update = BaseUpdate;
	this.size = new Location(100,100);
	
	this.img = new Image();
	this.img.src = "./images/base.png";
	this.loc = new Location (_x,_y);
	
	this.MAX_HEALTH = 1000;
	this.health = this.MAX_HEALTH;
	
}

function BaseDraw(ctx){
	ctx.drawImage(this.img,this.loc.x,this.loc.y);
	drawHealthBar(this,ctx);
}

function BaseUpdate(){
	
}