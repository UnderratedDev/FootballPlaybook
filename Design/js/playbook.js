$(function () {
    var canvas = new fabric.Canvas("canvas");
    canvas.deactivateAll();
    canvas.selection = false;
    var canvasWrapper = document.getElementById('canvasWrapper');
    var ctx    = canvas.getContext("2d");
    var TableRow = function (playName, playString, dateCreated, canvasObj, id) {
			this.selectRow 	 = ko.observable (false);
            this.PlayName    = playName;
            this.PlayString  = playString;
            this.DateCreated = dateCreated;
            this.canvasObj   = canvasObj;
            this.id          = id;
            showImage (canvasObj);
            // this.DateUpdated = dateUpdated;
            
            // document.getElementById('playimg').src = this.imgUrl;
    }
    
    function showImage (canvasObj) {
        canvas.clear ();
        canvas.loadFromJSON(canvasObj, canvas.renderAll.bind(canvas), function(o, object) {
            // fabric.log(o, object);
        });
        canvas.deactivateAll();
        canvas.selection = false;
        canvas.forEachObject(function(object){ 
           object.selectable = false; 
        });
    }

    function PlaybookViewModel () {
        var self = this;
		
        self.desc          = ko.observable ();
        self.name          = ko.observable ();
        self.TableRows     = ko.observableArray ();
        self.selected;
        self.selectedPlays = ko.observableArray();
        self.ctrlDown      = false;
        self.shiftDown     = false;
        self.dupe          = false;
        /*
        self.selectPlay = function (item) {   
            alert ("hey");
        }; */
        
        document.addEventListener('keyup', function(e) {
            if (e.keyCode != 17) 
                self.ctrlDown  = false;
            if (e.keycode != 16)
                self.shiftDown = false;
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 17) {
                self.ctrlDown  = true;
            } else
                self.ctrlDown  = false;
            if (e.keycode == 16) {
                self.shiftDown = true;
            } else
                self.shiftDown = false;
        });
        
        document.addEventListener('keyup', function(e) {
            if (e.keyCode == 17)
                self.ctrlDown  = false;
            if (e.keycode == 16)
                self.shiftDown = false;
        });
        
        self.selectPlay = function (item) {
			console.log (item);
			ko.utils.arrayForEach(self.TableRows (), function(obj) {
				obj.selectRow (false);
			});
            if (self.ctrlDown) {
                self.selectedPlays.push (item);
                ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                    ko.utils.arrayForEach(self.TableRows (), function (obj_) {
                        if (obj.id == obj_.id)
                            obj_.selectRow (obj_.selectRow() ? false : true);
                    });
                });
            } else {
                if (!self.dupe) {
                    self.selectedPlays.removeAll ();
                    item.selectRow (true);
                    self.selectedPlays.push (item);
                } else {
                    item.selectRow (true);
                    self.selectedPlays.push (item);
                }
            }
            
			// item.selectRow (true);
            self.desc      (item.Desc);
            self.name      (item.PlayName);
            showImage      (item.canvasObj);
            // console.log    (self.selected);
            self.selected  = item;
        };
		
		self.duplicatePlay = function () {
            self.dupe = true;
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                    ko.utils.arrayForEach(self.TableRows (), function (obj_) {
                        if (obj.id == obj_.id) {
                            obj_.selectRow (obj_.selectRow() ? false : true);
                            console.log (self.selectedPlays ());    
                            tblRow = new TableRow (obj_.PlayName, obj_.PlayString, obj_.DateCreated, obj_.canvasObj);
                            self.TableRows.push (tblRow);
                            self.selectPlay     (tblRow);
                            var dataSend = { "name" : tblRow.PlayName, "playString" : tblRow.PlayString, "canvasObj" : tblRow.canvasObj };
                            $.ajax({
                            type : 'POST',
                            url  : 'playbookbackend.php',
                            data : dataSend,
                            success : function (response) {
                                console.log (response);
                                }
                            });
                        }
                    });
                });
        };
        
        self.deletePlay = function () {
            self.TableRows.remove (self.selected);
            var deleteSend = { "deleteId" : self.selected.id };
            $.ajax({
			type : 'POST',
			url  : 'playbookbackend.php',
			data : deleteSend,
			success : function (response) {
                console.log (response);
				}
			});
        }
        
        var dataRet = { "getData" : 1 };
        
        $.ajax({
			type : 'POST',
			url  : 'playbookbackend.php',
			data : dataRet,
			success : function (response) {
                var objArr = jQuery.parseJSON(response);
                for (let i = 0; i < objArr.length; ++i)
                    self.TableRows.push (new TableRow (objArr[i].PlayName, objArr[i].PlayString, objArr[i].CreateDate, objArr[i].CanvasObj, objArr[i].PlayID));
                self.selectPlay (self.TableRows()[0]);
				}
			});	
    }
    ko.applyBindings (new PlaybookViewModel ());
});