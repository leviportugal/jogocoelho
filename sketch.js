const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var coelho;
var bg_img;
var food;
var rabbit;

var botao, blower, mute_btn;
var blink,eat,sad;

var bk_song;  // SOM DO BG
var cut_sound;  // SOM CORTANTO A CORDA
var sad_sound;  // SOM TRISTE
var eating_sound; // SOM COMENDO
var air;  /// SOM DO AR

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  eat.looping = false
  sad.looping = false
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  
  botao =  createImg ("cut_btn.png");
  botao.position (220,30);
  botao.size (50,50);
  botao.mouseClicked (deletelink);
  
  blower = createImg('balloon.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  coelho = createSprite (30,600,50,80)
  coelho.addAnimation ("coelho_pisc",blink)
  coelho.scale = 0.2

  coelho.addAnimation ("coelho_come",eat)
  coelho.addAnimation ("coelho_trist",sad)
}

function deletelink (){
 rope.break ();
 fruit_con.detach ();
}

function coelho_collid (body,sprite){
if(body != null){
var d = dist (body.position.x, body.position.y,sprite.position.x,sprite.position.y)
if(d <= 80){
World.remove (world,body)
fruit = null
return true
}
else {
return false
}

}

}

function draw() {
  background(51);
  image(bg_img,width/2,height/2,490,690);
  drawSprites();
  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  
  rope.show();
  Engine.update(engine);
  ground.show();
  
  if(coelho_collid (fruit,coelho)){
   coelho.changeAnimation ("coelho_come")
  }
  if(coelho_collid (fruit,ground.body)){
   coelho.changeAnimation ("coelho_trist")
  } 
  
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});  // APLICAÇÃO DE FORÇA 
  
}


function mute(){
  
}