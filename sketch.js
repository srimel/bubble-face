
// Instance style prevents polluting the global
// namespace and allows us to have more than one
// sketch on a single page. 

let modifier = 1;
let sorted = false;

const s = (p) => {

  let face;

  p.preload = function() {
    face = p.loadModel('face2.obj');
  }
  p.setup = function() {
    p.createCanvas(500, 500, p.WEBGL);
  };
  p.draw = function() {
    p.background(0);
    p.scale(100);
    p.normalMaterial();
    p.rotateX(160);
    p.rotateY((modifier * p.millis()) / 500);
    p.model(face);
  };
};

const s2 = (p) => {
  let values;
  let i;
  let j;

  p.setup = function () {
    p.createCanvas(720, 400);
    randomizeState();
  }

  function randomizeState() {
    values = [];
    i = 0;
    j = 0;
    for(let i = 0;i<p.width/8;i++){
      values.push(p.random(p.height));
    }
  }

  p.draw = function () {
    p.background(0);
    bubbleSort();
    simulateSorting();
    if(sorted === true) {
      randomizeState();
      sorted = false;
    }
  }

  function bubbleSort() {

    for(let k = 0;k<8;k++){
      if(i<values.length){
        let temp = values[j];
        if(values[j] > values[j+1]){
          values[j] = values[j+1];
          values[j+1] = temp;
        }
        j++;
        
        if(j>=values.length-i-1){
          j = 0;
          i++;
        }
      }
      else{
        //p.noLoop();
      }
    }
  }

  function simulateSorting(){
    for(let i = 0;i<values.length;i++){
      p.stroke(100, 143, 143);
      p.fill(123,23,43);
      p.rect(i*8 , p.height, 8, -values[i],20);
    }
  }
};

function modifyRotation() {
  modifier *= -1;
}

function startSort() {
  sorted = true;
}

let faceAnimation = new p5(s, 'container');
let bubSort = new p5(s2, 'bubSort');