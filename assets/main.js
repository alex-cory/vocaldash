



angular.module('main', [])

.controller('userInput', function($scope, $http){
  $scope.active = false;
  $scope.outs = [];
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
      $scope.input = res.msg_body;
      switch(intent){
        case "twitter":
          getTweets();
          break;
        case "greeting":
          var rand = parseInt((Math.random() * 100) % 3, 10);
          if(rand == 0)
            $scope.outs.unshift({'type':'greeting', 'data': 'Hello ... Jerk'});
          else if(rand == 1)
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh ... You again'});
          else
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh, I didn\'t see you there ... you know with the whole not having eyes and what not'});
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
      var tweets = data.statuses;
      console.log($scope.outs);
      $scope.outs.unshift({'type': 'twitter', 'data': tweets});

    });
  };
  var executeCommand = function(input){
    $scope.active = true;
    $http.jsonp("http://api.wit.ai/message?q="+encodeURIComponent(input)+"&access_token=4ZC7OUMQCOEXHNK6GCE7VNTTI52XPDDF&callback=JSON_CALLBACK")
    .success(function(data){
      console.log(data.outcome);
      var intent = data.outcome.intent;
      var entities = data.outcome.entities;
      var res = data.outcome;

      if(intent != "errorWit did not recognize intent" && data.outcome.confidence > .5){
      $scope.active = true;
      $scope.input = data.msg_body;
      switch(intent){
        case "twitter":
          getTweets();
          break;
        case "greeting":
          var rand = parseInt((Math.random() * 100) % 3, 10);

          if(rand == 0)
            $scope.outs.unshift({'type':'greeting', 'data': 'Hello ... Jerk'});
          else if(rand == 1)
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh ... You again'});
          else
            $scope.outs.unshift({'type':'greeting', 'data': 'Oh, I didn\'t see you there ... you know with the whole not having eyes and what not'});
          break;
      }
      $scope.$apply();
    }

    }).error(function(data){

    });
  };

  $scope.micAction = function(){
    console.log("test");
    if(!$scope.micRunning)
      mic.start();
    else
      mic.stop();
  };

})
