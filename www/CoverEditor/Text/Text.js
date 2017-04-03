angular.module('Text', [
  'TextService',
  'CoverChecker'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('text', {
    url: '/text'
  })
}])
.directive('textEditor', ['coverChecker', 'textService', function(coverChecker, textService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Text/Text.html',
    controller: 'textCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attr, ctrl) {
      textService.initCanvas(elem[0].querySelector('canvas#text-canvas'));
      coverChecker.register({canvasObject:textService.canvasObject, isLayerComplete: function(){return textService.isLayerComplete()}});
    }
  }
}])
.controller('textCtrl', ['$scope', 'textService', function($scope, textService){
  var tc = this;
  tc.text_string = textService.text_string;
  tc.text_color = textService.text_color;
  $scope.$watch(function(){
    return tc.text_string
  },function(text_string){
    textService.updateTextString(tc.text_string);
  });
  $scope.$watch(function(){
    return tc.text_color
  }, function(text_color){
    textService.updateTextColor(tc.text_color);
  })
}]);