angular.module('CoverChecker', [])
.service('coverChecker', function(){
	var registeredCanvases = [];
	this.register = function(canvas) {
		registeredCanvases.push(canvas);
	}
	// Checks all registered canvases,
	// returns isComplete + complete canvases/null
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
		if(incompleteCanvases.length > 0) {
			isComplete = false;
			alertIncompleteCanvases(incompleteCanvases)
		} else {
			isComplete = true;
		}
		canvases = isComplete ? completeCanvases : null;
		return {complete:isComplete, canvases:canvases};
	}
	function alertIncompleteCanvases(canvases) {
		var canvasNames = [];
		for(i in canvases) {
			canvasNames.push(angular.element(canvases[i]).attr('name'));
		}
		alert('['+canvasNames.toString().replace(',', ', ')+'] not complete!')
	}
})