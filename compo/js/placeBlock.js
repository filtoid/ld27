/*placeBlock.js*/
var IMG_CONCRETE_BLOCK = null;

var IMG_MACHINE_GUN = null;
var IMG_FLAME_TOWER = null;

/*
var TYPE_MACHINE_GUN = "MACHINE_GUN";
var TYPE_FLAME_TOWER = "FLAME_TOWER";
IMG_HI_LIGHT
*/

function PlaceBlock(_x,_y){
	this.update = PlaceBlockUpdate;
	this.draw = PlaceBlockDraw;
	
	this.loc = new Location(_x,_y);
	this.type = "UNUSED";
	this.size = new Location(25,25);
	
	this.click = PlaceBlockClick;
	this.mouseMove = PlaceBlockMouseMove;
	
	this.isHighlighted=false;
	
	if(IMG_CONCRETE_BLOCK==null){
		IMG_CONCRETE_BLOCK = new Image();
		IMG_CONCRETE_BLOCK.src = "./images/concrete.png";
	}
	if(IMG_FLAME_TOWER==null){
		IMG_FLAME_TOWER = new Image();
		IMG_FLAME_TOWER.src = "./images/flame_tower.png";
	}
	if(IMG_MACHINE_GUN==null){
		IMG_MACHINE_GUN = new Image();
		IMG_MACHINE_GUN.src = "./images/machine_gun.png";
	}
}

function PlaceBlockUpdate(){

}

function PlaceBlockDraw(ctx){
	ctx.drawImage(IMG_CONCRETE_BLOCK,this.loc.x,this.loc.y);
	
	if(this.type==TYPE_MACHINE_GUN)
		ctx.drawImage(IMG_MACHINE_GUN,this.loc.x,this.loc.y);
	else if(this.type==TYPE_FLAME_TOWER)
		ctx.drawImage(IMG_FLAME_TOWER,this.loc.x,this.loc.y);
	
	if(this.isHighlighted==true){
		var selTower = getSelectedTower(_game);
		if(selTower==null || _game.money>selTower.getCost())
			ctx.drawImage(IMG_HI_LIGHT,this.loc.x,this.loc.y);
		else
			ctx.drawImage(IMG_HI_LIGHT_RED,this.loc.x,this.loc.y);
	}
}

function PlaceBlockClick(_x,_y,_button){
	if(_button==null)
		return false;
	
	if( !(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y) )
		return false;

	// If we have already been assigned then don't attempt to reassign
	if(this.type!="UNUSED")
		return false;
	
	this.type = _button.type;
	
	return true;
}

function PlaceBlockMouseMove(_x,_y){
	if( !(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y) )
		this.isHighlighted = false;
	else
		this.isHighlighted = true;
}