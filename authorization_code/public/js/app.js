angular
.module("music-id", [
  "ui.router",
  "ngResource"
])
.config([
  "$stateProvider",
  Router
])
.controller("LogIn", [
  "$scope",
  "$http",
  LogInControllerFunction
])

function Router($stateProvider) {
  $stateProvider
  .state("index", {
    url: "/",
    templateUrl: "js/ng-views/index.html",
    controller: "IndexController",
    controllerAs: "vm"
  })
}

function LogInControllerFunction($scope, $http) {
  
}
