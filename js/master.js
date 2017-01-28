$("ul#ops li").click(function(){
  $("ul#ops li").removeClass("selected");
  $(this).addClass("selected");
  $("li article").slideUp('fast');
  $(this).children("article").slideDown('fast');
});
$("ul#ops li .close").click(function(e){
  e.stopPropagation();
  $(this).parent().slideUp('fast');
  $(this).parent().parent().removeClass("selected");
});
$("ul#ops li article").hover(function(e){
  e.stopPropagation();
});
$("ul#ops li article").click(function(e){
  e.stopPropagation();
});
$("li.sideselector").not(".active").click(function(){
  //$("li article").slideUp('fast');
  var side = $(this).attr("side");
  $("#main div").fadeOut(150);
  $("#main #"+side).delay(150).fadeIn(150);
  document.activecanvas = eval("canvas"+side);
  getLayers();
  $("li.sideselector.active").removeClass("active");
  $("li[side="+side+"]").addClass("active");
});
$("li.sideselector[side='front']").trigger('click');
$(".color").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showAlpha: true,
    allowEmpty: true
});
$('.exportfront').click(function(){
  var canvasScale = 1;
  var SCALE_FACTOR = 2;
  canvasScale = canvasScale * SCALE_FACTOR;
  var canvas = document.activecanvas;
  canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
  canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
  canvas.discardActiveObject();
  var objects = canvas.getObjects();
  for (var i in objects) {
      var scaleX = objects[i].scaleX;
      var scaleY = objects[i].scaleY;
      var left = objects[i].left;
      var top = objects[i].top;

      var tempScaleX = scaleX * SCALE_FACTOR;
      var tempScaleY = scaleY * SCALE_FACTOR;
      var tempLeft = left * SCALE_FACTOR;
      var tempTop = top * SCALE_FACTOR;

      objects[i].scaleX = tempScaleX;
      objects[i].scaleY = tempScaleY;
      objects[i].left = tempLeft;
      objects[i].top = tempTop;

      objects[i].setCoords();
  }

  canvas.renderAll();
  var img = document.getElementById("canvasfront").toDataURL("image/png");
  //console.log(img);
  document.write("<img src=\""+img+"\">");
});
