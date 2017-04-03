angular.module('CoverChecker', [])
.service('coverChecker', function(){
	var registeredCanvases = [];
	this.register = function(canvas) {
		registeredCanvases.push(canvas);
	}
	// Checks all registered canvases,
	// returns isComplete + complete/incomplete canvases
	this.checkCover = function() {
		var canvases = [];
		var isComplete;
		var incompleteCanvases = [];
		var completeCanvases = [];
		for(i in registeredCanvases) {
			if(!registeredCanvases[i].isLayerComplete()) {
				incompleteCanvases.push(registeredCanvases[i].canvasObject.canvas);
			} else {
				completeCanvases.push(registeredCanvases[i].canvasObject.canvas)
			}
		}
		isComplete = incompleteCanvases.length > 0 ? false : true;
		canvases = isComplete ? completeCanvases : incompleteCanvases;
		return {complete:isComplete, canvases: canvases};
	}
})