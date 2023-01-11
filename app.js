(function () {
    'use strict';

    angular.module('myApp', ["ngRoute"])

        .controller('MyController', function ($scope, $http) {
            $http.get('http://localhost:3022/').then(function (response) {
                $scope.list = response.data
            })
        })

        .controller('createController', function ($scope) {
            $scope.createEntry = function () {
                var newData = "{\"emp_id\":\"" + $scope.emp_id + "\", \"emp_name\":\"" + $scope.emp_name + "\", \"emp_designation\":\"" + $scope.emp_designation + "\", \"emp_department\":\"" + $scope.emp_department + "\", \"emp_Salary\":\"" + $scope.emp_Salary + "\", \"emp_location\":\"" + $scope.emp_location + "\"}";

                fetch('http://localhost:3022/new', {
                    method: "POST",
                    body: newData,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.emp_id=""
                $scope.emp_name=""
                $scope.emp_designation=""
                $scope.emp_department=""
                $scope.emp_Salary=""
                $scope.emp_location=""
            };
        })

        .controller('updateController', function ($scope, $http) {
            $http.get('http://localhost:3022/').then(function (response) {
                $scope.list = response.data
            })

            $scope.getId = function () {
                var selectedId = $scope.emp_id
                console.log(selectedId)
                $scope.emp_name = selectedId['emp_name']
                $scope.emp_designation = selectedId['emp_designation']
                $scope.emp_department = selectedId['emp_department']
                $scope.emp_Salary = selectedId['emp_Salary']
                $scope.emp_location = selectedId['emp_location']
            }

            $scope.updateEntry = function () {
                var newData = "{\"id\":\"" + $scope.id['id'] + "\", \"name\":\"" + $scope.name + "\", \"email\":\"" + $scope.email + "\", \"item\":\"" + $scope.item + "\", \"amount\":\"" + $scope.amount + "\", \"status\":\"" + $scope.status + "\"}";

                fetch('http://localhost:3022/update', {
                    method: "POST",
                    body: newData,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => response.json()) 
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.emp_id=""
                $scope.emp_name=""
                $scope.emp_designation=""
                $scope.emp_department=""
                $scope.emp_Salary=""
                $scope.emp_location=""
            };
        })

        .controller('searchController', function ($scope, $rootScope) {
            $scope.getData = function () {
                var searchJson = { status: $scope.status }
                var jsonObj = JSON.stringify(searchJson)
                fetch('http://localhost:3022/search', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    $scope.datas = json
                })
                .catch(err => console.log(err))
            }
        })

        .controller('deleteController', function ($scope, $http) {
            $http.get('http://localhost:3022/').then(function (response) {
                $scope.datas = response.data
            })
            $scope.deleteEntry = function () {
                var delJson = { delID: $scope.del.id }
                var jsonObj = JSON.stringify(delJson)

                fetch('http://localhost:3022/delete', {
                    method: "POST",
                    body: jsonObj,
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
                $scope.del = ""
            }
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "view.html"
                })
                .when("/create", {
                    templateUrl: "create.html",
                    controller: "createController"
                })
                .when("/update", {
                    templateUrl: "update.html",
                    controller: "updateController"
                })
                .when("/search", {
                    templateUrl: "search.html",
                    controller: "searchController"
                })
                .when("/delete", {
                    templateUrl: "delete.html",
                    controller: "deleteController"
                });
        })
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }])
})();