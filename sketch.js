var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,helicopter;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var dropped = false;
const Render = Matter.Render;
var gameState = "UNTOUCHED";


function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, 600, width,10);
	groundSprite.shapeColor=color(255)

	rect1=createSprite(width/2,593, 210, 15);
	rect1.shapeColor = "red";
	rect2=createSprite(width/2.7,550, 15, 100);
	rect2.shapeColor = "red";
	rect3=createSprite(width/1.6,550, 15, 100);
	rect3.shapeColor = "red";
	engine = Engine.create();
	world = engine.world;

	rect1Body = Bodies.rectangle(width/2,593, 210, 15,{isStatic:true});
	World.add(world,rect1Body);
	rect2Body = Bodies.rectangle(width/2.7,550, 15, 100,{isStatic:true});
	World.add(world,rect2Body);
	rect3Body = Bodies.rectangle(width/1.6,550, 15, 100,{isStatic:true});
	World.add(world,rect3Body);
	
	packageBody = Bodies.circle(width/2 , 200 , 20 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 600, width, 10 , {isStatic:true} );
 	World.add(world, ground);
	
    

	
	var render = Render.create({
		element: document.body,
		 engine: engine, options: {
			 width: 1200,
			height: 700,
			wireframes: false 
			} }); 
		 Engine.run(engine); 
		 Render.run(render);
   
  
}


function draw() {
  rectMode(CENTER);
  background("skyBlue");
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  
  
  drawSprites();
 
  
 
     
	 if(packageSprite.isTouching(rect1)){
		
	    gameState = "TOUCHED";
	 }
	 if(gameState === "TOUCHED"){
        fill("black");
		textSize(30);
		text("GOOD JOB",400,350)
	 }

}


function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.
	packageBody.visible = true;
	Matter.Body.setStatic(packageBody,false);
	dropped = true;
	 
  }
if (keyCode === RIGHT_ARROW){
	helicopterSprite.x = helicopterSprite.x + 10;
	if(dropped===false){
		Matter.Body.setPosition(packageBody,{x:helicopterSprite.x,y:helicopterSprite.y});
	}
	
}
if (keyCode === LEFT_ARROW){
    helicopterSprite.x = helicopterSprite.x - 10;
	if(dropped===false){
		Matter.Body.setPosition(packageBody,{x:helicopterSprite.x,y:helicopterSprite.y});
	}
  
}
}





