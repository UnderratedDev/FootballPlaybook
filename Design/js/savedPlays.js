$(document).ready (function () {
    var c = new fabric.Canvas("canvas");
	var ctx = c.getContext("2d");
	c.setWidth(canvasWrapper.clientWidth);
	c.setHeight((c.width)/1.87);
	
	$(window).resize(function () {
		c.setWidth(canvasWrapper.clientWidth);
		c.setHeight((c.width)/1.87);
	});
});