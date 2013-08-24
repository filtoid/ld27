var aryCollisionObjects = null;
var g_CollisionManager = null;

// Vaguely adhering to singleton pattern
function GetCollisionManager(){
	if(g_CollisionManager==null){
		g_CollisionManager = new CollisionManager();
	}
	return g_CollisionManager;
}

function CollisionManager(){
	this.add = addCollisionItem;
	this.remove = removeCollisionItem;
	aryCollisionObjects = new Array();
}

function addCollisionItem(obj){
	// Cycle through items and leave function if item already there
	for(var i = 0;i<aryCollisionObjects.length;i++){
		if(aryCollisionObjects[i]==obj)
			return;
	}
	
	aryCollisionObjects[aryCollisionObjects.length]=obj;
}

function removeCollisionItem(obj){
	for(var i=0;i<aryCollisionObjects.length;i++){
		if(aryCollisionObjects[i]==obj)
		{
			// Remove item from array and shuffle others down
			removeArrayItem(aryCollisionObjects,i);
		}
	}
}

/*
Pass object in (prob player) which we want to test against all items
return true if objects collided else false
*/
function checkCollision(obj){
	// We have never added any items to our list of collision objects so nothing will collide
	if(aryCollisionObjects==null)
		return;

	for(var i=0;i<aryCollisionObjects.length;i++){
		//if(FiltoidCollisionCheck(obj,aryCollisionObjects[i]))
		//	return true;
	}
	return false;
}

