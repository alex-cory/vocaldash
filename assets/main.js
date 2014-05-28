

angular.module('main', [])

.controller('userInput', function($scope){
  $scope.active = false;
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
    console.log(intent);
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  //input field handler
  $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);

  };

  var executeCommand = function(input){
    $scope.active = true
    $scope.output = input;
  }

  $scope.micAction = function(){
    mic.start();
  };

})
