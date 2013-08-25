/*placeBlock.js*/
var IMG_CONCRETE_BLOCK = null;

var IMG_MACHINE_GUN = null;
var IMG_FLAME_TOWER = null;
var IMG_BLOCKED = null;

/*
var TYPE_MACHINE_GUN = "MACHINE_GUN";
var TYPE_FLAME_TOWER = "FLAME_TOWER";
IMG_HI_LIGHT
*/
var UNUSED = "UNUSED";
var BLOCKED = "BLOCKED";

function PlaceBlock(_x,_y){
	this.update = PlaceBlockUpdate;
	this.draw = PlaceBlockDraw;
	
	this.loc = new Location(_x,_y);
	this.type = UNUSED;
	this.size = new Location(25,25);
	
	this.click = PlaceBlockClick;
	this.mouseMove = PlaceBlockMouseMove;
	
	this.isHighlighted=false;
	this.range=0;
	this.MAX_GUN_RECHARGE = 20;
	this.gunRecharge = 0;
	this.damage = 20;
	
	this.setType = PlaceBlockSetType;
	
	this.bullet = null;
	
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
	if(IMG_BLOCKED==null){
		IMG_BLOCKED= new Image();
		IMG_BLOCKED.src = "./images/blocked.png";
	}
}

function PlaceBlockUpdate(_ary){
	if(this.gunRecharge>0){
		this.gunRecharge-=1;
		return;
	}else{
		this.bullet = null;
	}
	
	for(var i=0;i<_ary.length;i++){
		if(_ary[i]!=null){
			var _x = _ary[i].loc.x;
			var _y = _ary[i].loc.y;
			var _dx = this.loc.x-_x;
			var _dy = this.loc.y-_y;
			var hyp = Math.sqrt((_dx*_dx)+(_dy*_dy));
			if(hyp<this.range){
				
				// Make a bullet line so we know who is shooting who
				this.bullet = new Array();
				this.bullet[0] = new Location(this.loc.x,this.loc.y);
				this.bullet[1] = new Location(_ary[i].loc.x,_ary[i].loc.y);
				
				_ary[i].attack(this.damage);
				if(_ary[i].health<0){
					_game.money+= _ary[i].value;
					_ary[i]=null;
				}
				
				this.gunRecharge  = this.MAX_GUN_RECHARGE;
				
				return;
			}
		}
	}
}

function PlaceBlockDraw(ctx){
	
	var oldStyle = ctx.fillStyle;
	var oldStroke = ctx.strokeStyle;
	
	if(this.type==BLOCKED){
		ctx.drawImage(IMG_BLOCKED,this.loc.x,this.loc.y);
		return;
	}
	
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
	
	if(this.bullet!=null){
		
		ctx.strokeStyle = "rgb(128,128,128)";
		ctx.beginPath();
		ctx.moveTo(this.bullet[0].x,this.bullet[0].y);
		ctx.lineTo(this.bullet[1].x,this.bullet[1].y);
		ctx.stroke();
	}
	
	ctx.fillStyle = oldStyle;
	ctx.strokeStyle = oldStroke;
}

function PlaceBlockSetType(_type){
	this.type=_type;
}

function PlaceBlockClick(_x,_y,_button){
	if(_button==null)
		return false;
	
	if( !(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y) )
		return false;

	// If we have already been assigned then don't attempt to reassign
	if(this.type!=UNUSED)
		return false;
	
	this.type = _button.type;
	
	if(this.type==TYPE_MACHINE_GUN){
		this.range = 90;
		this.damage=30;
	}else if(this.type==TYPE_FLAME_TOWER){
		this.range = 75;
		this.damage=40;
	}else
		this.range = 0;
	
	return true;
}

function PlaceBlockMouseMove(_x,_y){
	if( !(_x>this.loc.x && _x<this.loc.x+this.size.x && _y>this.loc.y && _y<this.loc.y+this.size.y) )
		this.isHighlighted = false;
	else
		this.isHighlighted = true;
}