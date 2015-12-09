"use strict";angular.module("favLangApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","blockUI"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"FavLangCtrl",controllerAs:"favLangController"})}]),angular.module("favLangApp").controller("FavLangCtrl",["FavLangService","blockUI",function(a,b){var c=this;c.getFavouriteLanguages=function(){c.showResult=!1,b.start(),a.getLanguages(c.username).then(function(a){b.stop(),c.showResult=!0,a.errorMessage?(c.showError=!0,c.showSuccess=!1,c.message=a.errorMessage):(c.showSuccess=!0,c.showError=!1,c.message=a.languages.join(","))},function(a){b.stop(),c.showResult=!0,c.showError=!0,c.showSuccess=!1,c.message="Server error Occurred"})}}]),angular.module("favLangApp").service("FavLangService",["$q","$http",function(a,b){this.getLanguages=function(c){var d=a.defer(),e={method:"GET",url:"/rest/favouriteLanguage/"+c};return b(e).success(function(a){d.resolve(a)}).error(function(a){d.reject({error:a})}),d.promise}}]),angular.module("favLangApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="page-header"><h1>Favourite Language <small>computed based on github repos</small></h1></div> <form role="form"> <div class="form-group"> <input type="text" ng-model="favLangController.username" placeholder="Github username eg:pradeepmurugesan" class="form-control" id="username"> </div> <div ng-show="favLangController.showResult" class="alert" ng-class="{\'alert-success\': favLangController.showSuccess,\'alert-danger\' : favLangController.showError }"> <span ng-show="favLangController.showSuccess">Favourite Language(s): </span>{{favLangController.message}} </div> <button type="submit" ng-click="favLangController.getFavouriteLanguages()" class="btn btn-success"> Submit </button> </form>')}]);