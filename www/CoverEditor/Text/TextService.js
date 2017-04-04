angular.module('TextService', [
	'CanvasScaler'
])
.service('textService', ['canvasScaler', function(canvasScaler){
	this.canvasObject = null;
	this.textObj = {
		textString: '',
		textColor: '#FFF'
	}
	this.textColors = [
		{
			id: 'white',
			colorCode: '#FFF'
		},
		{
			id: 'black',
			colorCode: '#000'
		}
	]
	this.initCanvas = function(canvas) {
		this.canvasObject = canvasScaler.scaleCanvas(canvas, 640, 1280);
	}
	this.updateText = function() {
		drawText(this.canvasObject, this.textObj.textString, this.textObj.textColor)
	}
	this.isLayerComplete = function() {
		return (!this.textObj.textString || !this.canvasObject) ? false : true;
	}
	function drawText (canvasObject, textString, textColor) {
		var canvas = canvasObject.canvas;
		var ctx = canvas.getContext("2d");
		var screenType = canvasObject.screenType;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		font_size = 140/screenType;
		ctx.font = "900 "+font_size+"px Helvetica Neue";
		ctx.fillStyle = textColor || '#FFF';
		ctx.textAlign = "center";
		textString = textString || '';
		ctx.fillText(textString, canvas.width/(2*screenType), canvas.height/(2*screenType));
		canvas.height/screenType, canvas.height/screenType
	}
}])