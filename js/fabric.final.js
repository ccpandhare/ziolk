//customize corners
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: '#7777ff'
});

//define various canvasses
var canvasfront = new fabric.Canvas('canvasfront', {preserveObjectStacking: true});
var canvasback = new fabric.Canvas('canvasback', {preserveObjectStacking: true});
var canvasleft = new fabric.Canvas('canvasleft', {preserveObjectStacking: true});
var canvasright = new fabric.Canvas('canvasright', {preserveObjectStacking: true});

var canvasses = [canvasfront, canvasback, canvasleft, canvasright];

document.activecanvas = canvasfront;
console.log(document.activecanvas.getObjects());

//define functions
  //add a text object
  function addText(text) {
    console.log(document.activecanvas);
    var oText = new fabric.IText(text, {left: 100, top: 150, editable: false});
    document.activecanvas.add(oText);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    document.activecanvas.renderAll();
  }
  //add an image object
  function addImage(url) {
    var img = new fabric.Image.fromURL(url, function (oImg) {
      oImg.scaleToWidth(225);
      document.activecanvas.add(oImg);
      var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
      document.activecanvas.setActiveObject(thisObj);
      thisObj.center();
      thisObj.setCoords();
      document.activecanvas.renderAll();
    });
  }
  //add a rectangle object
  function addRect() {
    var rect = new fabric.Rect({left: 100, top: 100, fill: 'rgb(19,149,26)', width: 50, height: 30});
    document.activecanvas.add(rect);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    document.activecanvas.renderAll();
  }
  //sets the active object (see getLayer)
  function layerOps(get) {
    document.activecanvas.setActiveObject(document.activecanvas.item(get));
  }
  //layer list of active canvas
  function getLayers() {
    var objects = document.activecanvas.getObjects();
    var layers = "";
    for (var object in objects) {
      var index = object;
      object = objects[object];
      var value;
      if (object.type == "i-text") value = object.text;
      else value = "";
      layers += "<li>";
      layers += "<span onclick=\"toggleVisible("+index+",'get')\"></span>";
      layers += "<label>" + object.type + " - " + value + "</label>";
      layers += "<div class=\"moveLayer\">";
      layers +=   "<a class=\"down\" onclick=\"moveBack("+index+")\">&#9652;</a>";
      layers +=   "<a class=\"up\" onclick=\"moveFront("+index+")\">&#9652;</a>";
      layers += "</div>\n";
    }
    $("#layers").html("<span>Layers on this side:</span>"+layers);
  }
  //moves object one layer up
  function moveFront(index) {
    document.activecanvas.getObjects()[index].bringForward();
    document.activecanvas.discardActiveObject();
    document.activecanvas.renderAll();
  }
  //moves object one layer Back
  function moveBack(index) {
    document.activecanvas.getObjects()[index].sendBackwards();
    document.activecanvas.discardActiveObject();
    document.activecanvas.renderAll();
  }
  //toggles visibility of object
  function toggleVisible(index,method) {
    if (method == "get") {
        console.log("get");
      if (document.activecanvas.getObjects()[index].visible == true) {
        return "Hide";
      }
      else {
        return "Show";
      }
    }
    else if (method == "set") {
      document.activecanvas.getObjects()[index].visible = !document.activecanvas.getObjects()[index].visible;
      document.activecanvas.discardActiveObject();
      document.activecanvas.renderAll();
    }
  }
  //render image from select
  function renderImage(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      the_url = event.target.result;
      addImage(the_url);
    }
    reader.readAsDataURL(file);
  }
  //object operations
  function objectops(object) {
    if(object.type == "i-text") {
      $("#textops").trigger('click');
      $("#textops article input[name='updatetext']").val(object.text);
      $("#textops article input[name='updatestrokewidth']").val(object.strokeWidth);
      $("#textops article input[name='updatefill']").spectrum("set",object.fill);
      $("#textops article input[name='updatestroke']").spectrum("set",object.stroke);
      $("#textops article input[name='updateback']").spectrum("set",object.backgroundColor);
    }
    else if(object.type == "recto") {
      $("#rectops").trigger('click');
      $("#rectops article input[name='updatestroke']").spectrum("set",object.stroke);
      $("#rectops article input[name='updatefill']").spectrum("set",object.fill);
      $("#rectops article input[name='updatestrokewidth']").val(object.strokeWidth);
    }
    $(".font").val(object.get('fontFamily'));
  }

//add operations
  //add image
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
  //auto trigger image add
  $("#imgtoadd").change(function(){
    $("#addimg").trigger("click");
  });
  //add text
  $("#addtext").click(function(){
    addText($("#texttoadd").val() || "text");
  });
  //add rectangle
  $("#addrect").click(function(){
    addRect()
  });

//text operations
  //make active text bold
  $(".bold").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontWeight')=='normal') object.set('fontWeight','bold');
    else object.set('fontWeight','normal');
    document.activecanvas.renderAll();
  });
  //make active text italic
  $(".italic").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontStyle')=='normal') object.set('fontStyle','italic');
    else object.set('fontStyle','normal');
    document.activecanvas.renderAll();
  });
  //switch text decoration
  $(".textDecoration").click(function(){
    object = document.activecanvas.getActiveObject();
    decor = object.get('textDecoration');
    if (decor=='underline') object.set('textDecoration','line-through');
    else if (decor == 'line-through') object.set('textDecoration','overline');
    else if (decor == 'overline') object.set('textDecoration','none');
    else object.set('textDecoration','underline');
    document.activecanvas.renderAll();
  });
  //change font
  $(".font").change(function(){
    object = document.activecanvas.getActiveObject();
    object.set('fontFamily',$(".font").val());
    document.activecanvas.renderAll();
  });
  //update text
  $("input[name='updatetext']").keyup(function(){
    if ($("input[name='updatetext']").val().trim() != "") {
    document.activecanvas.getActiveObject().text = $("input[name='updatetext']").val();
    document.activecanvas.renderAll();
    }
  });
  $("input[name='updatetext']").change(function(){
    if ($("input[name='updatetext']").val().trim() != "") {
    docuemtn.activecanvas.getActiveObject().text = $("input[name='updatetext']").val();
    docuemtn.activecanvas.renderAll();
    }
  });
  //update text color attributes
  $("#textops .color").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'i-text') {
      active.set('backgroundColor',$("#textops article input[name='updateback']").val());
      active.set('fill',$("#textops article input[name='updatefill']").val());
      active.set('stroke',$("#textops article input[name='updatestroke']").val());
      document.activecanvas.renderAll();
    }
  });

//rectangle operations
  //update rectangle color attributes
  $("#rectops .color").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'rect') {
      active.set('fill',$("#rectops article input[name='updatefill']").val());
      active.set('stroke',$("#rectops article input[name='updatestroke']").val());
      document.activecanvas.renderAll();
    }
  });
  //update rectangle stroke width
  $("#rectops input[name='updatestrokewidth']").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'rect') {
      active.set('strokeWidth',$("#rectops article input[name='updatestrokewidth']").val());
      active.setCoords();
      document.activecanvas.renderAll();
    }
  });

//generic operations
  //remove
  $(".remove").click(function(){
    object = document.activecanvas.getActiveObject().remove();
  });
  //keys
  $(document).keyup(function(e){
    if (e.which==8) {
      if (document.activecanvas.getActiveObject().type != 'i-text')
        $(".remove").trigger("click");
      else if (!($("input").is(":focus")))
        $(".remove").trigger("click");
    }
    if (e.which == 66 && e.ctrlKey) $(".bold").trigger("click");
    if (e.which == 73 && e.ctrlKey) $(".italic").trigger("click");
    if (e.which == 85 && e.ctrlKey) $(".textDecoration").trigger("click");
  });
  //select operations

//canvas listeners
  //front
  canvasfront.on('object:selected', function(object){
    object = object.target;
    objectops(object);
  });
  canvasfront.on('after:render', function() {
    getLayers();
  });
  canvasfront.on('selection:cleared',function(){
    $("ul#ops li article").slideUp('fast');
  });
  //back
  canvasback.on('object:selected', function(object){
    object = object.target;
    objectops(object);
  });
  canvasback.on('after:render', function() {
    getLayers();
  });
  canvasback.on('selection:cleared',function(){
    $("ul#ops li article").slideUp('fast');
  });
  //left
  canvasleft.on('object:selected', function(object){
    object = object.target;
    objectops(object);
  });
  canvasleft.on('after:render', function() {
    getLayers();
  });
  canvasleft.on('selection:cleared',function(){
    $("ul#ops li article").slideUp('fast');
  });
  //right
  canvasright.on('object:selected', function(object){
    object = object.target;
    objectops(object);
  });
  canvasright.on('after:render', function() {
    getLayers();
  });
  canvasright.on('selection:cleared',function(){
    $("ul#ops li article").slideUp('fast');
  });

  addRect();
  addText("hey");
  addRect();
