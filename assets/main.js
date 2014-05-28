

angular.module('main', [])

.controller('userInput', function($scope, $http){
  $scope.active = false;
  $scope.microphoneUrl = 'microphone';
  //Microphone handler
  var mic = new Wit.Microphone($scope.microphone);
  $scope.micRunning = false;
  mic.onready = function(){
    console.log("ready")
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
    console.log("mic stopped");
    $scope.micRunning = false;
    $scope.microphoneUrl = "microphone";
  };
  mic.onresult = function (intent, entities) {

    $scope.active = true;
  };
  mic.connect("O5OAGEKON63WTIBJTHRD3SXOOTJEZWSV");
  //input field handler
  $scope.typeAction = function(event){
    if(event.keyCode != 13) return;
    executeCommand($scope.input);

  };
  var getTrendingTweets = function(){
    $http.jsonp("https://api.twitter.com/1.1/trends/place.json?callback=JSON_CALLBACK").error(function(data, status, headers, config) {
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
