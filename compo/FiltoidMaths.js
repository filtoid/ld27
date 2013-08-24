/* Filtoid's Helpful Javascript Functions - FiltoidMaths.js

This is hopefully some helpful javascript functions for top down movement and other game maths that
may be useful. Please feel free to do whatever the hell you like with this code. It is free as beer
and free as in speech. If you use this code you do so at your own risk and I accept no responsibility
whatsoever for it. 

Thank and have fun at LD25 :)
*/

// A useful declaration for holding locational point information
function Location(_x,_y){
	this.x = _x;
	this.y = _y;
}

function MoveForward(rot,amount){
	// Returns the translation for the speed and rotation - rotation (rot) is in radians so ranges from 0-2xMath.PI
	var _x = amount * Math.sin(rot);
	var _y = amount * Math.cos(rot);
	return new Location(_x,_y);
}

// Pass in two Locations get back angle between them
function FindAngle(ptA,ptB){
	var xDiff = ptA.x-ptB.x;
	var yDiff = ptA.y-ptB.y;
	var hyp = DistanceBetweenPoints(ptA,ptB);
	
	if(yDiff==0)
		return Math.acos(xDiff/hyp);
	else
		return Math.asin(yDiff/hyp);
}

// Return hypoteneuse between these two points pass in two locations
function DistanceBetweenPoints(ptA,ptB){
	var xDiff = ptA.x-ptB.x;
	var yDiff = ptA.y-ptB.y;
	return Math.sqrt((xDiff*xDiff)+(yDiff*yDiff));
}