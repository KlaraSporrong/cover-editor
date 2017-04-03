angular.module('TextService', [
	'CanvasScaler'
])
.service('textService', ['canvasScaler', function(canvasScaler){
	this.canvasObject = null;
	this.text_string = '';
	this.text_color = '#FFF';
	this.initCanvas = function(canvas) {
		this.canvasObject = canvasScaler.scaleCanvas(canvas, 640, 1280);
	}
	this.updateTextString = function(text_string) {
		this.text_string = text_string;
		drawText(this.canvasObject, this.text_string, this.text_color)
	}
	this.updateTextColor = function(text_color) {
		this.text_color = text_color;
		drawText(this.canvasObject, this.text_string, this.text_color)
	}
	this.isLayerComplete = function() {
		return (!this.text_string || !this.canvasObject) ? false : true;
	}
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
	function drawText (canvasObject, text_string, text_color) {
		var canvas = canvasObject.canvas;
		var ctx = canvas.getContext("2d");
		var screenType = canvasObject.screenType;
		clearCanvas(canvas, ctx)
		font_size = 140/screenType;
		ctx.font = "900 "+font_size+"px Helvetica Neue";
		ctx.fillStyle = text_color || '#FFF';
		ctx.textAlign = "center";
		text_string = text_string || '';
		ctx.fillText(text_string, canvas.width/(2*screenType), canvas.height/(2*screenType));
		canvas.height/screenType, canvas.height/screenType
	}
}])