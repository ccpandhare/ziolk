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

//define functions
  //add a text object
  function addText(text) {
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
      $("ul#ops li article").slideUp('fast');
    });
  }
  //add a rectangle object
  function addRect() {
    var rect = new fabric.Rect({left: 100, top: 100, fill: 'rgb(19,149,26)', width: 50, height: 40});
    document.activecanvas.add(rect);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    document.activecanvas.renderAll();
  }
  //add an elipse object
  function addEllipse() {
    var ellipse = new fabric.Ellipse({left: 100, top: 100, fill: 'rgb(19,19,26)', rx: 30, ry: 20, stroke: 'rgb(20,20,02)'});
    document.activecanvas.add(ellipse);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    document.activecanvas.renderAll();
    console.log(thisObj);
  }
  //add a circle object
  function addCircle() {
    var circle = new fabric.Circle({left: 100, top: 100, fill: 'rgb(19,189,26)', radius: 20, dirty: false});
    document.activecanvas.add(circle);
    var thisObj = document.activecanvas.getObjects()[document.activecanvas.getObjects().length - 1];
    document.activecanvas.setActiveObject(thisObj);
    thisObj.center();
    thisObj.setCoords();
    document.activecanvas.renderAll();
    console.log(thisObj);
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
      if (object == document.activecanvas.getActiveObject())
        var li = "<li class=\"active\">"
      else
        var li = "<li>"
      layers += li;
      layers += "<span onclick=\"toggleVisible("+index+",'set')\">"+toggleVisible(index,'get')+"</span>";
      layers += "<label onclick=\"layerOps("+index+")\">" + object.type + " - " + value + "</label>";
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
      if (document.activecanvas.getObjects()[index].visible == true) {
        return "&#128065;";
      }
      else {
        return "";
      }
    }
    else if (method == "set") {
      document.activecanvas.getObjects()[index].visible = !document.activecanvas.getObjects()[index].visible;
      document.activecanvas.discardActiveObject();
      document.activecanvas.renderAll();
    }
  }
  //gets the textformatting
  function getTextFormatting(object, element, type) {
    console.log(object.get(type));
    if(object.get(type) == "normal" || object.get(type) == "none") element.removeClass('active');
    else element.addClass('active');
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
    else if(object.type == "circle" || object.type == "rect" || object.type == "ellipse") {
      $("#shapeops").trigger('click');
      $("#shapeops article input[name='updatestroke']").spectrum("set",object.stroke);
      $("#shapeops article input[name='updatefill']").spectrum("set",object.fill);
      $("#shapeops article input[name='updatestrokewidth']").val(object.strokeWidth);
      console.log(object.type);
      console.log(object.stroke);
      console.log(object.strokeWidth);
    }
    $(".font").val(object.get('fontFamily'));
  }
  //horizontal&vertical flip
  function flipObject(object, element, type) {
    if(object.get(type)) {
      object.set(type,false);
      element.removeClass('active');
    }
    else {
      object.set(type,true);
      element.addClass('active');
    }
    document.activecanvas.renderAll();
  }
  $(".flipX").click(function(){
    flipObject(document.activecanvas.getActiveObject(),$(this),"flipX");
  });
  $(".flipY").click(function(){
    flipObject(document.activecanvas.getActiveObject(),$(this),"flipY");
  });

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
  //add ellipse
  $("#addellipse").click(function(){
    addellipse()
  });
  //add circle
  $("#addcircle").click(function(){
    addCircle()
  });

//text operations
  //make active text bold
  $(".bold").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontWeight')=='normal') object.set('fontWeight','bold');
    else object.set('fontWeight','normal');
    getTextFormatting(object,$(this),'fontWeight');
    document.activecanvas.renderAll();
  });
  //make active text italic
  $(".italic").click(function(){
    object = document.activecanvas.getActiveObject();
    if (object.get('fontStyle')=='normal') object.set('fontStyle','italic');
    else object.set('fontStyle','normal');
    getTextFormatting(object,$(this),'fontStyle');
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
    getTextFormatting(object,$(this),'textDecoration');
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

//shape operations
  //update shape color attributes
  $("#shapeops .color").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'rect' || active.type ==  'ellipse' || active.type ==  'circle') {
      active.set('fill',$("#shapeops article input[name='updatefill']").val());
      active.set('stroke',$("#shapeops article input[name='updatestroke']").val());
      document.activecanvas.renderAll();
    }
  });
  //update shape stroke width
  $("#shapeops input[name='updatestrokewidth']").change(function(){
    var active = document.activecanvas.getActiveObject();
    if (active.type == 'rect' || active.type == 'ellipse' || active.type == 'circle') {
      active.set('strokeWidth',eval($("#shapeops article input[name='updatestrokewidth']").val()));
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
      if (!($("input").is(":focus")))
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
    $("ul#ops li.selected").removeClass('selected');
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
    $("ul#ops li.selected").removeClass('selected');
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
    $("ul#ops li.selected").removeClass('selected');
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
    $("ul#ops li.selected").removeClass('selected');
  });

  addRect();
  addEllipse();
  addCircle();
    addText("hey");
