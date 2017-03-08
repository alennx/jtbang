angular.module('ionicApp.MemoQuesCtrl', []).controller("MemoQuesCtrl",['Memos','$scope','$state','$http',
function (Memos,$scope,$state,$http) {
    Memos.GetQues_page().then(function(ques){
        $scope.ques = ques;
    });
    }]);