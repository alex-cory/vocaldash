

angular.module('main', [])

.controller('userInput', function($scope){
  var mic = new Wit.Microphone($scope.microphone);
  var micRunning = false;
  mic.onaudiostart = function () {
    console.log("mic started");
    micRunning = true;
  };
  mic.onaudioend = function () {
    console.log("mic stopped");
    micRunning = false;
  };

  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  $scope.startMic = function(){
    if(!micRunning)
      mic.start();
    else
      mic.stop();
  };

})
