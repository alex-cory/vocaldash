

angular.module('main', [])

.controller('userInput', function($scope){
  //Microphone handler
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
  mic.onresult = function (intent, entities) {
    executeCommand();
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  //input field handler
  $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);

  };

  var executeCommand = function(input){
    $scope.output = input;

  }



  $scope.startMic = function(){
    if(!micRunning)
      mic.start();
    else
      mic.stop();
  };

})
