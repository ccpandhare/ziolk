//Spectrum Ops
$(".color").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showAlpha: true,
    allowEmpty: true
});
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: '#7777ff'
});
//create fabric wrapper around canvas
var canvas = new fabric.Canvas('main', {preserveObjectStacking: true});
function addText(text) {
  var oText = new fabric.IText(text, {left: 100, top: 150, editable: false});
  canvas.add(oText);
  var thisObj = canvas.getObjects()[canvas.getObjects().length - 1];
  canvas.setActiveObject(thisObj);
  //thisObj.left = Math.abs(Math.random()*(canvas.width));
  //thisObj.top = Math.abs(Math.random()*(canvas.height));
  thisObj.center();
  thisObj.setCoords();
  canvas.renderAll();
}
function addImage(url) {
  var img = new fabric.Image.fromURL(url, function (oImg) {
    oImg.scaleToWidth(225);
    canvas.add(oImg);
    var thisObj = canvas.getObjects()[canvas.getObjects().length - 1];
    canvas.setActiveObject(thisObj);
    //thisObj.left = Math.abs(Math.random()*(canvas.width));
    //thisObj.top = Math.abs(Math.random()*(canvas.height));
    thisObj.center();
    thisObj.setCoords();
    canvas.renderAll();
  });
}
function addRect() {
  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'rgb(19,149,26)',
    width: 50,
    height: 30
  });
  canvas.add(rect);
  var thisObj = canvas.getObjects()[canvas.getObjects().length - 1];
  canvas.setActiveObject(thisObj);
  //thisObj.left = Math.abs(Math.random()*(canvas.width));
  //thisObj.top = Math.abs(Math.random()*(canvas.height));
  thisObj.center();
  thisObj.setCoords();
  canvas.renderAll();
}

function layerOps(get) {
  canvas.setActiveObject(canvas.item(get));
}

function getLayers() {
  var objects = canvas.getObjects();
  var layers = "";
  for (var object in objects) {
    var index = object;
    object = objects[object];
    var value;
    if (object.type == "i-text") value = object.text;
    else value = "";
    layers += "<li><span onclick=\"layerOps("+index+")\">" + index + " - " + object.type + " - " + value + "</span>&nbsp;<span onclick=\"moveFront("+index+")\">(Front)</span>&nbsp;<span onclick=\"moveBack("+index+")\">(Back)</span>&nbsp;<span onclick=\"toggleVisible("+index+",'set')\">("+toggleVisible(index,'get')+")</span></li>\n";
  }
  $("#layers").html(layers);
}

function moveFront(index) {
  canvas.getObjects()[index].bringForward();
  canvas.discardActiveObject();
  canvas.renderAll();
}

function moveBack(index) {
  canvas.getObjects()[index].sendBackwards();
  canvas.discardActiveObject();
  canvas.renderAll();
}

function toggleVisible(index,method) {
  if (method == "get") {
      console.log("get");
    if (canvas.getObjects()[index].visible == true) {
      return "Hide";
    }
    else {
      return "Show";
    }
  }
  else if (method == "set") {
    canvas.getObjects()[index].visible = !canvas.getObjects()[index].visible;
    canvas.discardActiveObject();
    canvas.renderAll();
  }
}

// render the image in our view
function renderImage(file) {

  // generate a new FileReader object
  var reader = new FileReader();

  // inject an image with the src url
  reader.onload = function(event) {
    the_url = event.target.result;
    addImage(the_url);
  }

  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(file);
}

// handle input changes
$("#addimg").click(function() {
  if ($("#imgtoadd")[0].files.length != 0) {
    for (var file in $("#imgtoadd")[0].files) {
      renderImage($("#imgtoadd")[0].files[file]);
    }
  }
  else {
    alert("Please Select one or more files");
    $("#imgtoadd").trigger("click");
  }

});
$("#addtext").click(function(){
  addText($("#texttoadd").val());
});
$(".bold").click(function(){
  object = canvas.getActiveObject();
  if (object.get('fontWeight')=='normal') object.set('fontWeight','bold');
  else object.set('fontWeight','normal');
  canvas.renderAll();
});
$(".italic").click(function(){
  object = canvas.getActiveObject();
  if (object.get('fontStyle')=='normal') object.set('fontStyle','italic');
  else object.set('fontStyle','normal');
  canvas.renderAll();
});
$(".textDecoration").click(function(){
  object = canvas.getActiveObject();
  decor = object.get('textDecoration');
  if (decor=='underline') object.set('textDecoration','line-through');
  else if (decor == 'line-through') object.set('textDecoration','overline');
  else if (decor == 'overline') object.set('textDecoration','none');
  else object.set('textDecoration','underline');
  canvas.renderAll();
});
$(".remove").click(function(){
  object = canvas.getActiveObject().remove();
});
$(".font").change(function(){
  object = canvas.getActiveObject();
  object.set('fontFamily',$(".font").val());
  canvas.renderAll();
});
$("#imgtoadd").change(function(){
  $("#addimg").trigger("click");
});
$("input[name='updatetext']").keyup(function(){
  if ($("input[name='updatetext']").val().trim() != "") {
  canvas.getActiveObject().text = $("input[name='updatetext']").val();
  canvas.renderAll();
  }
});$("input[name='updatetext']").change(function(){
  if ($("input[name='updatetext']").val().trim() != "") {
  canvas.getActiveObject().text = $("input[name='updatetext']").val();
  canvas.renderAll();
  }
});
$("#addrect").click(function(){
  addRect()
});
$("#textops .color").change(function(){
  var active = canvas.getActiveObject();
  if (active.type == 'i-text') {
    active.set('backgroundColor',$("#textops input[name='updateback']").val());
    active.set('fill',$("#textops input[name='updatefill']").val());
    active.set('stroke',$("#textops input[name='updatestroke']").val());
    canvas.renderAll();
  }
});
$("#rectops .color").change(function(){
  var active = canvas.getActiveObject();
  if (active.type == 'rect') {
    active.set('fill',$("#rectops input[name='updatefill']").val());
    active.set('stroke',$("#rectops input[name='updatestroke']").val());
    canvas.renderAll();
  }
});
$("#rectops input[name='updatestrokewidth']").change(function(){
  var active = canvas.getActiveObject();
  if (active.type == 'rect') {
    active.set('strokeWidth',$("#rectops input[name='updatestrokewidth']").val());
    active.setCoords();
    canvas.renderAll();
  }
});
$(document).keyup(function(e){
  if (e.which==8) {
    if (canvas.getActiveObject().type != 'i-text')
      $(".remove").trigger("click");
    else if (!($("#textops input[name='updatetext']").is(":focus")))
      $(".remove").trigger("click");
  }
  if (e.which == 66 && e.ctrlKey) $(".bold").trigger("click");
  if (e.which == 73 && e.ctrlKey) $(".italic").trigger("click");
  if (e.which == 85 && e.ctrlKey) $(".textDecoration").trigger("click");
});

function objectops(object) {
  if(object.type == "i-text") {
    $("#textops").slideDown('fast');
    $("#textops input[name='updatetext']").val(object.text);
    $("#textops input[name='updatestrokewidth']").val(object.strokeWidth);
    $("#textops input[name='updatefill']").spectrum("set",object.fill);
    $("#textops input[name='updatestroke']").spectrum("set",object.stroke);
    $("#textops input[name='updateback']").spectrum("set",object.backgroundColor);
    $("#rectops").slideUp('fast');
  }
  else if(object.type == "rect") {
    $("#rectops").slideDown('fast');
    $("#rectops input[name='updatestroke']").spectrum("set",object.stroke);
    $("#rectops input[name='updatefill']").spectrum("set",object.fill);
    $("#rectops input[name='updatestrokewidth']").val(object.strokeWidth);
    $("#textops").slideUp('fast');
  }
  else {
    $("#rectops").slideUp('fast');
    $("#textops").slideUp('fast');
  }
  $(".font").val(object.get('fontFamily'));
}

canvas.on('object:selected', function(object){
  object = object.target;
  objectops(object);
});
canvas.on('after:render', function() {
  getLayers();
});
canvas.on('selection:cleared',function(){
  $("#textops").slideUp('fast');
});

addText("hello");
addImage("challenge.jpg");
addRect();
canvas.getObjects()[1].strokeWidth = 2;
getLayers();
