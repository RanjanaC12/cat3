var app=angular.module("app",[])

app.controller("myctrl",function($http,$scope){
    $http.get("cat3.json")
    .then(function(response){
        $scope.list =response.data;
    })
})