//Spectrum Ops
$(".color").spectrum({
    preferredFormat: "rgb",
    showInput: true,
    showAlpha: true,
    allowEmpty: true
});
//create fabric wrapper around canvas
var canvas = new fabric.Canvas('main');
function addText(text) {
  var oText = new fabric.IText(text, {left: 100, top: 150, editable: false});
  canvas.add(oText);
}
function addImage(url) {
  var img = new fabric.Image.fromURL(url, function (oImg) {
    oImg.scaleToWidth(225);
    canvas.add(oImg);
  });
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
    layers += "<li onclick=\"layerOps("+index+")\">" + index + " - " + object.type + " - " + value + "</li>\n";
  }
  $("#layers").html(layers);
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
$(".color").change(function(){
  var active = canvas.getActiveObject();
  if (active.type == 'i-text') {
    active.set('backgroundColor',$("input[name='updateback']").val());
    active.set('fill',$("input[name='updatefill']").val());
    active.set('stroke',$("input[name='updatestroke']").val());
    canvas.renderAll();
  }
});
$(document).keyup(function(e){
  if (e.which == 8 && (e.ctrlKey || e.metaKey)) $(".remove").trigger("click");
  if (e.which == 66 && (e.ctrlKey || e.metaKey)) $(".bold").trigger("click");
  if (e.which == 73 && (e.ctrlKey || e.metaKey)) $(".italic").trigger("click");
  if (e.which == 85 && (e.ctrlKey || e.metaKey)) $(".textDecoration").trigger("click");
});

function textops(object) {
  if(object.type == "i-text") {
    $("#textops").slideDown('fast');
    $("input[name='updatetext']").val(object.text);
    $("input[name='updatestrokewidth']").val(object.strokeWidth);
    $("input[name='updatefill']").spectrum("set",object.fill);
    $("input[name='updatestroke']").spectrum("set",object.stroke);
    $("input[name='updateback']").spectrum("set",object.backgroundColor);
  }
  else $("#textops").slideUp('fast');
  $(".font").val(object.get('fontFamily'));
}

canvas.on('object:selected', function(object){
  object = object.target;
  textops(object);
});
canvas.on('after:render', function() {
  getLayers();
});
canvas.on('selection:cleared',function(){
  $("#textops").slideUp('fast');
});

addText("hello");
addImage("challenge.jpg");
getLayers();
