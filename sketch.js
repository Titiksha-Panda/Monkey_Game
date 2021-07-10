
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
  var monkeyStop
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyStop = loadAnimation("sprite_1.png");
}



function setup() {
  createCanvas(600, 400);
 

 monkey = createSprite(50,330,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale =0.14;

 ground = createSprite(200,380,600,20);
  ground.velocityX=-4;
  ground.x = ground.width /2;

  
invisibleGround = createSprite(300,380,600,10);
  invisibleGround.visible = false;
  

   obstacleGroup = createGroup();
  FoodGroup = createGroup();

   monkey.setCollider("circle",0,0,monkey.radius);
 monkey.debug   = true;
FoodGroup= new Group();
 obstaclesGroup = createGroup();   
  
  
score=0;
}


function draw() {
 background("white");
   text("Survival Time: "+ score, 4,20);
   score = score + Math.round(getFrameRate()/60);
  
  
  if (ground.x < 300){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY = -12;
        
    }
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  spawnObstacles();
 spawnFood();
  
  if(obstacleGroup.isTouching(monkey)){
       monkey.velocityX = 0;
       monkey.velocityY = 0;
     ground.velocityX = 0;
    monkey.y=330;
      monkey.x=300;
    monkey.addAnimation("stopped", monkeyStop);
    score=0; 
    
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    }
  
  drawSprites();
  
}
 function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var banana = createSprite(590,350,40,10);
    banana.y = Math.round(random(100,380));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
  banana.lifetime = 300;
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(590,350,40,10);
    obstacle.x = Math.round(random(400,600));
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
   obstacle.lifetime = 300;
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}

