function switchMenu(obj) {
var el = document.getElementById(obj);
if ( el.style.display != "block" ) {
  el.style.display = 'block';
}
else {
  el.style.display = 'none';
 }
}

var namesVec = new Array("list_closed.gif", "list_open.gif");
var root='images/';
function swapImg(ima){
nr = ima.getAttribute('src').split('/');
nr = nr[nr.length-1]
 
if(nr==namesVec[0]){ima.setAttribute('src',root+namesVec[1]);}
else{ima.setAttribute('src',root+namesVec[0]);}
}