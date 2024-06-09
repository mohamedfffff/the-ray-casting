//global variable for everyone to use
const Width = 600 ;
const Height = 600 ;
const wallsNumber = 6 ; 
const raysNumber = 100 ; 
const raySize = 600 ;

class Wall {
  constructor(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  show(){
    stroke(255);
    line(this.x1,this.y1,this.x2,this.y2);
  }
}

class Ray {
  constructor(x1,y1,n){
    this.x1 = x1 ;
    this.y1 = y1 ;
    this.n = n ;
    this.degree = 2*Math.PI/raysNumber*this.n ;
  }
  update(){
    this.x1 = mouseX ;
    this.y1 = mouseY ;
    this.x2 = this.x1+Math.cos(this.degree)*raySize ;
    this.y2 = this.y1+Math.sin(this.degree)*raySize ;
  }
  check(){
    let px , py ;
    let distance = Number.MAX_VALUE ;
    for(let i = 0 ; i<wallsNumber ; i++){
    let x3 = this.x1 ;
    let x4 = this.x2 ;
    let y3 = this.y1 ;
    let y4 = this.y2 ;
    let x1 = walls[i].x1 ;
    let x2 = walls[i].x2 ;
    let y1 = walls[i].y1 ;
    let y2 = walls[i].y2 ;
    let def = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / def ;
    let u = ((x1-x3)*(y1-y2)-(y1-y3)*(x1-x2)) / def ;
    if(def == 0){
      px = Number.MAX_VALUE ;
      py = Number.MAX_VALUE ;
    }else if(t>=0 && t<=1 && u>=0 && u<=1){
      px = x1+t*(x2-x1);
      py = y1+t*(y2-y1);
      let newDistance = Math.sqrt(Math.pow((px-x3),2)+Math.pow((py-y3),2));
      if(newDistance < distance){
        distance = newDistance ;
        this.x2 = px ;
        this.y2 = py ;
      }
    }
  } 
  }
  show(){
    stroke(255,122);
    line(this.x1,this.y1,this.x2,this.y2);
  }
}


//creating walls
var walls = [] ;
for(let i = 0 ; i < wallsNumber ; i++){
  let r1 = Math.floor(Math.random()*(Width+1));
  let r2 = Math.floor(Math.random()*(Height+1));
  let r3 = Math.floor(Math.random()*(Width+1));
  let r4 = Math.floor(Math.random()*(Height+1));
  walls[i] = new Wall(r1,r2,r3,r4);
}
//creating rays
var rays = [] ;
for(let i = 0 ; i < raysNumber ; i++){
  rays[i] = new Ray(0,0,i);
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  //for walls
  for(let i = 0 ; i < wallsNumber ; i++){
    walls[i].show();
  }
  //for rays
  for(let i = 0 ; i < raysNumber ; i++){
    rays[i].update();
    rays[i].check();
    rays[i].show();
  }
}




















