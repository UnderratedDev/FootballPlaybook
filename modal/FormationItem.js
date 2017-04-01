function viewModel () {
		
	var self = this;
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
}

$(document).ready(function () {
	ko.applyBindings( new viewModel());
});
/*
var viewModel = {
        categories: ko.observableArray([
            { name: 'Fruit', items: [ 'Apple', 'Orange', 'Banana' ] },
            { name: 'Vegetables', items: [ 'Celery', 'Corn', 'Spinach' ] }
        ])
};
ko.applyBindings( viewModel);
*/
//for testing only

/*
arr = getDefense(true);
for(i = 0; i < arr.length; i++) {
	playname = document.createElement("p")
	playname.appendChild(document.createTextNode(arr[i].playname));
    xml = document.createElement("p")
	xml.appendChild(document.createTextNode(arr[i].xml))
	img = document.createElement("img")
    img.src = arr[i].thumbnail;
    img.width = 200
    document.body.appendChild(img)
    document.body.appendChild(playname)
    document.body.appendChild(xml)
}
arr = getOffense(true);
for(i = 0; i < arr.length; i++) {
	playname = document.createElement("p")
	playname.appendChild(document.createTextNode(arr[i].playname));
    xml = document.createElement("p")
	xml.appendChild(document.createTextNode(arr[i].xml))
	img = document.createElement("img")
	img.src = arr[i].thumbnail;
	img.width = 200
	document.body.appendChild(img)
    document.body.appendChild(playname)
    document.body.appendChild(xml)
} */

