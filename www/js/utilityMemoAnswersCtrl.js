angular.module('ionicApp.MemoAnswersCtrl', []).controller("MemoAnswersCtrl",['Memos','$scope',
function (Memos,$scope) {
    Memos.GetAnwsers_page().then(function(anwsers){
        $scope.anwsers = anwsers;
    });
    }]);