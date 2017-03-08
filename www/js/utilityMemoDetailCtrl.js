angular.module('ionicApp.MemoDetailCtrl', []).controller('MemoDetailCtrl',['$rootScope','$scope', '$state', '$stateParams', 'Memos','$http',
function ($rootScope,$scope, $state, $stateParams, Memos,$http) {

        $scope.DelButtonShow = false;

        //获取信息详情
        var memoId = $stateParams.memoId;
        var memos = new Memos.allMemos();
        $scope.memo ={};
        $scope.memo.question_content='';
        $scope.memo.question_detail='';
        $scope.memo.placeholder = '交通帮发布标准为：仅限于发布有关交通、违章、汽车行业方面的话题，发布内容请严格遵守国家相关法律法规';
        //发布信息
        $scope.saveMemo = function () {
            Memos.Detail_request(
                $scope.memo.question_content.toUpperCase(),
                $scope.memo.question_detail.toUpperCase()
            );
            Memos.newMemo();
            Memos.save(memos);
        }

    }]);