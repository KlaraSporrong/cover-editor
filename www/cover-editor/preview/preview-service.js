angular.module('preview-service',[])
.service('previewService', [function(){
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
	function mergeLayers(canvasObject, canvases) {
		if(!canvases) {
			return;
		}
		var coverCanvas = canvasObject.canvas;
		var coverCtx = coverCanvas.getContext('2d');
		var screenType = canvasObject.screenType;
		var viewWidth = parseInt(coverCanvas.style.width);
        var viewHeight = parseInt(coverCanvas.style.height);
		for(var i = 0; i < canvases.length; i++) {
			var canvas = canvases[i];
			coverCtx.drawImage(canvas, 0,0, viewWidth*2*screenType, viewHeight*2*screenType, 0, 0, coverCanvas.width, coverCanvas.height);
		}
		var dataURL = coverCanvas.toDataURL("image/jpeg");
		var link = document.createElement('a');
		link.download = "cover.jpeg";
		link.href = coverCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
		link.click();
		clearCanvas(coverCanvas, coverCtx);
		coverCanvas = null;
	}
	return {
		mergeLayers: mergeLayers
	}
}])