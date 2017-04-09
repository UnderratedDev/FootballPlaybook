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
        self.nameSortType  = false;
        self.dateSortType  = false;
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
        
        self.editPlaybook = function () {
            if (self.selectedPlays ().length > 1)
                alert ('Too many rows selected');
            else if (self.selectedPlays ().length == 0)
                alert ('Please select a row');
            else {
                sessionStorage.setItem('id', self.selectedPlays()[0].id);
                sessionStorage.setItem('canvas', self.selectedPlays()[0].canvasObj);
                window.location = "index.html";
            }
        }
        
        self.nameSort = function () {
            if (self.nameSortType) {
                self.TableRows.sort (function (left, right) {
                    return left.PlayName.localeCompare(right.PlayName) * -1;
                });
                self.nameSortType = false;
            } else {
                self.TableRows.sort (function (left, right) {
                    console.log (left.PlayName);
                    return left.PlayName.localeCompare(right.PlayName);
                });
                self.nameSortType = true;
            }
        };
        
        self.dateSort = function () {
            if (self.dateSortType) {
                self.TableRows.sort (function (left, right) {
                    return left.dateCreated == right.dateCreated ? 0 : left.dateCreated < right.dateCreated;
                });
                self.dateSortType = false;
            } else {
                self.TableRows.sort (function (left, right) {
                     return left.dateCreated == right.dateCreated ? 0 : left.dateCreated > right.dateCreated;
                });
                self.dateSortType = true;
            }
        };
        
        // use doc.save for "name".pdf
        self.allPlaysPDF = function () {
            var doc = new jsPDF ();
            img  = new Image();
            page = 0;
            ko.utils.arrayForEach(self.TableRows (), function (obj) {
                img.src = canvas.toDataURL('JPEG');
                doc.text (15, 25, obj.PlayName);
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 160);
                doc.text (15, 200, obj.PlayString);
                if (++page != self.TableRows().length)
                    doc.addPage ();
            });
            doc.save ("allPlays.pdf");
        };
        
        // black and white option needed also
        self.selectedPlaysPDF = function () {
            var doc = new jsPDF ();
            img  = new Image();
            page = 0;
            // doc.text(35, 25, 'Paranyan loves jsPDF');
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                img.src = canvas.toDataURL('JPEG');
                doc.text (15, 25, obj.PlayName);
                // parameter 5, 6 are width, height doc.add (img, 'JPEG', 15, 40, 180, 160);
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 160);
                doc.text (15, 200, obj.PlayString);
                if (++page != self.selectedPlays().length)
                    doc.addPage ();
            });
            doc.save('selectedPlays.pdf')
        };
        
        self.selectPlay = function (item) {
            if (self.ctrlDown) {
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
                    self.selectedPlays.removeAll();
                    item.selectRow (true);
                    self.selectedPlays.push (item);
                } else {
                    self.selectedPlays.push (item);
                    item.selectRow (true);
                }
            }
            
            self.desc      (item.PlayString);
            self.name      (item.PlayName);
            showImage      (item.canvasObj);
            self.selected = item;
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