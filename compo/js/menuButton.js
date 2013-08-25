/*MenuButton.js*/

function MenuButton(_img,_x,_y){
	this.draw = MenuButtonDraw;
	this.update = MenuButtonUpdate;
	
	this.img = new Image();
	this.img.src = _img;
	
	this.loc = new Location(_x,_y);
	this.size = new Location(25,25);
	this.isSelected = false;
	this.isHighlighted = false;
	
	this.click = MenuButtonClick;
	this.mouseMove = MenuButtonMouseMove;
	
}

function MenuButtonDraw(ctx){
	if(this.img!=null)
		ctx.drawImage(this.img,this.loc.x,this.loc.y);
}

function MenuButtonUpdate(){
}

function MenuButtonClick(_x,_y){
	if(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y){
		this.isSelected=!this.isSelected;
	}else{
		this.isSelected=false;
	}
}

function MenuButtonMouseMove(_x,_y){
	if(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y)
		this.isHighlighted = true;
	else
		this.isHighlighted = false;
}

