$("ul#ops li").not(".selected").click(function(){
  $("ul#ops li").removeClass("selected");
  $(this).addClass("selected");
  $("li article").slideUp('fast');
  $(this).children("article").slideDown('fast');
});
$("ul#ops li.selected").click(function(){
  $("ul#ops li").removeClass("selected");
  $("li article").slideUp('fast');
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
$(".color").hexColorPicker({
    "container":"dialog"
});
$("#tshirtcolor").hexColorPicker({
  "container":"dialog"
});
$(function(){
  $("#tshirtcolor").val("#ff0000");
});

$('.export').click(function(){
  var img = "";
  scaleCanvas(canvasfront,1.2);
  scaleCanvas(canvasback,1.2);
  scaleCanvas(canvasleft,1.2);
  scaleCanvas(canvasright,1.2);
  datafront = document.getElementById("canvasfront").toDataURL("image/png");
  databack = document.getElementById("canvasback").toDataURL("image/png");
  dataright = document.getElementById("canvasleft").toDataURL("image/png");
  dataleft = document.getElementById("canvasright").toDataURL("image/png");
  scaleCanvas(canvasfront,1/(1.2));
  scaleCanvas(canvasback,1/(1.2));
  scaleCanvas(canvasleft,1/(1.2));
  scaleCanvas(canvasright,1/(1.2));
  canvasfront.renderAll();
  canvasback.renderAll();
  canvasleft.renderAll();
  canvasright.renderAll();
  alert("data has been exported. It lives in the JavaScript as of now");
});
