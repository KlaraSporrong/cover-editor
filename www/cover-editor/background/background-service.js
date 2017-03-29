angular.module('background-service', [])
.service('backgroundService', ['$q', function($q){
	function convertToDataUrl(file) {
		var defer = $q.defer();
		var reader  = new FileReader();
		reader.addEventListener("load", function () {
			if(reader.result) {
				defer.resolve(reader.result)
			} else {
				defer.reject(undefined)
			}
		}, false);
		reader.readAsDataURL(file);
		return defer.promise;
	}
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Exported functions
	function drawImage(canvasObject, file, filter) {
		convertToDataUrl(file).then(function(dataURL){
			var image = new Image();
			image.addEventListener("load", function () {
				var canvas = canvasObject.canvas;
		        var ctx = canvas.getContext("2d");
		        var screenType = canvasObject.screenType;
		        var viewWidth = parseInt(canvas.style.width);
		        var viewHeight = parseInt(canvas.style.height);
		        clearCanvas(canvas, ctx);
		        if(filter) {
		        	ctx.filter =
		        		"brightness("+filter.brightness+"%) "+
	                    "contrast("+filter.contrast+"%) "+
	                    "saturate("+filter.saturate+"%)";
		        }
		        ctx.drawImage(image, 0,0, viewWidth*2, viewHeight*2, 0, 0, canvas.height/screenType, canvas.height/screenType);
		    });
		    image.setAttribute("src", dataURL);
		})
	}
	function isLayerComplete(ctrlObj) {
		if(!ctrlObj.file || !ctrlObj.canvasObject) {
			return false;
		}
		return true;
	}
	return {
		drawImage: drawImage,
		isLayerComplete: isLayerComplete
	}
}])