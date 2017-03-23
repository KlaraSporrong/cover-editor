angular.module('canvas-file-upload', [])
.directive('canvasFileUpload', function($q, canvasService){
	return {
	    restrict: 'E',
	    template: '<input type="file">',
	    link: function(scope, elem, attr, ctrl) {
	    	elem.on('change', function(e){
	    		convertToDataUrl(e.target.files[0]).then(function(dataURL) {
	    			scope.dataURL = dataURL;
	    			if(!attr.canvasId) {
	    				return;
	    			}
	    			canvasService.drawImage(scope.canvases, attr.canvasId, scope.dataURL);
	    		})
	    	})
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

				if (file) {
					reader.readAsDataURL(file);
				} else {
					defer.reject(undefined)
				}
				return defer.promise;
	    	}
	    }
	}
})