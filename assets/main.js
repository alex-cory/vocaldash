



angular.module('main', [])

.controller('userInput', function($scope, $http){
  $scope.active = false;
  $scope.microphoneUrl = 'microphone';
  //Microphone handler
  var mic = new Wit.Microphone($scope.microphone);
  $scope.micRunning = false;
  mic.onready = function(){
//    console.log("ready")
  };

  mic.onerror = function(err){
    console.log("error" + err)
  };
  mic.onaudiostart = function () {
    console.log("mic started");
    $scope.micRunning = true;
    $scope.microphoneUrl = "none";
  };
  mic.onaudioend = function () {
//    console.log("mic stopped");
    $scope.micRunning = false;
    $scope.microphoneUrl = "microphone";
  };
  mic.onresult = function (intent, entities, res) {
//    console.log(intent);
    if(intent != "errorWit did not recognize intent" && res.outcome.confidence > .5){
      $scope.active = true;
      console.log();
      $scope.input = res.msg_body;
      switch(intent){
        case "twitter":
          getTweets();
          break;
      }
      $scope.$apply();
    }
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
    $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);
  };
  var getTweets = function(){
    $http.get("/twittertest.json").success(function(data){
      $scope.tweets = data.statuses;
//      console.log(data);
    });
  };
  var executeCommand = function(input){
    $scope.active = true;
    getTweets();
  };

  $scope.micAction = function(){
    console.log("test");
    if(!$scope.micRunning)
      mic.start();
    else
      mic.stop();
  };

})
