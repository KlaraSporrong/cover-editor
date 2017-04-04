angular.module('PreviewService',[
	'CanvasScaler'
])
.service('previewService', ['canvasScaler', function(canvasScaler){
	this.canvasObject = null;
	this.initCanvas = function(canvas) {
		this.canvasObject = canvasScaler.scaleCanvas(canvas, 640, 1280);
	}
	this.mergeLayers = function(canvases) {
		drawCanvases(this.canvasObject, canvases)
	}
	function drawCanvases(canvasObject, canvases) {
		if(!canvases) {
			return;
		}
		var coverCanvas = canvasObject.canvas;
		var coverCtx = coverCanvas.getContext('2d');
		var screenType = canvasObject.screenType;
		for(var i = 0; i < canvases.length; i++) {
			var canvas = canvases[i];
			coverCtx.drawImage(canvas, 0,0, coverCanvas.width*screenType, coverCanvas.height*screenType, 0, 0, coverCanvas.width, coverCanvas.height);
		}
		var link = document.createElement('a');
		link.download = "cover.jpeg";
		link.href = coverCanvas.toDataURL("image/jpeg");
		link.click();
		coverCtx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
	}
}])