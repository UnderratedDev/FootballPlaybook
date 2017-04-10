function FormationItem(file, name, img, classActive = false) {
	var self = this;
	
	self.xml         = file;
	self.playname    = name;
	self.thumbnail   = img;
	self.classActive = observable(classActive);
}

function DesignPlaybookViewModel () {
    var self = this;
    var c = new fabric.Canvas("canvas");
    var ctx = c.getContext("2d");
    // c.objectCaching = false
    var line, cline, isDown, isCDown;
    var lineDraw = xDraw = cDraw = rDraw = tDraw = clDraw = egg = snapToGrid = selection = ctrlDown = false;
	var clcVisible = true;
    var canvasWrapper = document.getElementById('canvasWrapper');
	c.setWidth(canvasWrapper.clientWidth);
	c.setHeight((c.width)/1.87);
    var grid = grid = c.width/21.0222;
	// console.log(grid);
    var copiedObjects = new Array ();
    self.colour = ko.observable ("#ffffff");
    var editCanvas = false;
    var editCanvasId;
    var editCanvasItem;
    
    fabric.isTouchSupported = true;
    
    console.log (fabric.isTouchSupported);
    
    document.addEventListener('touchstart', function(){
        console.log('touchstart', arguments);
    }, false);
    document.addEventListener('touchmove', function(){
        console.log('touchmove', arguments);
    }, false);
    document.addEventListener('touchend', function(){
        console.log('touchend', arguments);
    }, false);
    
    // document.body.innerHTML = 'ontouchstart' in document;
        
    
    c.on({
        'object:selected': onObjectSelected,
        'object:moving': onObjectMoving,
        'before:selection:cleared': onBeforeSelectionCleared,
    });
    
    function longpressFunc() {
        console.log ("he");
        // var text = document.createTextNode(' Gesture ');
        // info.insertBefore(text, info.firstChild);
     };
  
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
				width: c.width,
				height: c.height,
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
	
	$(window).resize(function () {
		setupBackground ();
		c.setWidth(canvasWrapper.clientWidth);
		c.setHeight((c.width)/1.87);
		grid = c.width/21.0222;
		if (snapToGrid) {
			noSnapObjectsToGrid();
			snapToGrid = true;
			snapObjectsToGrid();
		}
	});
    
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
	
	$('#defensePlaysCarousel').on('slid.bs.carousel', function(){
		var i = $('#defensePlaysCarousel .active').index(); // or: $('.item:visible').index();
		for (j = 0; j < self.defensePremiumArray().length; j++) {
			self.defensePremiumArray()[j].classActive = false;
		}
        console.log (i);
		self.defensePremiumArray()[i].classActive = true;
		$('#defensePlaysCarousel.item').removeClass('active').eq(i).addClass('active');
	});
	
	$('#offensePlaysCarousel').on('slid.bs.carousel', function(){
		var i = $('#offensePlaysCarousel .active').index(); // or: $('.item:visible').index();
		for (j = 0; j < self.offensePremiumArray().length; j++) {
			self.offensePremiumArray()[j].classActive = false;
		}
		self.offensePremiumArray()[i].classActive = true;
		$('#offensePlaysCarousel.item').removeClass('active').eq(i).addClass('active');
	});
	
	$('#loadPlay').click(function() {
		var dItem, oItem;
		ko.utils.arrayForEach(self.defensePremiumArray(), function(item) {
			if(item.classActive == true)
				dItem = item;
		});
		
		ko.utils.arrayForEach (self.offensePremiumArray(), function(item) {
            // console.log (item);
            if (item.classActive) {
                oItem = item;
            }
        });
		console.log(dItem);
		console.log(dItem.xml);
		console.log(oItem);
        dataSend = { "defence" : dItem.xml, "offence" : oItem.xml };
        $.ajax({
            type : 'POST',
            url  : 'designBackend.php',
            data : dataSend,
            success : function (response) {
                c.clear ();
                setupBackground ();
                var jsonArr = jQuery.parseJSON (response);
                console.log (jsonArr);
                for (let i = 0; i < jsonArr.length; ++i) {
                    console.log (jsonArr[i]);
                    if (jsonArr[i]['type'] == 'X') {
                        xmlcross  = new fabric.Text('X', { 
                            left: jsonArr[i]['x'], 
                            top : jsonArr[i]['y'],
                            originX : 'center',
                            originY : 'center',
                            fontFamily: 'Arial',
                            fontSize: (c.width / 20),
                            textAlign: 'center',
                            fill: self.colour (),
                            selectable: false,
                            perPixelTargetFind: true
                        });
                        console.log (xmlcross);
                        c.add (xmlcross);
                        // c.bringToFront(xmlcross)
                        // c.add(cross).renderAll().setActiveObject (cross);
                        xmlcross.setCoords();
                    }
                }
                // c.renderAll.bind(c)();
                c.renderAll ();
                // console.log (response);
            }
        });
	});
    
    function loadCanvasFromJSONRow (canvasObj) {
        c.clear ();
        c.loadFromJSON(canvasObj, c.renderAll.bind(c), function(o, object) {
            // fabric.log(o, object);
        });
        c.forEachObject(function(object){ 
           object.selectable = false; 
        });
    }
    
    if (sessionStorage.length > 0) {
        editCanvasId   = sessionStorage.getItem('id');
        editCanvasItem = sessionStorage.getItem('canvas');
        console.log (editCanvasItem);
        loadCanvasFromJSONRow (editCanvasItem);
        sessionStorage.clear ();
        editCanvas = true;
    }
	
    setupBackground ();
   /*  
    $("#loadPlay").click (function () {
        var dItem, oItem;
        ko.utils.arrayForEach (self.defenseStandardArray(), function(item) {
            console.log (item);
            if (item.classActive) {
                dItem = item;
            }
        });
        
        ko.utils.arrayForEach (self.offenseStandardArray(), function(item) {
            console.log (item);
            if (item.classActive) {
                dItem = item;
            }
        }); 
            
        console.log (dItem);
        console.log (oItem);
    }); */
    function generateGrid () {
        for (let i = 0; i < (c.width / grid); ++i)
            c.add(new fabric.Line([ i * grid, 0, i * grid, c.width], { stroke: '#ccc', selectable: false, name :'gridLine'}));
        for (let i = 0; i < (c.height / grid); ++i)
            c.add(new fabric.Line([ 0, i * grid, c.width, i * grid], { stroke: '#ccc', selectable: false, name :'gridLine' }))
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

    $('#CLCVisibleCheck').change (function () {
        if (clcVisible)
            hideLineCircles();
        else
            showLineCircles();
        clcVisible = !clcVisible;
    });

    $('#yellowBtn').click (function () {
        self.updateColour("#f1f827");
		$('.colorbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#yellowBtn').addClass('border');
    });
    
    $('#whiteBtn').click (function () {
        self.updateColour("#ffffff");
		$('.colorbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#whiteBtn').addClass('border');
    });
    
    $('#grayBtn').click (function () {
        self.updateColour("#424242");
		$('.colorbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#grayBtn').addClass('border');
    });
    
    $('#blueBtn').click (function () {
        self.updateColour("#95ccff");
		$('.colorbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#blueBtn').addClass('border');
    });
    
    $('#redBtn').click (function () {
        self.updateColour("#ff0000");
		$('.colorbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#redBtn').addClass('border');
    });
	
	$(function() {
        $('#customBtn').colorpicker().on('changeColor', function(e){
			$('#ColourPalleteBtn')[0].style.color = e.color.toString('rgba');
			self.updateColour(e.color.toString('rgba'));
			$('.colorbtn').each(function(index){
				$(this).removeClass('border');
			});
			$('#customBtn').addClass('border');
		});
		
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
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#selectBtn').addClass('border');
        c.defaultCursor = 'default';
        lineDraw = xDraw = cDraw = clDraw = rDraw = tDraw = egg = selection = true;
        selectCanvasObjects (true);
        selectableLineCircles();
        c.off('mouse:down'); // turn off events used by curve line
        c.off('mouse:move');
        c.off('mouse:up');
        c.renderAll();
    });
    
    $('#lineBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#lineBtn').addClass('border');
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
              strokeWidth: c.width/189.2,
              fill: self.colour (),
              stroke: self.colour (),
              originX: 'center',
              originY: 'center',
              selectable: false,
              perPixelTargetFind: true,
              shadow: 'rgba(0,0,0,1) 5px 5px 7px'
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
		var p1, p2;
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#cLineBtn').addClass('border');
        // c.defaultCursor = 'default';
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = cDraw = rDraw = tDraw = egg = true;
		clDraw = false;
		c.on ('mouse:down', function (o) {
            if (clDraw)
				return;
			isCDown = true;
        	
			cline = null;
			clDraw = true;
        });
		
		c.on ('mouse:move', function(o) {
            // clDraw = false;
		    if (!clDraw)
                return;
            if (!isCDown)
                return;
			pointer = c.getPointer(o.e);
			if (cline == null) {
				console.log(cline);
				cline = makeCurveLine(pointer.x, pointer.y);
				p1 = cline.circle1;
				p2 = cline.circle2;
				hideLineCircles();
			}
			
			var pointer = c.getPointer(o.e);
			p0x = cline.path[0][1];
			p0y = cline.path[0][2];
			p1x = cline.path[1][1];
			p1y = cline.path[1][2];
			deleteCurveLine(cline);
			cline = makeCurveLine(p0x, p0y, p1x, p1y, pointer.x, pointer.y);
            /* cline.path[1][3] = pointer.x;
            cline.path[1][4] = pointer.y;
			p2.setLeft(pointer.x - 12);
			p2.setTop(pointer.y - 12);
			cline.path[1][1] = pointer.x - 100;
            cline.path[1][2] = pointer.y - 50;
			p1.setLeft(cline.path[1][1] - 12);
			p1.setTop(cline.path[1][2] - 12); */
            // line.path[1][3] = pointer.x;
            // line.path[1][4] = pointer.y;
			/* p2.setLeft(pointer.x - c.width/78.83333);
			p2.setTop(pointer.y - c.width/78.83333); */
			// line.path[1][1] = pointer.x - c.width/9.46;
            // line.path[1][2] = pointer.y - c.width/18.92;
			// p1.setLeft(line.path[1][1] - c.width/78.83333);
			// p1.setTop(line.path[1][2] - c.width/78.83333);
			c.renderAll();
        });

        c.on('mouse:up', function(o){
            if (!clDraw)
                return;
            isCDown = false;
			c.deactivateAll().renderAll();
			p1.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
            c.deactivateAll().renderAll();
			if (cline != null) {
				cline.circle0.setCoords();
				cline.circle1.setCoords();
				cline.circle2.setCoords();
				cline.setCoords();
			}
			clDraw = false;
            // clDraw = true;
        });
    });
    
    $('#circleBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#circleBtn').addClass('border');
        c.off('mouse:down');
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = clDraw = rDraw = tDraw = egg = true;
        cDraw    = false;
        c.on ('mouse:down', function (e) {
            if (cDraw)
                return;
            c.add (new fabric.Circle ({
               radius : c.width/47.3,
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
// <<<<<<< HEAD
/*
               strokeWidth : 5,
               left   : e.e.offsetX - 20,
               top    : e.e.offsetY - 20,
               selectable: false,
               perPixelTargetFind: true, */
// =======
               strokeWidth : c.width / 189.2,
               left   : e.e.offsetX - c.width/47.3,
               top    : e.e.offsetY - c.width/47.3,
               selectable: false,
               perPixelTargetFind: true,
               shadow: 'rgba(0,0,0,1) 5px 5px 7px'
// >>>>>>> tablePage
            }));
        });
    });
    
    $('#crossBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#crossBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = rDraw = tDraw = egg = true;
        xDraw    = false;
        c.defaultCursor = 'crosshair';        
        c.on ('mouse:down', function (e) {
            if (xDraw)
                return;
            var cross  = new fabric.Text('X', { left: e.e.offsetX - c.width/94.6, top : e.e.offsetY - c.width/37.84,
                            fontFamily: 'Arial', 
                            fontSize: c.width/20,
                            textAlign: 'center',
                            fill: self.colour (),
                            selectable: false,
                            perPixelTargetFind: true,
                            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                            });
            c.add(cross);
            cross.setCoords();
        });
    });
    
    $('#rectBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#rectBtn').addClass('border');
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
// <<<<<<< HEAD
/*
               strokeWidth : 5,
               left   : e.e.offsetX - 25,
               top    : e.e.offsetY - 25,
               width: 40,
               height: 40,
               selectable: false,
               perPixelTargetFind: true, */
// =======

               strokeWidth : c.width/189.2,
               left   : e.e.offsetX - c.width/37.84,
               top    : e.e.offsetY - c.width/37.84,
               width: c.width/23.65,
               height: c.width/23.65,
               perPixelTargetFind: true,
               shadow: 'rgba(0,0,0,1) 5px 5px 7px',
               selectable: false
            }));
            c.add(rect);
        });
    });
    
    $('#triangleBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#triangleBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = rDraw = egg = true;
        tDraw = false;
        c.defaultCursor = 'crosshair';        
        c.on ('mouse:down', function (e) {
            if (tDraw)
                return;
            c.add(new fabric.Triangle(
				{
					width: c.width/23.65,
					height: c.width/23.65,
					selectable: false,
					fill: 'rgba(0,0,0,0)',
					stroke: self.colour (),
					strokeWidth: c.width/189.2,
					left   : e.e.offsetX - c.width/37.84,
					top    : e.e.offsetY - c.width/37.84,
					angle: 0,
                    perPixelTargetFind: true,
                    shadow: 'rgba(0,0,0,1) 5px 5px 7px'
				}));
        });
    });
    
    $('#eggBtn').click (function () {
		$('.toolbtn').each(function(index){
			$(this).removeClass('border');
		});
		$('#eggBtn').addClass('border');
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
                    left   : e.e.offsetX - c.width/47.3,
                    top    : e.e.offsetY - c.width/37.84,
                    width  : c.width/9.8541666,
                    height : c.width/17.518519,
                    angle: c.width/47.3,
                    padding: c.width/94.6,
                    cornersize: c.width/94.6,
                    selectable : false,
                    perPixelTargetFind: true,
                    shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                });
                //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                c.add(image);
            }
        });
    });
    
    $("#canvasPng").click (function() {
        var dataURL, checkSnap, canJSON;
        console.log (snapToGrid);
        if (snapToGrid) {
            noSnapObjectsToGrid ();
            dataURL    = c.toDataURL();
            canJSON = JSON.stringify (c);
            snapToGrid = true;
            snapObjectsToGrid ();
        } else {
           dataURL = c.toDataURL();
           canJSON = JSON.stringify (c);
        }
           document.getElementById('canvasImgSaved').src = dataURL;
           
           
           // var canJSON = JSON.stringify (c);
           // var canJSON = c.toDatalessObject();
           // console.log (canJSON);
           
           name    = $("#playName").val   ();
           playStr = $("#playString").val ();
           
           console.log (name);
           console.log (playStr);
           if (editCanvas) {
               var dataSend = { "posted_data" : canJSON, "playName" : name, "playStr" : playStr, "id" : editCanvasId };
               
               console.log (dataSend);
               
               $.ajax({
                type : 'POST',
                url  : 'designBackend.php',
                data : dataSend,
                success : function (response) {
                    console.log (response);
                    }
                });	
           } else {
               var dataSend = { "posted_data" : canJSON, "playName" : name, "playStr" : playStr };
               
               console.log (dataSend);
               
               $.ajax({
                type : 'POST',
                url  : 'designBackend.php',
                data : dataSend,
                success : function (response) {
                    console.log (response);
                    }
                });	
           }
           
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
	
	function deleteCurveLine(line) {
		// console.log(line.name)
		c.remove(line.circle0);
		c.remove(line.circle1);
		c.remove(line.circle2);
		c.remove(line);
        c.deactivateAll().renderAll();
	}
    function selectableLineCircles() {
        objs = c.getObjects();
	    for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.selectable = true;
                objs[i].circle1.selectable = true;
                objs[i].circle2.selectable = true;
            }
        }
    }
	function unselectableLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.selectable = false;
                objs[i].circle1.selectable = false;
                objs[i].circle2.selectable = false;
            }
        }
    }

	function showLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle1.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle2.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
            }
        }
    }

	function hideLineCircles() {
		objs = c.getObjects();
		for (i = 0; i < objs.length; i++)  {
			if(objs[i].name ==  'curve') {
				objs[i].circle0.selectable = false;
				objs[i].circle1.selectable = false;
				objs[i].circle2.selectable = false;
			    objs[i].circle0.animate('opacity', '0', {
					duration: 200,
					onChange: c.renderAll.bind(c),
				});
				objs[i].circle1.animate('opacity', '0', {
					duration: 200,
					onChange: c.renderAll.bind(c),
				});
				objs[i].circle2.animate('opacity', '0', {
					duration: 200,
					onChange: c.renderAll.bind(c),
				});
			}
		}
	}
    
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
          originX: 'center', // c.width / 2,// 'center',
          originY: 'center' // c.height / 2//  'center'
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
                // c.setActiveGroup(new fabric.Group(groupObjs, {originX: c.width / 2,originY: c.height / 2})).renderAll();
                c.setActiveGroup(new fabric.Group(groupObjs)).renderAll();
            }
        }
    });
	
	function makeCurveLine(p0x, p0y, p1x = p0x - 50, p1y = p0y - 50, p2x = p0x, p2y = p0y) {
		/*var l = new fabric.Path('M 65 0' + ' Q 100, 100, 200, 0'
				,{ fill: '', stroke: 'white', strokeWidth: 5, objectCaching: false, perPixelTargetFind: true
                    ,selectable: false, hasControls: false, hasBorders: false}); */
        // var l = new fabric.Path('M 65 0' + ' Q 100, 100, 200, 0', { fill: 'rgba(0,0,0,0)', stroke: self.colour (), strokeWidth: 5, objectCaching: false, perPixelTargetFind: true
                    // ,selectable: true, hasBorders: false, shadow: 'rgba(0,0,0,1) 5px 5px 7px'}); 
					
		var l = new fabric.Path('M ' + p0x + ' '  + p0y + ' Q ' + p1x + ', ' + p1y + ', ' + p2x + ', ' + p2y,
			{ fill: 'rgba(0,0,0,0)', stroke: self.colour (), strokeWidth: 5, objectCaching: false, perPixelTargetFind: true
                    ,selectable: true, hasBorders: false, shadow: 'rgba(0,0,0,1) 5px 5px 7px'});

		// l.path[0][1] = p0x; //p1x
        
		// l.path[0][2] = p0y; //p0y

		// l.path[1][1] = p1x; // p1x
		// l.path[1][2] = p1y; // p1y

		// l.path[1][3] = p2x; // p2x 
		// l.path[1][4] = p2y; // p2y

		l.name = "curve";
		
		p1 = makeCurvePoint(l.path[1][1], l.path[1][2], null, l, null);
		p1.name = "p1";
        
		c.add(p1);

		p0 = makeCurveCircle(l.path[0][1], l.path[0][2], l, p1, null);
		p0.name = "p0";
		c.add(p0);

		p2 = makeCurveCircle(l.path[1][3], l.path[1][4], null, p1, l);
		p2.name = "p2";
		c.add(p2);
		l.circle0 = p0;
		l.circle1 = p1;
		l.circle2 = p2;
		c.add(l);
		return l;
	}
	
  function makeCurveCircle(left, top, line1, line2, line3) {
    var rad = 12; // radius of p0 and p2 circles (l ends circles)
	var c = new fabric.Circle({
      left: left - rad,
      top: top - rad,
      strokeWidth: 5,
      radius: rad,
      fill: '#fff',
      stroke: '#666',
      selectable: false,
      shadow: 'rgba(0,0,0,1) 5px 5px 7px'
    });

    c.hasBorders = c.hasControls = false;

    c.line1 = line1;
    c.line2 = line2;
    c.line3 = line3;
	c.setLine1 = function(l) {
		this.line1 = l;
	}
	c.setLine3 = function(l) {
		this.line3 = l;
	}
	
    return c;
  }

  function makeCurvePoint(left, top, line1, line2, line3) {
    var rad = 14; // radius of p1 circle (skewing circle)
	var circ = new fabric.Circle({
      left: left - rad,
      top: top - rad,
      strokeWidth: 8,
      radius: rad,
      fill: '#fff',
      stroke: '#666',
      selectable: true,
      perPixelTargetFind: true,
      shadow: 'rgba(0,0,0,1) 5px 5px 7px'
    });

    circ.hasBorders = c.hasControls = false;
    
    circ.line1 = line1;
    circ.line2 = line2;
    circ.line3 = line3;
	circ.setLine2 = function(l) {
		this.line2 = l;
	}
    
    /*
    circ.line1.set ({
        shadow: 'rgba(0,0,0,1) 5px 5px 7px'
    });
    
    c.line2.set ({
        shadow: 'rgba(0,0,0,1) 5px 5px 7px'
    });
    c.line3.set ({
        shadow: 'rgba(0,0,0,1) 5px 5px 7px'
    }); */
    
    return circ;
  }
	var offsetX;
	var offsetY;
  function onObjectSelected(e) {
    var activeObject = e.target;
	pointer = c.getPointer(e.e);
	offsetX = pointer.x;
	offsetY = pointer.y;
	console.log(offsetX)
	console.log(offsetY)
	console.log(activeObject.name);
    if (activeObject.name == "p0" || activeObject.name == "p2") {
      activeObject.line2.animate('opacity', '1', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
    } else if (activeObject.name == "curve") {
		hideLineCircles();
	}
    $(document).keydown(function (e) {
          if(e.which == 46) {
              if (activeObject.name == "p0" || activeObject.name == "p1" || activeObject.name == "p2") {
                  var l;
                  if(activeObject.line2.name == "curve")
                      l = activeObject.line2;
                  else if (activeObject.line1)
                      l = activeObject.line1;
                  else if (activeObject.line3)
                      l = activeObject.line3;
                  deleteCurveLine(l);
                  c.discardActiveGroup().renderAll();
              }
          }
      });

  }
	

  function onBeforeSelectionCleared(e) {
    var activeObject = e.target;
    if (activeObject.name == "p0" || activeObject.name == "p2") {
      activeObject.line2.animate('opacity', '0', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
    }
    else if (activeObject.name == "p1") {
      activeObject.animate('opacity', '0', {
        duration: 200,
        onChange: c.renderAll.bind(c),
      });
    }
  }

  function onObjectMoving(e) {
	// console.log("hello")
    var p0x;
    var p0y;
    var p1x;
    var p1y;
    var p2x;
    var p2y;
	var pointer;
	if (e.target.name == "p0" || e.target.name == "p2") {
        var p = e.target;
		var rad = 12; // radius of p0 and p2 circles (line ends circles)
		pointer = c.getPointer(e.e);
		if (p.line1) {
			cline = p.line1 
			p.line1.path[0][1] = p.left + rad;
			p.line1.path[0][2] = p.top + rad;
			p0x = p.line1.path[0][1];
			p0y = p.line1.path[0][2];
			p1x = p.line1.path[1][1];
			p1y = p.line1.path[1][2];
			p2x = p.line1.path[1][3];
			p2y = p.line1.path[1][4];
			c.renderAll();
			c.on('mouse:up', function(o){
				deleteCurveLine(cline);
				cline = makeCurveLine(pointer.x, pointer.y, p1x, p1y, p2x, p2y);
				c.renderAll();
			});    
		}
		else if (p.line3) {       
			p.line3.path[1][3] = p.left + rad;
			p.line3.path[1][4] = p.top + rad;
			cline = p.line3 
			p0x = cline.path[0][1];
			p0y = cline.path[0][2];
			p1x = cline.path[1][1];
			p1y = cline.path[1][2];
			p2x = cline.path[1][3];
			p2y = cline.path[1][4];
			c.renderAll();
			c.on('mouse:up', function(o){
				deleteCurveLine(cline);
				cline = makeCurveLine(p0x, p0y, p1x, p1y, pointer.x, pointer.y);
				c.renderAll();
			});
		}
	}
    else if (e.target.name == "p1") {
		var p = e.target;
		var rad = 14; // radius of p1 circle (skewing circle)
		if (p.line2) {
			p.line2.path[1][1] = p.left + rad;
			p.line2.path[1][2] = p.top + rad;
			pointer = c.getPointer(e.e);
			cline = p.line2     
			p0x = cline.path[0][1];
			p0y = cline.path[0][2];
			p1x = cline.path[1][1];
			p1y = cline.path[1][2];
			p2x = cline.path[1][3];
			p2y = cline.path[1][4];
			c.renderAll();
			c.on('mouse:up', function(){
				deleteCurveLine(cline);
				cline = makeCurveLine(p0x, p0y, pointer.x, pointer.y, p2x, p2y);
				c.renderAll();
			});
		}
	} else if (e.target.name == "curve") {
		var p = e.target;
		cline = p;
		p.setCoords();
		p0x = cline.path[0][1];
		p0y = cline.path[0][2];
		p1x = cline.path[1][1];
		p1y = cline.path[1][2];
		p2x = cline.path[1][3];
		p2y = cline.path[1][4];
		// c.renderAll();
		c.on('mouse:up', function(o){
			showLineCircles();
			pointer = c.getPointer(e.e);
			// p.circle0.setLeft(p.path[0][1] + pointer.x  - offsetX - 12);
			// p.circle0.setTop(p.path[0][2] + pointer.y  - offsetY - 12);
			// p.circle1.setLeft(p.path[1][1] + pointer.x  - offsetX - 14);
			// p.circle1.setTop(p.path[1][2] + pointer.y  - offsetY - 14);
			// p.circle2.setLeft(p.path[1][3] + pointer.x  - offsetX - 12);
			// p.circle0.setLeft(p.path[1][4] + pointer.y  - offsetY - 12);
			// p.circle0.setLeft(p0x - 12);
			// p.circle0.setTop(p0y- 12);
			// p.circle1.setLeft(p1x - 14);
			// p.circle1.setTop(p1y - 14);
			// p.circle2.setLeft(p2x - 12);
			// p.circle2.setTop(p2y - 12);
			// p.circle0.setCoords();
			// p.circle1.setCoords();
			// p.circle2.setCoords();
			// p.setCoords();
			// c.renderAll();
			// deleteCurveLine(cline);
			// cline = makeCurveLine(p.path[0][1] + pointer.x  - offsetX, p.path[0][2] + pointer.y  - offsetY 
				// , p.path[1][1] + pointer.x  - offsetX , p.path[1][2] + pointer.y  - offsetY
				// , p.path[1][3] + pointer.x  - offsetX, p.path[1][4] + pointer.y  - offsetY);
			cline = makeCurveLine(p0x + pointer.x  - offsetX, p0y + pointer.y  - offsetY 
				, p1x + pointer.x  - offsetX , p1y + pointer.y  - offsetY
				, p2x + pointer.x  - offsetX, p2y + pointer.y  - offsetY);
			// showLineCircles();
			c.renderAll();
			
		});
	}
    else if (e.target.name == "p0" || e.target.name == "p2") {
      var p = e.target;

      p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
      p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
      p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
    //  p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
	}
	showLineCircles();
	selectableLineCircles();
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