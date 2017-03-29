angular.module('ionicApp.MyCtrl', [])
    .controller("MyCtrl",['$scope','Memos','$rootScope','$stateParams','$http','$ionicModal','$state','$ionicPopup',
function ($scope,Memos,$rootScope,$stateParams,$http, $ionicModal,$state,$ionicPopup) {
    //我的提问
    $scope.myques = function () {
        $state.go('tab.memo-ques', {});
    };
    //我的回答
    $scope.myanswers = function () {
        $state.go('tab.memo-answers', {});
    };
    }]);