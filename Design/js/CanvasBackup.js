function DesignPlaybookViewModel () {
    var self = this;
    var c = new fabric.Canvas("canvas");
    var ctx = c.getContext("2d");
    var line, isDown;
    var lineDraw = xDraw = cDraw = rDraw = tDraw = clDraw = egg = snapToGrid = selection = ctrlDown = false;
    var grid = 45;
    var canvasWrapper = document.getElementById('canvasWrapper');
    var copiedObjects = new Array ();
    self.colour = ko.observable ("#ffffff");
    
    function setupBackground () {
        var img = new Image();
        img.onload = function() {
           c.setBackgroundImage(img.src, c.renderAll.bind(c), {
                originX: 'left',
                originY: 'top',
                left: 0,
                top:  0
            });
        };
        img.src = "img/footballField.png"
        if (snapToGrid)
            snapObjectsToGrid ();
    };
    
    setupBackground ();
    
    function generateGrid () {
        for (let i = 0; i < (943 / grid); ++i)
            c.add(new fabric.Line([ i * grid, 0, i * grid, 943], { stroke: '#ccc', selectable: false, name :'gridLine'}));
        for (let i = 0; i < (504 / grid); ++i)
            c.add(new fabric.Line([ 0, i * grid, 943, i * grid], { stroke: '#ccc', selectable: false, name :'gridLine' }))
    }
    
    function snapObjectsToGrid () {
        generateGrid ();
        c.on ('object:moving', function (options) { 
            if (!snapToGrid)
                return;
            options.target.set({
              left: Math.round (options.target.left / grid) * grid,
              top:  Math.round (options.target.top / grid) * grid
            });
        });
        
        c.on ('object:added', function (options) { 
            if (!snapToGrid)
                return;
            options.target.set ({
                left: Math.round (options.target.left / grid) * grid,
                top:  Math.round (options.target.top / grid) * grid
            });
        });
    }
    
    function noSnapObjectsToGrid () {
        snapToGrid = false;
        var objs = c.getObjects ();
        for (let i = c.getObjects ().length - 1; i > 0; --i)
            if (c.item (i).name != null && c.item (i).name == "gridLine")
                c.remove (c.item (i));
    }
        
    $('#SnapGridCheck').change (function () {
       if ($(this).is(":checked")) {
           snapToGrid = true;
           snapObjectsToGrid ();
       } else
           noSnapObjectsToGrid ();
    });
    
    $('#yellowBtn').click (function () {
        self.updateColour("#f1f827");
    });
    
    $('#whiteBtn').click (function () {
        self.updateColour("#ffffff");
    });
    
    $('#grayBtn').click (function () {
        self.updateColour("#424242");
    });
    
    $('#blueBtn').click (function () {
        self.updateColour("#95ccff");
    });
    
    $('#redBtn').click (function () {
        self.updateColour("#ff0000");
    });
    
    self.updateColour = function(colour) {
        self.colour (colour);  
    };
    
    self.colour.subscribe (function() {
        var objArr = c.getActiveGroup();
        if (objArr == null) {
            var obj = c.getActiveObject();
            if (obj != null)
                obj.set(((obj.get('type') != "text") ? "stroke" : "fill"), self.colour ());
        } else
            c.getActiveGroup().forEachObject(function(o){ 
                o.set(((o.get('type') != "text") ? "stroke" : "fill"), self.colour ());
            });
        c.renderAll ();
    });
    
    function selectCanvasObjects(selection) {
        for (let i = 0; i < c.getObjects ().length; ++i)
            if (c.item (i).name == null || c.item (i).name != "gridLine")
                c.item (i).set ('selectable', selection);
            else 
                console.log (c.item (i));
    }
    
    $(":button").click(function() {
        if (selection) {
            var id = $(this).attr('id');
            if (id == 'lineBtn' || id == 'clineBtn' || id == 'circleBtn' || id == 'crossBtn' || id == 'rectBtn') {
                selectCanvasObjects (false);
                selection = false;
            }
        }
    });
    
    $('#selectBtn').click (function () {
        c.defaultCursor = 'default';
        lineDraw = xDraw = cDraw = clDraw = rDraw = tDraw = egg = selection = true;
        selectCanvasObjects (true);
    });
    
    $('#lineBtn').click (function () {
        c.off('mouse:down');
        xDraw = cDraw = clDraw = rDraw = tDraw = egg = true;
        lineDraw = false;
        c.defaultCursor = 'default';
        c.on('mouse:down', function(o) {
            if (lineDraw)
                return;
          isDown = true;
          var pointer = c.getPointer(o.e);
          var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
          line = new fabric.Line(points, {
              strokeWidth: 5,
              fill: self.colour (),
              stroke: self.colour (),
              originX: 'center',
              originY: 'center',
              selectable: false
          });
          c.add (line);
        });

        c.on ('mouse:move', function(o){
            if (lineDraw || !isDown)
                return;
            var pointer = c.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            c.renderAll();
        });

        c.on('mouse:up', function(o){
            if (lineDraw)
                return;
            isDown = false;    
            line.setCoords();
        }); 
    });
    
    $('#cLineBtn').click (function () {
        c.off('mouse:down');
        // c.defaultCursor = 'default';
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = cDraw = rDraw = tDraw = egg = true;
        clDraw   = false;
        c.on ('mouse:down', function (e) {
            if (clDraw)
                return;
            c.add (new fabric.Path("M 255 135 A 50 50 0 0 1 200 110", {
                stroke: self.colour (),
                strokeWidth : 2,
                fill: 'rgba(0,0,0,0)',
                left : e.e.offsetX - 20,
                top  : e.e.offsetY - 20,
                selectable: false
                })
            );
        });
    });
    
    $('#circleBtn').click (function () {
        c.off('mouse:down');
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = clDraw = rDraw = tDraw = egg = true;
        cDraw    = false;
        c.on ('mouse:down', function (e) {
            if (cDraw)
                return;
            c.add (new fabric.Circle ({
               radius : 20,
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
               strokeWidth : 5,
               left   : e.e.offsetX - 20,
               top    : e.e.offsetY - 20,
               selectable: false
            }));
        });
    });
    
    $('#crossBtn').click (function () {
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = rDraw = tDraw = egg = true;
        xDraw    = false;
        c.defaultCursor = 'crosshair';        
        c.on ('mouse:down', function (e) {
            if (xDraw)
                return;
            var cross  = new fabric.Text('X', { left: e.e.offsetX - 10, top : e.e.offsetY - 25,
                            fontFamily: 'Arial', 
                            fontSize: 53,
                            textAlign: 'center',
                            fill: self.colour (),
                            selectable: false
                            });
            c.add(cross);
            cross.setCoords();
        });
    });
    
    $('#rectBtn').click (function () {
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = tDraw = egg = true;
        rDraw    = false;
        c.defaultCursor = 'crosshair';        
        c.on ('mouse:down', function (e) {
            if (rDraw)
                return;
            var rect  = (new fabric.Rect ({
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
               strokeWidth : 5,
               left   : e.e.offsetX - 25,
               top    : e.e.offsetY - 25,
               width: 40,
               height: 40,
               selectable: false
            }));
            c.add(rect);
        });
    });
    
    $('#triangleBtn').click (function () {
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = rDraw = egg = true;
        tDraw = false;
        c.defaultCursor = 'crosshair';        
        c.on ('mouse:down', function (e) {
            if (tDraw)
                return;
            c.add(new fabric.Triangle(
                    {
                        width: 40,
                        height: 40,
                        selectable: false,
                        fill: 'rgba(0,0,0,0)',
                        stroke: self.colour (),
                        strokeWidth: 5,
                        left   : e.e.offsetX - 20,
                        top    : e.e.offsetY - 25,
                        angle: 0,
                    }));
        });
    });
    
    $('#eggBtn').click (function () {
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = rDraw = tDraw = true;
        egg = false;
        c.defaultCursor = 'crosshair';      
        c.on ('mouse:down', function (e) {
            if (egg)
                return;
            var imgObj = new Image();
            imgObj.src = "img/team/egg.png";
            imgObj.onload = function () {
                // start fabricJS stuff

                var image = new fabric.Image(imgObj);
                image.set({
                    left   : e.e.offsetX - 20,
                    top    : e.e.offsetY - 25,
                    width  : 96,
                    height : 54,
                    angle: 20,
                    padding: 10,
                    cornersize: 10,
                    selectable : false,
                });
                //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                c.add(image);
            }
        });
    });
    
    $("#canvasPng").click (function() {
        var dataURL, checkSnap;
        if (snapToGrid) {
            noSnapObjectsToGrid ();
            dataURL = c.toDataURL();
            snapToGrid = true;
            snapObjectsToGrid ();
        } else
            dataURL = c.toDataURL();

        document.getElementById('canvasImgSaved').src = dataURL;
    /*
        c.isDrawingMode = false;

        if(!window.localStorage) {
            alert("This function is not supported by your browser."); 
            return;
        }
        
        // to PNG
        window.open(c.toDataURL('png')); */
    });
    
    $('#clearCanvasBtn').click (function () {
        c.forEachObject (function (obj) {
            c.remove (obj);
        });
        c.clear ();
        setupBackground ();       
    });
    
    $(document).keydown(function (e) {
      if(e.which == 46) {
        var objArr = c.getActiveGroup();
        if (objArr == null) {
            var obj = c.getActiveObject();
            if (obj != null && obj.name != "gridLine")
                c.remove (obj);
        } else {
            c.getActiveGroup().forEachObject(function(o) {
                console.log (o);
                if (o.name != "gridLine")
                    c.remove (o);
                });
            c.discardActiveGroup().renderAll();
        }
        c.renderAll ();
      }
    });
    
    canvasWrapper.tabIndex = 1000;
    
    canvasWrapper.addEventListener('keydown', function(e) {
        
        if (e.keyCode == 17) 
            ctrlDown = true;
      
        if (ctrlDown && e.keyCode == 67) {
            copiedObjects = [];
        
        var activeObject = c.getActiveObject(),
            activeGroup = c.getActiveGroup();
            
        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
          
            c.discardActiveGroup();
          
            objectsInGroup.forEach(function(object) {
                copiedObjects.push(object);
            });
         } else if (activeObject)
            copiedObjects.push(activeObject);
       };

        if (ctrlDown && e.keyCode == 86) {
            var count = 0;
        if (copiedObjects.length == 1) {
            if (fabric.util.getKlass(copiedObjects[0].type).async) {
                copiedObjects[0].clone(function(clone) {
              
                pasteOne(clone);
              
                selectAll(1);
            });
            } else {
                pasteOne(copiedObjects[0].clone());
                selectAll(1);
            }
        } else if(copiedObjects.length > 1) { 
            for (var index = (copiedObjects.length - 1); index >= 0; --index) {
                if (fabric.util.getKlass(copiedObjects[index].type).async) {
                    copiedObjects[index].clone(function(clone) {
                        pasteOne(clone);
                        if (++count == copiedObjects.length)
                          selectAll(copiedObjects.length);
                    });
                } else{
                pasteOne(copiedObjects[index].clone());
              if (++count == copiedObjects.length) {
                selectAll(copiedObjects.length);
              }
            }
          }
        }
      }
    }, false);
        
    canvasWrapper.addEventListener('keyup', function(e) {
        if (e.keyCode == 17) 
            ctrlDown = false;
    });
    
    function pasteOne(clone) {
        // clone.left += 100;  // Adjust for new coordsforitems
        // clone.top += 100;   // Adjust for new coordsforitems
        clone.left += 25; // If in corner, may be outside of canvas
        clone.top  += 25; // If in corner, may be outside of canvas
        clone.set('canvas', c);
        clone.setCoords(); //Must call this when we cahnged our coordinates
        c.add(clone);
    };
    
    function selectAll(numberOfItems) {

      c.deactivateAll();
      c.discardActiveGroup();

      var objs = new Array();
      
      var canvasObjects = c.getObjects();
      
      var count = 0;
      
      for (var index = (canvasObjects.length - 1); index >= 0; --index) {
          console.log (canvasObjects);
          if (count < numberOfItems) 
              objs.push(canvasObjects[index].set('active', true));
          ++count;
      }
      var group = new fabric.Group(objs, {
          originX: 'center',
          originY: 'center'
      });
      c.setActiveGroup(group.setCoords()).renderAll();
    }
    
    canvasWrapper.addEventListener('keydown', function(e) {
        
        if (e.keyCode == 17) 
            ctrlDown = true;
      
        if (ctrlDown && e.keyCode == 65) {
            if (!snapToGrid)
                c.setActiveGroup(new fabric.Group(c.getObjects())).renderAll(); // (Select all without grid)
            else  {
                var objs = c.getObjects (), groupObjs = new Array ();
                for (let i = 0; i < objs.length; ++i)
                    if (c.item (i).name != "gridLine")
                        groupObjs.push(c.item (i));
                 c.setActiveGroup(new fabric.Group(groupObjs)).renderAll();
            }
        }
    });
}

var model;

$(document).ready (function () {
    model = new DesignPlaybookViewModel ();
    ko.applyBindings (model);
});

function update (jscolor) {
    model.updateColour (jscolor.toHEXString());
}
