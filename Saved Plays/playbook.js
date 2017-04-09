$(function () {

    var TableRow = function (playName, dateCreated, imgUrl, desc) {
			this.selectRow 	 = ko.observable (false);
            this.PlayName    = playName;
            this.DateCreated = dateCreated;
            this.imgUrl      = imgUrl;
            this.Desc        = desc;
         /* PlayID    
            PlayName  
            PlayString
            CreatedBy 
            UpdateDate */
    }

    function PlaybookViewModel () {
        var self = this;
		
        self.imagePath = ko.observable ();
        self.desc      = ko.observable ();
        self.name      = ko.observable ();
        self.imageLink = ko.observable ();
        self.TableRows = ko.observableArray ();
        /*
        self.selectPlay = function (item) {   
            alert ("hey");
        }; */
        
        self.selectPlay = function (item) {
			console.log (item);
			ko.utils.arrayForEach(self.TableRows (), function(obj) {
				obj.selectRow (false);
			});
			item.selectRow (true);
            self.imagePath (item.imgUrl);
            self.desc      (item.Desc);
            self.name      (item.PlayName);
            self.imageLink (item.imgUrl);
        };
		
		self.duplicatePlay = function () {
			var tblRow = new TableRow (self.name (), null, self.imagePath (), self.desc ());
			//mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, UpdateDate) VALUES ('"+self.name+"', '"+self.desc+"', 'Yudhvir', null)");
			self.TableRows.push (tblRow);
			self.selectPlay (tblRow);
        };
        
		/*
		self.duplicatePlay = function (item) {
			var tblRow = new TableRow ("test", null, "./Tesla.jpg", "desc");
			self.TableRows.push (tblRow);
			self.selectPlay (tblRow);
		}; */
        
        $.ajax({
			type : 'POST',
			url  : 'playbookbackend.php',
			data : "",
			success : function (response) {
                var objArr = jQuery.parseJSON(response);
                console.log (objArr);
                // Query with have from certain user so owner not required.
                // for (let i = 0; i < objArr.length; ++i)
                    // self.TableRows.push (new TableRow (objArr[i].PlayName, objArr[i].updateDate, "./Tesla.jpg", objArr[i].PlayString));
                // self.selectPlay (self.TableRows()[0]);
                // console.log (obj);
                /*
                for (var key in response) {
                    if (response.hasOwnProperty (key)) {
                        console.log (key + " -> " + response[key]);
                    }
                } */
                // console.log (response);
				}
			});	
        
        // self.TableRows = ko.observableArray ([new TableRow ("Hello", "Hello123", "./Tesla.jpg", "Name", "Desc")]);
        /*
        self.selectPlay = function (item) {
            self.imagePath = item.imgUrl;
        } */
        // self.People.push ({firstName : 'Jason', lastName : 'Sekhon'});
        // self.imagePath = ko.observable (self.TableRows (0).imgUrl);
    }
    ko.applyBindings (new PlaybookViewModel ());
});