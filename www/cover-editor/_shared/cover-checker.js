angular.module('cover-checker', [])
.service('coverChecker', [function(){
	var registeredCanvases = [];
	function register(canvas) {
		registeredCanvases.push(canvas);
	}
	function checkCover() {
		var canvases = [];
		var isComplete;
		var uncompleteCanvases = [];
		var completeCanvases = [];
		for(i in registeredCanvases) {
			console.log(registeredCanvases[i].canvasObject.canvas);
			console.log('complete: ',registeredCanvases[i].isLayerComplete());
			if(!registeredCanvases[i].isLayerComplete()) {
				uncompleteCanvases.push(registeredCanvases[i].canvasObject.canvas);
			} else {
				completeCanvases.push(registeredCanvases[i].canvasObject.canvas)
			}
		}
		isComplete = uncompleteCanvases.length > 0 ? false : true;
		canvases = isComplete ? completeCanvases : uncompleteCanvases; 
		return {complete:isComplete, canvases: canvases};
	}
	return {
		register: register,
		checkCover: checkCover
	}
}])