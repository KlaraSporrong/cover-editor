angular.module('canvas-service',[])
.service('canvasService', function($q){
	function createCanvas(rootElement, id, height, width) {
		var defer = $q.defer();
		var canvas = document.createElement('canvas');
		canvas.setAttribute('height', height);
		canvas.setAttribute('width', width);
		canvas.setAttribute('id', id);
		if(rootElement) {
			rootElement.append(canvas)
		}
		scaleCanvas(canvas).then(function(canvasObject){
			if(rootElement && rootElement.find('canvas') && canvasObject.screenType) {
				console.log('canvas found')
				defer.resolve(canvasObject);
			} else if(!rootElement && canvasObject){
				defer.resolve(canvasObject)
			} else {
				defer.reject(undefined)
			}
		});
		return defer.promise;
	}
	function drawImage(canvases, canvas_id, dataURL, opt) {
		var image = new Image();
		image.addEventListener("load", function () {
			var canvasObject = getCanvas(canvases, canvas_id)
			var canvas = canvasObject[0].canvas;
	        var ctx = canvas.getContext("2d");
	        var viewWidth = parseInt(canvas.style.width);
	        var viewHeight = parseInt(canvas.style.height);
	        clearCanvas(canvas, ctx)
	        if(opt && opt.filter) {
	        	ctx.filter =
	        		"brightness("+opt.filter.brightness+"%) "+
                    "contrast("+opt.filter.contrast+"%) "+
                    "saturate("+opt.filter.saturate+"%)";
	        }
	        ctx.drawImage(image, 0,0, viewWidth*2, viewHeight*2, 0, 0, viewWidth, viewHeight);
	    });
	    image.setAttribute("src", dataURL);
	}
	function drawText(canvases, canvas_id, text_string, text_color) {
		var canvasObject = getCanvas(canvases, canvas_id);
		var canvas = canvasObject[0].canvas;
		var ctx = canvas.getContext("2d");
		var viewWidth = parseInt(canvas.style.width);
	    var viewHeight = parseInt(canvas.style.height);
		clearCanvas(canvas, ctx)
		ctx.font = "600 50px Helvetica Neue";
		ctx.fillStyle = text_color;
		ctx.textAlign = "center";
		ctx.fillText(text_string, viewWidth/2, viewHeight/2);
	}

	function mergeLayers(canvases) {
		if(!canvases) {
			return;
		}
		var canvasWidth = parseInt(canvases[0].canvas.style.width);
		var canvasHeight = parseInt(canvases[0].canvas.style.height);
		createCanvas(null, 'cover', canvasHeight, canvasWidth).then(function(canvasObject){
			var coverCanvas = canvasObject.canvas;
			var coverCtx = coverCanvas.getContext('2d');
			var viewWidth = parseInt(coverCanvas.style.width);
	        var viewHeight = parseInt(coverCanvas.style.height);
			for(var i = 0; i < canvases.length; i++) {
				var canvas = canvases[i].canvas;
				coverCtx.drawImage(canvas, 0,0, viewWidth*2, viewHeight*2, 0, 0, viewWidth, viewHeight);
			}
			var dataURL = coverCanvas.toDataURL("image/jpeg");
			var link = document.createElement('a');
			link.download = "cover.jpeg";
			link.href = coverCanvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
			link.click();
			clearCanvas(coverCanvas, coverCtx);
			coverCanvas = null;
		})
	}

	// Anonymous functions
	function scaleCanvas(canvas) {
		var defer = $q.defer();
		var ctx = canvas.getContext('2d');
		var screenType = null;
		resultObject = {};
		if (canvasDpiScaler) {
            screenType = canvasDpiScaler(canvas, ctx);
            console.log(screenType)
        }
        if(CanvasRenderingContext2D) {
            CanvasRenderingContext2D.mozImageSmoothingEnabled = true;
            CanvasRenderingContext2D.webkitImageSmoothingEnabled = true;
            CanvasRenderingContext2D.msImageSmoothingEnabled = true;
            CanvasRenderingContext2D.imageSmoothingEnabled = true;
        }
        if(screenType && canvas) {
        	resultObject = {canvas: canvas, screenType:screenType};
        	defer.resolve(resultObject)
        } else {
        	defer.reject(undefined);
        }
        return defer.promise;
	}
	function getCanvas(canvases, canvas_id) {
		return canvases.filter(function (element) {
		    return element.canvas.id === canvas_id;
		});
	}
	function clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
    	createCanvas: createCanvas,
    	drawImage: drawImage,
    	drawText: drawText,
    	mergeLayers: mergeLayers
    }
})