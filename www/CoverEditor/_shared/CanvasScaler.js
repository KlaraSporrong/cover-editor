angular.module('CanvasScaler',[])
.service('canvasScaler', function(){
	this.scaleCanvas = function(canvas, canvasViewSize, canvasImageSize) {
        canvas.style.height = canvasViewSize +'px';
        canvas.style.width = canvasViewSize +'px';
        canvas.height = canvasViewSize;
		canvas.width = canvasViewSize;

		var ctx = canvas.getContext('2d');
		var screenType;

		if (canvasDpiScaler) {
            screenType = canvasDpiScaler(canvas, ctx);
            console.log('screenType: ',screenType)
        }
        if(CanvasRenderingContext2D) {
            CanvasRenderingContext2D.mozImageSmoothingEnabled = true;
            CanvasRenderingContext2D.webkitImageSmoothingEnabled = true;
            CanvasRenderingContext2D.msImageSmoothingEnabled = true;
            CanvasRenderingContext2D.imageSmoothingEnabled = true;
        }
        if (screenType === 1) {
            canvas.width = canvasImageSize;
            canvas.height = canvasImageSize;
        }
        return {canvas: canvas, screenType:screenType};
	}
})