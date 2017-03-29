angular.module('file-upload', [])
.directive('fileUpload', function($q, canvasService){
	return {
	    restrict: 'A',
	    replace: true,
	    link: function(scope, elem, attr, ctrl) {
	    	console.log(attr)
	    	elem.on('change', function(e){
	    		// scope.$apply(function(){
	    			attr.file = e.target.files[0];	
	    		// })
	    		console.log(attr)
	    	})
	   //  	function convertToDataUrl(file) {
	   //  		var defer = $q.defer();
	   //  		var reader  = new FileReader();
	   //  		reader.addEventListener("load", function () {
				// 	if(reader.result) {
				// 		defer.resolve(reader.result)
				// 	} else {
				// 		defer.reject(undefined)
				// 	}
				// }, false);

				// if (file) {
				// 	reader.readAsDataURL(file);
				// } else {
				// 	defer.reject(undefined)
				// }
				// return defer.promise;
	   //  	}
	    }
	}
})