



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
//    console.log("error" + err)
  };
  mic.onaudiostart = function () {
//    console.log("mic started");
    $scope.micRunning = true;
    $scope.microphoneUrl = "none";
  };
  mic.onaudioend = function () {
//    console.log("mic stopped");
    $scope.micRunning = false;
    $scope.microphoneUrl = "microphone";
  };
  mic.onresult = function (intent, entities) {
//    console.log(intent);
    if(intent != "errorWit did not recognize intent"){
      $scope.active = true;
      $scope.input = intent;
      switch(intent){
        case "twitter":
          $scope.output = "Here are twitter results!";
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
  var getTrendingTweets = function(){
    $http.jsonp("https://api.twitter.com/1.1/trends/place.json?callback=JSON_CALLBACK").success(function(data) {
      console.log("data = " + data);
    });
  };
  var executeCommand = function(input){
    $scope.active = true;
    getTrendingTweets();
  };

  $scope.micAction = function(){
    if(!$scope.micRunning)
      mic.start();
    else
      mic.stop();
  };

})
