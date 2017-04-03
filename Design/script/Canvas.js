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
    
    c.on({
    'object:selected': onObjectSelected,
    'object:moving': onObjectMoving,
    'before:selection:cleared': onBeforeSelectionCleared
    });
    
    function FormationItem(file, name, img, classActive = false) {
		this.xml = file;
		this.playname = name;
		this.thumbnail = img;
		this.classActive = classActive;
	}

	/*
	self.anotherObservableArray = ko.observableArray([
		{ name: "Bungle", type: "Bear" },
		{ name: "George", type: "Hippo" },
		{ name: "Zippy", type: "Unknown" }
	]); */
	self.defensePremiumArray = ko.observableArray ();
	self.defenseStandardArray = ko.observableArray ();
	self.offensePremiumArray = ko.observableArray ();
	self.offenseStandardArray = ko.observableArray ();

	self.defensePremiumArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/defense/noneDef.png"
		,true
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_over.xml"
		,"4-3 Over"
		,"icons/football/defense/4_3Over.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_normal.xml"
		,"4-3 Normal"
		,"icons/football/defense/4_3Normal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_under.xml"
		,"4-3 Under"
		,"icons/football/defense/4_3Under.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/3_4_normal.xml"
		,"3-4"
		,"icons/football/defense/3_4.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/nickel_normal.xml"
		,"Nickel Normal"
		,"icons/football/defense/nickelNormal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/nickel_3_3_5.xml"
		,"Nickel 3-3-5"
		,"icons/football/defense/nickel3_3_5.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/dime_normal.xml"
		,"Dime Normal"
		,"icons/football/defense/dimeNormal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/dime_cloud.xml"
		,"Dime Cloud"
		,"icons/football/defense/dimeCloud.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/goalline.xml"
		,"Goalline"
		,"icons/football/defense/goallineDef.png"
	));
	console.log (self.defensePremiumArray());
	
	
	//Defense Standard 
	self.defenseStandardArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/defense/noneDef.png"
		,true
	));
	self.defenseStandardArray.push (new FormationItem (
		"xml/football/defense/4_3_normal.xml"
		,"4-3"
		,"icons/football/defense/4_3Normal.png"
	));
	self.defenseStandardArray.push (new FormationItem (
		"xml/football/defense/3_4_normal.xml"
		,"3-4"
		,"icons/football/defense/3_4.png"
	));

	
	//Offense Premium
	self.offensePremiumArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/offense/noneOff.png"
		,true
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_normal.xml"
		,"I Normal"
		,"icons/football/offense/iNormal.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_twins.xml"
		,"I Twins"
		,"icons/football/offense/iTwins.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_2_tight.xml"
		,"I 2 Tight"
		,"icons/football/offense/i2Tight.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/pro_form.xml"
		,"PRO FORM"
		,"icons/football/offense/proForm.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/single_back.xml"
		,"Single Back"
		,"icons/football/offense/singleBack.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/single_2_tight.xml"
		,"Single2Tight"
		,"icons/football/offense/Single2Tight.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/shotgun.xml"
		,"Shotgun"
		,"icons/football/offense/shotgun.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/shotgun_empty.xml"
		,"Shotgun Empty"
		,"icons/football/offense/shotgunEmpty.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/goalline.xml"
		,"Goalline"
		,"icons/football/offense/goallineOff.png"
	));

	
	//Offense Standard
	self.offenseStandardArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/offense/noneOff.png"
		,true
	));
	self.offenseStandardArray.push (new FormationItem (
		"xml/football/offense/i_normal.xml"
		,"I FORM"
		,"icons/football/offense/iNormal.png"
	));
	self.offenseStandardArray.push (new FormationItem (
		"xml/football/offense/pro_form.xml"
		,"PRO FORM"
		,"icons/football/offense/proForm.png"
	));
    
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
        
        /*
        c.add(new fabric.Rect ({
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
               strokeWidth : 5,
               left   : 535,
               top    : 267,
               width: 40,
               height: 40,
               selectable: false
            })); */
    };
    
    function FormationItem(file, name, img, classActive = false) {
		this.xml = file;
		this.playname = name;
		this.thumbnail = img;
		this.classActive = classActive;
	}
    
    self.defensePremiumArray = ko.observableArray ();
	self.defenseStandardArray = ko.observableArray ();
	self.offensePremiumArray = ko.observableArray ();
	self.offenseStandardArray = ko.observableArray ();

	self.defensePremiumArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/defense/noneDef.png"
		,true
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_over.xml"
		,"4-3 Over"
		,"icons/football/defense/4_3Over.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_normal.xml"
		,"4-3 Normal"
		,"icons/football/defense/4_3Normal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/4_3_under.xml"
		,"4-3 Under"
		,"icons/football/defense/4_3Under.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/3_4_normal.xml"
		,"3-4"
		,"icons/football/defense/3_4.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/nickel_normal.xml"
		,"Nickel Normal"
		,"icons/football/defense/nickelNormal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/nickel_3_3_5.xml"
		,"Nickel 3-3-5"
		,"icons/football/defense/nickel3_3_5.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/dime_normal.xml"
		,"Dime Normal"
		,"icons/football/defense/dimeNormal.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/dime_cloud.xml"
		,"Dime Cloud"
		,"icons/football/defense/dimeCloud.png"
	));
	self.defensePremiumArray.push (new FormationItem (
		"xml/football/defense/goalline.xml"
		,"Goalline"
		,"icons/football/defense/goallineDef.png"
	));
	console.log (self.defensePremiumArray());
	
	
	//Defense Standard 
	self.defenseStandardArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/defense/noneDef.png"
		,true
	));
	self.defenseStandardArray.push (new FormationItem (
		"xml/football/defense/4_3_normal.xml"
		,"4-3"
		,"icons/football/defense/4_3Normal.png"
	));
	self.defenseStandardArray.push (new FormationItem (
		"xml/football/defense/3_4_normal.xml"
		,"3-4"
		,"icons/football/defense/3_4.png"
	));

	
	//Offense Premium
	self.offensePremiumArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/offense/noneOff.png"
		,true
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_normal.xml"
		,"I Normal"
		,"icons/football/offense/iNormal.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_twins.xml"
		,"I Twins"
		,"icons/football/offense/iTwins.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/i_2_tight.xml"
		,"I 2 Tight"
		,"icons/football/offense/i2Tight.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/pro_form.xml"
		,"PRO FORM"
		,"icons/football/offense/proForm.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/single_back.xml"
		,"Single Back"
		,"icons/football/offense/singleBack.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/single_2_tight.xml"
		,"Single2Tight"
		,"icons/football/offense/Single2Tight.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/shotgun.xml"
		,"Shotgun"
		,"icons/football/offense/shotgun.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/shotgun_empty.xml"
		,"Shotgun Empty"
		,"icons/football/offense/shotgunEmpty.png"
	));
	self.offensePremiumArray.push (new FormationItem (
		"xml/football/offense/goalline.xml"
		,"Goalline"
		,"icons/football/offense/goallineOff.png"
	));

	
	//Offense Standard
	self.offenseStandardArray.push (new FormationItem(
		"xml/none.xml"
		,"NONE"
		,"icons/football/offense/noneOff.png"
		,true
	));
	self.offenseStandardArray.push (new FormationItem (
		"xml/football/offense/i_normal.xml"
		,"I FORM"
		,"icons/football/offense/iNormal.png"
	));
	self.offenseStandardArray.push (new FormationItem (
		"xml/football/offense/pro_form.xml"
		,"PRO FORM"
		,"icons/football/offense/proForm.png"
	));
    
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
        var pointer;
        var points;
          
		c.on('mouse:down', function(o) {
			pointer = c.getPointer(o.e);
			points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
		});
        // c.defaultCursor = 'default';
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = cDraw = rDraw = tDraw = egg = true;
        clDraw   = false;
        c.on ('mouse:down', function (e) {
            if (clDraw)
                return;
			var line = new fabric.Path('M 65 0' + ' Q 100, 100, 200, 0'
				, { fill: '', stroke: 'white', strokeWidth: 5, objectCaching: false });

			line.path[0][1] = 100;
			line.path[0][2] = 100;

			line.path[1][1] = 200;
			line.path[1][2] = 200;

			line.path[1][3] = 300;
			line.path[1][4] = 100;

			line.selectable = false;
			c.add(line);

			var p1 = makeCurvePoint(200, 200, null, line, null)
			p1.name = "p1";
			c.add(p1);

			var p0 = makeCurveCircle(100, 100, line, p1, null);
			p0.name = "p0";
			c.add(p0);

			var p2 = makeCurveCircle(300, 100, null, p1, line);
			p2.name = "p2";
			c.add(p2);
            // drawQuadratic ();
            /*
                c.add (new fabric.Path("M 255 135 A 50 50 0 0 1 200 110", {
                stroke: self.colour (),
                strokeWidth : 2,
                fill: 'rgba(0,0,0,0)',
                left : e.e.offsetX - 20,
                top  : e.e.offsetY - 20,
                selectable: false
                })
            ); */
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
    
    function drawQuadratic() {
		// var pointer = c.getPointer(o.e);
         // var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
        var line = new fabric.Path('M 65 0' + ' Q 100, 100, 200, 0'
			, { fill: '', stroke: 'white', strokeWidth: 5, objectCaching: false });

        line.path[0][1] = 100;
        line.path[0][2] = 100;

        line.path[1][1] = 200;
        line.path[1][2] = 200;

        line.path[1][3] = 300;
        line.path[1][4] = 100;

        line.selectable = false;
        c.add(line);

        var p1 = makeCurvePoint(200, 200, null, line, null)
        p1.name = "p1";
        c.add(p1);

        var p0 = makeCurveCircle(100, 100, line, p1, null);
        p0.name = "p0";
        c.add(p0);

        var p2 = makeCurveCircle(300, 100, null, p1, line);
        p2.name = "p2";
        c.add(p2);

  };

  function makeCurveCircle(left, top, line1, line2, line3) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 12,
      fill: '#fff',
      stroke: '#666'
    });

    c.hasBorders = c.hasControls = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;

    return c;
  }

  function makeCurvePoint(left, top, line1, line2, line3) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 8,
      radius: 14,
      fill: '#fff',
      stroke: '#666'
    });

    c.hasBorders = c.hasControls = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;

    return c;
  }

  function onObjectSelected(e) {
    var activeObject = e.target;

    if (activeObject.name == "p0" || activeObject.name == "p2") {
      activeObject.line2.animate('opacity', '1', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
      activeObject.line2.selectable = true;
    }
  }

  function onBeforeSelectionCleared(e) {
    var activeObject = e.target;
    if (activeObject.name == "p0" || activeObject.name == "p2") {
      activeObject.line2.animate('opacity', '0', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
      activeObject.line2.selectable = false;
    }
    else if (activeObject.name == "p1") {
      activeObject.animate('opacity', '0', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
      activeObject.selectable = false;
    }
  }

  function onObjectMoving(e) {
    if (e.target.name == "p0" || e.target.name == "p2") {
      var p = e.target;

      if (p.line1) {
        p.line1.path[0][1] = p.left;
        p.line1.path[0][2] = p.top;
        p.line1.path
      }
      else if (p.line3) {
        p.line3.path[1][3] = p.left;
        p.line3.path[1][4] = p.top;
      }
    }
    else if (e.target.name == "p1") {
      var p = e.target;

      if (p.line2) {
        p.line2.path[1][1] = p.left;
        p.line2.path[1][2] = p.top;
      }
    }
    else if (e.target.name == "p0" || e.target.name == "p2") {
      var p = e.target;

      p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
      p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
      p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
      p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    }
  }
}

var model;

$(document).ready (function () {
    model = new DesignPlaybookViewModel ();
    ko.applyBindings (model);
});

function update (jscolor) {
    model.updateColour (jscolor.toHEXString());
}