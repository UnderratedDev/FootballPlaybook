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
			// console.log (item);
			// ko.utils.arrayForEach(self.TableRows (), function(obj) {
				//obj.selectRow (false);
			// }); 
            if (self.ctrlDown) {
                // self.selectedPlays.push (item);
                // ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                   // ko.utils.arrayForEach(self.TableRows (), function (obj_) {
                     //   if (obj.id == obj_.id)
                       //     obj_.selectRow (obj_.selectRow() ? false : true);
                    // });
                // });
                if (item.selectRow()) {
                    item.selectRow (false);
                    self.selectedPlays.remove (item);
                } else {
                    self.selectedPlays.push (item);
                    item.selectRow (true);
                }
                /*
                ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                    if (obj.id == item.id)
                        obj.selectRow (false);
                }); */
            } else {
                if (!self.dupe) {
                    ko.utils.arrayForEach(self.TableRows (), function (obj) {
                        obj.selectRow (false);
                    });
                    // ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                        
                    // });
                    self.selectedPlays.removeAll ();
                    item.selectRow (true);
                    self.selectedPlays.push (item);
                } else {
                    self.selectedPlays.push (item);
                    item.selectRow (true);
                }
            }
            
			// item.selectRow (true);
            self.desc      (item.PlayString);
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
                            console.log (self.selectedPlays ());    
                            
                            var dataSend = { "name" : obj.PlayName, "playString" : obj.PlayString, "canvasObj" : obj.canvasObj };
                            $.ajax({
                            type : 'POST',
                            url  : 'playbookbackend.php',
                            data : dataSend,
                            success : function (response) {
                                var objArr = jQuery.parseJSON(response);
                                // console.log (objArr);
                                // console.log (objArr['PlayID']);
                                tblRow = new TableRow (obj_.PlayName, obj_.PlayString, obj_.DateCreated, obj_.canvasObj, objArr['PlayID']);
                                self.TableRows.push (tblRow);
                                self.selectPlay     (tblRow);
                                }
                            });
                        }
                    });
                });
            self.dupe = false;
        };
        
        self.deletePlay = function () {
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                var deleteSend = { "deleteId" : obj.id };
                $.ajax({
                type : 'POST',
                url  : 'playbookbackend.php',
                data : deleteSend,
                success : function (response) {
                    self.TableRows.remove (obj);
                    self.selectedPlays.remove (obj)
                    }
                });
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
                if (self.TableRows ().length > 0)
                    self.selectPlay (self.TableRows()[0]);
				}
			});	
    }
    ko.applyBindings (new PlaybookViewModel ());
});