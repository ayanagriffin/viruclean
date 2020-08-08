class Button(){
  constructor(x, y, text){
    this.x = x;
    this.y = y;
    this.shadowY = height * 0.75 +5
    this.width = width/5;
    this.height = height/12;
    this.buttonColor = color(5, 50, 100);
    this.shadowColor = color(5, 60, 100);
    this.text = text;
    this.corner = 10
  }
  
  show(){
    fill(this.shadowColor);
    rect(this.x, this.y, this.width, this.height, this.corner);
    fill(this.buttonColor);
    rect(this.x, this.y, this.width, this.height, this.corner);
  }
  
  
}