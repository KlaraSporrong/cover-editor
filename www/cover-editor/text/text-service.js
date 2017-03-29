angular.module('text-service', [])
.service('textService', function(){
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
	function drawText(canvasObject, text_string, text_color) {
		var canvas = canvasObject.canvas;
		var ctx = canvas.getContext("2d");
		var screenType = canvasObject.screenType;
		var viewWidth = parseInt(canvas.style.width);
	    var viewHeight = parseInt(canvas.style.height);
		clearCanvas(canvas, ctx)
		font_size = 140/screenType;
		ctx.font = "900 "+font_size+"px Helvetica Neue";
		ctx.fillStyle = text_color || '#FFF';
		ctx.textAlign = "center";
		text_string = text_string || '';
		ctx.fillText(text_string, canvas.width/(2*screenType), canvas.height/(2*screenType));
		canvas.height/screenType, canvas.height/screenType
	}
	function isLayerComplete(ctrlObj) {
		if(!ctrlObj.text_string || !ctrlObj.canvasObject) {
			return false;
		}
		return true;
	}
	return {
		drawText: drawText,
		isLayerComplete: isLayerComplete
	}
})