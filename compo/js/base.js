/*Base.js - the javascript for the base*/

function Base(_x,_y){
	this.draw = BaseDraw;
	this.update = BaseUpdate;

	this.img = new Image();
	this.img.src = "./images/base.png";
	this.loc = new Location (_x,_y);
}

function BaseDraw(ctx){
	ctx.drawImage(this.img,this.loc.x,this.loc.y);
}

function BaseUpdate(){
	
}