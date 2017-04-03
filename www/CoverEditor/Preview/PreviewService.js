angular.module('PreviewService',[
	'CanvasScaler'
])
.service('previewService', ['canvasScaler', function(canvasScaler){
	this.canvasObject = null;
	this.initCanvas = function(canvas) {
		this.canvasObject = canvasScaler.scaleCanvas(canvas, 640, 1280);
	}
	this.mergeLayers = function(layers) {
		if (layers.complete) {
	      drawCanvases(this.canvasObject, layers.canvases)
	    } else {
	      alertIncompleteMessage(layers.canvases);
	    }
	}
	function alertIncompleteMessage(canvases) {
		var incompleteCanvases = [];
		for(i in canvases) {
			incompleteCanvases.push(angular.element(canvases[i]).attr('name'));
		}
		alert('['+incompleteCanvases.toString().replace(',', ', ')+'] not complete!')
	}
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		var dataURL = coverCanvas.toDataURL("image/jpeg");
		var link = document.createElement('a');
		link.download = "cover.jpeg";
		link.href = coverCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
		link.click();
		clearCanvas(coverCanvas, coverCtx);
		coverCanvas = null;
	}
}])