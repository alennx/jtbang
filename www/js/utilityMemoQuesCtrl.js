angular.module('ionicApp.MemoQuesCtrl', []).controller("MemoQuesCtrl",['Memos','$scope','$state','$http',
function (Memos,$scope,$state,$http) {
    Memos.GetQues_page().then(function(ques){
        $scope.ques = ques;
    });
    //跳转
    $scope.GoContent=function(id){
        localStorage.setItem(set_question_id,id);
        $state.go("tab.memo-content");
    };
}]);