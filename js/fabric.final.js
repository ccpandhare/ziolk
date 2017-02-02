//customize corners
fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: '#7777ff'
});

//define various canvasses
var canvasfront = new fabric.Canvas('canvasfront', {preserveObjectStacking: true, selection: false});
var canvasback = new fabric.Canvas('canvasback', {preserveObjectStacking: true, selection: false});
var canvasleft = new fabric.Canvas('canvasleft', {preserveObjectStacking: true, selection: false});
var canvasright = new fabric.Canvas('canvasright', {preserveObjectStacking: true, selection: false});
var canvasses = [canvasfront, canvasback, canvasleft, canvasright];

//define TShirt SVGs

//define front as initial active canvas
document.activecanvas = canvasfront;

var frontsidesvg = "data:image/svg+xml;utf8,<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 295.526 295.526' style='enable-background:new 0 0 295.526 295.526;' xml:space='preserve' width='100%' height='100%'><path fill='{{fillColor}}' d='M147.763,44.074c12.801,0,23.858-8.162,27.83-20.169c-7.578,2.086-17.237,3.345-27.83,3.345c-10.592,0-20.251-1.259-27.828-3.345C123.905,35.911,134.961,44.074,147.763,44.074z'/><path fill='{{fillColor}}' d='M295.158,58.839c-0.608-1.706-1.873-3.109-3.521-3.873l-56.343-26.01c-11.985-4.06-24.195-7.267-36.524-9.611c-0.434-0.085-0.866-0.126-1.292-0.126c-3.052,0-5.785,2.107-6.465,5.197c-4.502,19.82-22.047,34.659-43.251,34.659c-21.203,0-38.749-14.838-43.25-34.659c-0.688-3.09-3.416-5.197-6.466-5.197c-0.426,0-0.858,0.041-1.292,0.126c-12.328,2.344-24.538,5.551-36.542,9.611L3.889,54.965c-1.658,0.764-2.932,2.167-3.511,3.873c-0.599,1.726-0.491,3.589,0.353,5.217l24.46,48.272c1.145,2.291,3.474,3.666,5.938,3.666c0.636,0,1.281-0.092,1.917-0.283l27.167-8.052v161.97c0,3.678,3.001,6.678,6.689,6.678h161.723c3.678,0,6.67-3.001,6.67-6.678V107.66l27.186,8.052c0.636,0.191,1.28,0.283,1.915,0.283c2.459,0,4.779-1.375,5.94-3.666l24.469-48.272C295.629,62.428,295.747,60.565,295.158,58.839z'/></svg>";

//define functions
  //generate dataURL for tshirt
  function TShirtSVG(element,color){
    return eval(element+"sidesvg").replace(new RegExp('{{fillColor}}', 'g'), color);
  }

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
      var index = objects.length - object - 1;
      object = objects[index];
      console.log(object.isLinked);
      var value;
      if (object.type == "i-text") value = object.text;
      else if (object.type == "image") value = object.width + " x " + object.height;
      else value = "&nbsp;<span class=\"layercolor\" style=\"background: "+object.fill+"; border: 3px solid "+(object.stroke || "transparent")+"\"></span>";
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
    document.activecanvas.renderAll();
  }
  //moves object one layer Back
  function moveBack(index) {
    document.activecanvas.getObjects()[index].sendBackwards();
    document.activecanvas.renderAll();
  }
  //moves object one unit left
  function moveLeft(object) {
    object.left -= 1;
    document.activecanvas.renderAll();
  }
  function moveRight(object) {
    object.left += 1;
    document.activecanvas.renderAll();
  }
  function moveUp(object) {
    object.top -= 1;
    document.activecanvas.renderAll();
  }
  function moveDown(object) {
    object.top += 1;
    document.activecanvas.renderAll();
  }
  //deletes object
  function removeObject() {
    var index = document.activecanvas.getObjects().indexOf(document.activecanvas.getActiveObject());
    if (index == document.activecanvas.getObjects().length - 1) isLast = true;
    if (!isLast) newindex = index + 1;
    else if (index != 0) newindex = index - 1;
    else newindex = null;
    object = document.activecanvas.getActiveObject().remove();
    console.log("hi2");
    document.activecanvas.setActiveObject(document.activecanvas.getObjects()[newindex]);
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
  //Scale canvas
  function scaleCanvas(canvas,SCALE_FACTOR) {
    var canvasScale = 1;
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
      $(".formatobject.active").removeClass("active");
      $("#textops .formatobject").addClass("active");
      $("#textops article input[name='updatetext']").val(object.text);
      $("#textops article input[name='updatestrokewidth']").val(object.strokeWidth);
      $("#textops article input[name='updatefill']").val(object.fill);
      $("#textops article input[name='updatestroke']").val(object.stroke);
      $("#textops article input[name='updateback']").val(object.backgroundColor);
    }
    else if(object.type == "circle" || object.type == "rect" || object.type == "ellipse") {
      $("#shapeops").trigger('click');
      $(".formatobject.active").removeClass("active");
      $("#shapeops .formatobject").addClass("active");
      $("#shapeops article input[name='updatestroke']").val(object.stroke);
      $("#shapeops article input[name='updatefill']").val(object.fill);
      $("#shapeops article input[name='updatestrokewidth']").val(object.strokeWidth);
    }
    else {
      $(".formatobject.active").removeClass("active");
      $("#imageops .formatobject").addClass("active");
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
  //image functions
    //remove background
    function removeBackground(R,G,B,A) {
      var filter = new fabric.Image.filters.RemoveBackground({
        R: R,
        G: G,
        B: B,
        A: A,
        threshold: document.removebackgroundstr || 20
      });
      var object = document.activecanvas.getActiveObject();
      object.filters.push(filter);
      object.applyFilters(document.activecanvas.renderAll.bind(document.activecanvas));
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
  //add ellipse
  $("#addellipse").click(function(){
    addellipse()
  });
  //add circle
  $("#addcircle").click(function(){
    addCircle()
  });


//TShirt operations
  //change TShirt Color
  $("#tshirtcolor").change(function(){
    document.tshirtcolor = $(this).val();
    $("div#front").css({'background': "url(\""+TShirtSVG("front",document.tshirtcolor)+"\")"});
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

//image operations
  $(".removeBackgroundToggle").click(function(){
    if(document.removebackground) {
      $(this).removeClass("active");
      document.removebackground = false;
      $(this).html("Remove Background mode is OFF");
    }
    else {
      $(this).addClass("active");
      document.removebackground = true;
      $(this).html("Remove Background mode is ON");
    }
  });
  $(".removeBackgroundStr").click(function(){
    var currentstr = document.removebackgroundstr;
    if ($(this) == $(".removeBackgroundStr.light")) document.removebackgroundstr = 10;
    if ($(this) == $(".removeBackgroundStr.normal")) document.removebackgroundstr = 20;
    if ($(this) == $(".removeBackgroundStr.heavy")) document.removebackgroundstr = 30;
    $(".removeBackgroundStr").removeClass("active");
    $(this).addClass("active");
  });

//generic operations
  //remove
  $(".remove").click(function(){
    removeObject();
  });
  //Flip operations
  $(".flipX").click(function(){
    flipObject(document.activecanvas.getActiveObject(),$(this),"flipX");
  });
  $(".flipY").click(function(){
    flipObject(document.activecanvas.getActiveObject(),$(this),"flipY");
  });
  //keys
  $(document).keyup(function(e){
    if (e.which==8) {
      console.log("hi");
      if (!($("input").is(":focus")))
        removeObject();
    }
    if (e.which == 66 && e.ctrlKey) $(".bold").trigger("click");
    if (e.which == 73 && e.ctrlKey) $(".italic").trigger("click");
    if (e.which == 85 && e.ctrlKey) $(".textDecoration").trigger("click");
    if (e.which == 37) $(moveLeft(document.activecanvas.getActiveObject()));
    if (e.which == 38) $(moveUp(document.activecanvas.getActiveObject()));
    if (e.which == 39) $(moveRight(document.activecanvas.getActiveObject()));
    if (e.which == 40) $(moveDown(document.activecanvas.getActiveObject()));
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
  canvasfront.on('mouse:down',function(options) {
    if (options.target == null) {
      canvasfront.discardActiveObject();
    }
    else if (canvasfront.getActiveObject().type == 'image' && document.removebackground) {
      X = options.e.offsetX;
      Y = options.e.offsetY;
      R = canvasfront.getContext("2d").getImageData(X,Y,1,1).data[0];
      G = canvasfront.getContext("2d").getImageData(X,Y,1,1).data[1];
      B = canvasfront.getContext("2d").getImageData(X,Y,1,1).data[2];
      A = canvasfront.getContext("2d").getImageData(X,Y,1,1).data[3];
      //$("#getPixel").css("background","rgb("+R+","+G+","+B+","+A+")");
      removeBackground(R,G,B,A);
    }
    else if (canvasfront.getActiveObject().type == 'i-text' && document.linktextmode) {
      canvasfront.getActiveObject().isLinked = true;
      canvasfront.getActiveObject().linkedTo = document.linktextto;
    }
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
  canvasback.on('mouse:down',function(options) {
    if (options.target == null) {
      canvasback.discardActiveObject();
    }
    else if (canvasback.getActiveObject().type == 'image' && document.removebackground) {
      X = options.e.offsetX;
      Y = options.e.offsetY;
      R = canvasback.getContext("2d").getImageData(X,Y,1,1).data[0];
      G = canvasback.getContext("2d").getImageData(X,Y,1,1).data[1];
      B = canvasback.getContext("2d").getImageData(X,Y,1,1).data[2];
      A = canvasback.getContext("2d").getImageData(X,Y,1,1).data[3];
      $("#getPixel").css("background","rgb("+R+","+G+","+B+","+A+")");
        removeBackground(R,G,B,A);
    }
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
  canvasleft.on('mouse:down',function(options) {
    if (options.target == null) {
      canvasleft.discardActiveObject();
    }
    else {
      X = options.e.offsetX;
      Y = options.e.offsetY;
      R = canvasleft.getContext("2d").getImageData(X,Y,1,1).data[0];
      G = canvasleft.getContext("2d").getImageData(X,Y,1,1).data[1];
      B = canvasleft.getContext("2d").getImageData(X,Y,1,1).data[2];
      A = canvasleft.getContext("2d").getImageData(X,Y,1,1).data[3];
      $("#getPixel").css("background","rgb("+R+","+G+","+B+","+A+")");
      if (canvasleft.getActiveObject().type == 'image' && document.removebackground) {
        removeBackground(R,G,B,A);
      }
    }
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
  canvasright.on('mouse:down',function(options) {
    if (options.target == null) {
      canvasright.discardActiveObject();
    }
    else {
      X = options.e.offsetX;
      Y = options.e.offsetY;
      R = canvasright.getContext("2d").getImageData(X,Y,1,1).data[0];
      G = canvasright.getContext("2d").getImageData(X,Y,1,1).data[1];
      B = canvasright.getContext("2d").getImageData(X,Y,1,1).data[2];
      A = canvasright.getContext("2d").getImageData(X,Y,1,1).data[3];
      $("#getPixel").css("background","rgb("+R+","+G+","+B+","+A+")");
      if (canvasright.getActiveObject().type == 'image' && document.removebackground) {
        removeBackground(R,G,B,A);
      }
    }
  });

  addRect();
  addEllipse();
  addCircle();
    addText("hey");
