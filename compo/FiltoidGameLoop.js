/* Filtoid's Helpful Javascript Functions - FiltoidGameLoop.js

This is a sample game loop to provide a reasonable update control mechanism for
animations and game logic. Please feel free to do whatever the hell you like with this code. It is free as beer
and free as in speech. If you use this code you do so at your own risk and I accept no responsibility
whatsoever for it. 

Thank and have fun at LD27 :)
*/
//Globals
var FPS = 30; // target frames per second
var SECONDSBETWEENFRAMES = 1 / FPS;
var ctx = null; // Useful to have a global reference for measuring fonts for instance
var canvas = null; // The main drawing area
var currentTime = 0; // For debugging - you can store the current time and see how it's changed

var _game=null;

var SCREEN_WIDTH = 900;
var SCREEN_HEIGHT = 600;

function loadGame(){
	canvas = document.getElementById('canvas');
	$('#canvas').mousedown(OnCanvasClick);
	$('#canvas').mousemove(OnMouseMove);
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	
	ctx = canvas.getContext('2d');
	
	// Do setup code here - make resources/assign things etc
	_game = new Game();
	//_roomManager = new RoomManager();
	
	// The following line sets up the game loop
	setInterval(update, SECONDSBETWEENFRAMES * 500);	
}

function update(){
	// Store the time - for debugging purposes mostly
	currentTime += SECONDSBETWEENFRAMES;
	
	// fiddle factor for borders to make sure we don't over draw them
	canvas.width = SCREEN_WIDTH;//$(window).width()-15;
	canvas.height = SCREEN_HEIGHT;//($(window).height()*0.9) - 14;
	
	// Clear the drawing area
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect (0,0, canvas.width, canvas.height);
	
	//Do your game updates here - we get true from _roomManager if the game is completed
	// If it is completed then don't the player update or move anywhere
	_game.update();
	//if(!_roomManager.update())
	//	_player.update();
	
	//Do you drawing here - make your resources draw themselves
	_game.draw(ctx);
	//_roomManager.draw(ctx);
	//_player.draw(ctx);
	
	ctx.restore();
}

function OnCanvasClick(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
	
	//curActiveScreen = curActiveScreen.click(mouseX,mouseY);
}

function OnMouseMove(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;	
	//curActiveScreen.mouseMove(mouseX,mouseY);
} 