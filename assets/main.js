

angular.module('main', [])

.controller('userInput', function($scope){
  var mic = new Wit.Microphone($scope.microphone);
  mic.onaudiostart = function () {
    console.log("micSTarted");
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  $scope.startMic = function(){
    mic.start();  

  };

})
