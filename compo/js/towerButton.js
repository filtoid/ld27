/*Tower_Button.js*/
var IMG_HI_LIGHT = null;
var IMG_SELECTED = null;
var IMG_BUTTON_BACKGROUND = null;

var TYPE_MACHINE_GUN = "MACHINE_GUN";
var TYPE_FLAME_TOWER = "FLAME_TOWER";

function TowerButton(_type,_x,_y){
	this.type = _type;
	
	this.img = null;//_img;
	if(this.type != null){
		this.img = new Image();
		if(this.type==TYPE_MACHINE_GUN)
			this.img.src = "./images/machine_gun.png";
		else if(this.type==TYPE_FLAME_TOWER)
			this.img.src = "./images/flame_tower.png";
	}
	
	this.loc = new Location(_x,_y);
	
	this.size = new Location(25,25);
	
	this.update = TowerButtonUpdate;
	this.draw = TowerButtonDraw;
	
	this.isSelected = false;
	this.isHighlighted = false;
	
	this.mouseMove = TowerButtonMouseMove;
	this.click = TowerButtonClick;
	
	// One time init
	if(IMG_HI_LIGHT==null){
		IMG_HI_LIGHT = new Image();
		IMG_HI_LIGHT.src = "./images/green_outline.png";
	}
	
	// One time init
	if(IMG_SELECTED==null){
		IMG_SELECTED = new Image();
		IMG_SELECTED.src = "./images/green_outline.png";
	}
	
	if(IMG_BUTTON_BACKGROUND==null){
		IMG_BUTTON_BACKGROUND = new Image();
		IMG_BUTTON_BACKGROUND.src = "./images/button_background.png";
	}
}

function TowerButtonUpdate(){
}

function TowerButtonDraw(ctx){
	ctx.drawImage(IMG_BUTTON_BACKGROUND,this.loc.x,this.loc.y);
	
	if(this.img!=null)
		ctx.drawImage(this.img,this.loc.x,this.loc.y);
	
	if(this.isSelected==true)
		ctx.drawImage(IMG_SELECTED,this.loc.x,this.loc.y);

	if(this.isHighlighted==true){
		ctx.drawImage(IMG_HI_LIGHT,this.loc.x,this.loc.y);
		
	}

}

function TowerButtonClick(_x,_y){
	
	if(this.type!=null && _x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y){
		this.isSelected=!this.isSelected;
		return true;
	}
	
	return false;
}

function TowerButtonMouseMove(_x,_y){
	if(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y){
		this.isHighlighted = true;
	}else{
		this.isHighlighted = false;
	}
}
