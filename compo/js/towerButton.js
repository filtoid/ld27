/*Tower_Button.js*/
var IMG_HI_LIGHT = null;
var IMG_HI_LIGHT_RED = null;

var IMG_SELECTED = null;
var IMG_BUTTON_BACKGROUND = null;

var TYPE_MACHINE_GUN = "MACHINE_GUN";
var TYPE_FLAME_TOWER = "FLAME_TOWER";
var TYPE_MISSILE_TOWER = "MISSILE_TOWER";
var TYPE_EXPLOSION_TOWER = "EXPLOSION_TOWER";
var TYPE_LASER_TOWER = "LASER_TOWER";

function TowerButton(_type,_x,_y){
	this.type = _type;
	
	this.img = null;//_img;
	if(this.type != null){
		this.img = new Image();
		if(this.type==TYPE_MACHINE_GUN)
			this.img.src = "./images/machine_gun.png";
		else if(this.type==TYPE_FLAME_TOWER)
			this.img.src = "./images/flame_tower.png";
		else if(this.type==TYPE_MISSILE_TOWER)
			this.img.src = "./images/missile_tower.png";
		else if(this.type==TYPE_EXPLOSION_TOWER)
			this.img.src = "./images/explosion_tower.png";
		else if(this.type==TYPE_LASER_TOWER)
			this.img.src = "./images/laser_tower.png";
		
	}
	
	this.loc = new Location(_x,_y);
	
	this.size = new Location(25,25);
	this.getCostString = TowerButtonGetCostString;
	
	this.update = TowerButtonUpdate;
	this.draw = TowerButtonDraw;
	
	this.isSelected = false;
	this.isHighlighted = false;
	
	this.mouseMove = TowerButtonMouseMove;
	this.click = TowerButtonClick;
	
	this.getProfilePic = TowerButtonGetProfilePic;
	this.getCost = TowerButtonGetCost;
	this.getName = TowerButtonGetName;
	
	// One time init
	if(IMG_HI_LIGHT==null){
		IMG_HI_LIGHT = new Image();
		IMG_HI_LIGHT.src = "./images/green_outline.png";
	}
	if(IMG_HI_LIGHT_RED==null){
		IMG_HI_LIGHT_RED = new Image();
		IMG_HI_LIGHT_RED.src = "./images/red_outline.png";
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
		//if(_game.money>this.getCost())
			ctx.drawImage(IMG_HI_LIGHT,this.loc.x,this.loc.y);
		//else
	//		ctx.drawImage(IMG_HI_LIGHT_RED,this.loc.x,this.loc.y);
		
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

function TowerButtonGetCostString(){
	if(this.type==TYPE_MACHINE_GUN)
		return "1-$25,2-$100,3-350";
	else if(this.type==TYPE_FLAME_TOWER)
		return "1-$30,2-$110,3-$400";
	else if(this.type==TYPE_LASER_TOWER)
		return "1-$50,2-$200,3-$550";
	else if(this.type==TYPE_MISSILE_TOWER)
		return "1-$75,2-$275,3-$675";
	else if(this.type==TYPE_EXPLOSION_TOWER)
		return "1-$90,2-$350,3-$900";
}
function TowerButtonGetCost(){
	if(this.type==TYPE_MACHINE_GUN)
		return 25;
	else if(this.type==TYPE_FLAME_TOWER)
		return 30;
	else if(this.type==TYPE_LASER_TOWER)
		return 50;
	else if(this.type==TYPE_MISSILE_TOWER)
		return 75;
	else if(this.type==TYPE_EXPLOSION_TOWER)
		return 90;
	
}
function TowerButtonGetName(){
	if(this.type==TYPE_MACHINE_GUN)
		return "Machine Gun";
	else if(this.type==TYPE_FLAME_TOWER)
		return "Flame";
	else if(this.type==TYPE_LASER_TOWER)
		return "Laser";
	else if(this.type==TYPE_MISSILE_TOWER)
		return "Missile";
	else if(this.type==TYPE_EXPLOSION_TOWER)
		return "Explosion";
}

function TowerButtonGetProfilePic(){
	if(this.type==null)
		return null;
	
	if(this.profilePic==null){
		this.profilePic = new Image();
		if(this.type==TYPE_MACHINE_GUN)
			this.profilePic.src = "./images/profiles/machine_gun_profile.png";
		else if(this.type==TYPE_FLAME_TOWER)
			this.profilePic.src = "./images/profiles/flame_tower_profile.png";
		else if(this.type==TYPE_LASER_TOWER)
			this.profilePic.src = "./images/profiles/laser_tower_profile.png";
		else if(this.type==TYPE_MISSILE_TOWER)
			this.profilePic.src = "./images/profiles/missile_tower_profile.png";
		else if(this.type==TYPE_EXPLOSION_TOWER)
			this.profilePic.src = "./images/profiles/explosion_tower_profile.png";
			
	}
	return this.profilePic;
}