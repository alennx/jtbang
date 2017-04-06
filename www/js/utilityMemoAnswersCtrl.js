angular.module('ionicApp.MemoAnswersCtrl', []).controller("MemoAnswersCtrl",['Memos','$scope','$state',
function (Memos,$scope,$state) {
    Memos.GetAnwsers_page().then(function(anwsers){
        $scope.anwsers = anwsers;
    });
    //跳转
    $scope.GoContent=function(id){
        localStorage.setItem(set_question_id,id);
        $state.go("tab.memo-content");
    };
}]);