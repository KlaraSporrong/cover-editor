angular.module('BackgroundService', [
	'CanvasScaler'
])
.service('backgroundService', ['$q','canvasScaler', function($q, canvasScaler){
	this.canvasObject = null;
	this.file = null;
	this.filter = {
			contrast: 100,
			brightness: 100,
			saturate: 100
		};
	this.resetFilter = function() {
		this.filter.contrast = 100;
		this.filter.brightness = 100;
		this.filter.saturate = 100;
	}
	this.initCanvas = function(canvas) {
		this.canvasObject = canvasScaler.scaleCanvas(canvas, 640, 1280);
	}
	this.getCanvas = function() {
		return this.canvasObject;
	}
	this.updateFile = function(files) {
		if(files.length > 0) {
			this.file = files[0];
			drawImage(this.canvasObject, this.file, this.filter);
		}
	}
	this.updateFilter = function() {
		drawImage(this.canvasObject, this.file, this.filter);
	}
	this.isLayerComplete = function() {
		return (!this.file || !this.canvasObject) ? false : true;
	}

	// Anonymous functions
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
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
	function drawImage(canvasObject, file, filter) {
		if(!file) {
			return;
		}
		convertToDataUrl(file).then(function(dataURL){
			var image = new Image();
			image.addEventListener("load", function () {
				var canvas = canvasObject.canvas;
		        var ctx = canvas.getContext("2d");
		        var screenType = canvasObject.screenType;
		        clearCanvas(canvas, ctx);
		        if(filter) {
		        	ctx.filter =
		        		"brightness("+filter.brightness+"%) "+
	                    "contrast("+filter.contrast+"%) "+
	                    "saturate("+filter.saturate+"%)";
		        }
		        ctx.drawImage(image, 0,0, canvas.width, canvas.height, 0, 0, canvas.width/screenType, canvas.height/screenType);
		    });
		    image.setAttribute("src", dataURL);
		})
	}
}])