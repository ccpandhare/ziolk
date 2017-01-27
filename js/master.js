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
  var trsvg = document.activecanvas.toSVG();
  $('body').html(trsvg);
});
