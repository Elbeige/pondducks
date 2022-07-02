function writeText(param) {
	var xStart = param.x;
  var yStart = param.y;
  var x = xStart,
  		y = yStart;
  var fontSize = param.fontSize;
	var txt = param.txt;
  
  ctx.beginPath();
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.font=fontSize+'px Arial';
  for (let i=0; i < txt.length; i++) {
  	var letter = txt[i];
  	if (x < canvas.width + ctx.measureText(letter).width-param.player.x+10) {
    	x+=ctx.measureText(letter).width;
    } else {
      x = xStart;
      y+=fontSize;
    }
    ctx.fillText(letter,x,y);
  }
  ctx.closePath();
}
function send(texto, xp, yp){
 return writeText({
  x: xp,
  y: yp,
  fontSize: 10,
  txt: texto.message,
  player: texto
 });
}