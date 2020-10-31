//Create variables here
var dog,foodS,foodStock,database;
var dog_img1,dog_img2;

function preload()
{
  //load images here
  
  dog_img1 = loadImage("images/dogImg.png");
  dog_img2 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dog_img1);
  dog.scale = 0.3;

}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dog_img2);
    foodStock -= 1;
  }  

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(10)
  text("Food Remaining:" + foodS,150,100);
  text("NOTE: Press Up Arrow key to feed milk to your dog",25,50);

drawSprites()

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x -= 1;
    }

    database.ref('/').update({
      Food:x,
    })
}