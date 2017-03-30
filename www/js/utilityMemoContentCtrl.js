angular.module('ionicApp.MemoContentCtrl', [])
    .controller('MemoContentCtrl',['$scope', '$state','$rootScope','$stateParams', 'Memos','$q','$ionicLoading','$timeout','$http','$ionicPopup',
        function ($scope, $state,$rootScope, $stateParams, Memos,$q,$ionicLoading,$timeout,$http,$ionicPopup) {
            $scope.DelButtonShow = false;
            //获取问题和回复
            GetPer_detail();
            function GetPer_detail(){
                $rootScope.Loadingshow();
                Memos.GetPer_detail().then(function(questions){
                    $scope.questions = questions;
                    $scope.answers = [];
                    $scope.$emit("loading:hide");
                    var a = /href=['"](.*?)['"]/g;
                    for(var m =1;m<questions.answers.length;m++){
                        if(questions.answers[m]!=null)
                            questions.answers[m].answer_content = questions.answers[m].answer_content.replace(a, 'ng-click="loadUrl(\'$1\',\'内容详情\')" style="color:#0000ff;"');
                    }
                    $scope.answers = questions.answers;
                });
                $rootScope.Loadinghide();
            }
            $scope.loadUrl = function(url,title){
                console.log("内容详情");
            };
            var memos = Memos.allMemos();
            if(memos.question_detail == null){
                memos.question_detail == memos.question_content;
            }else{
                return;
            }
            //跳转
            $scope.onlogin = function(){
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $rootScope.isLogined=false;
                $rootScope.user=null;
                $rootScope.$broadcast("stopMsgLoop");
                $state.go('login');
            }
            //回复（哈希）
            function getreply(){
                var defer=$q.defer();
                var reply_gethaxi = {};
                var url_getreply_haxi = "http://www.jtbang.cn/question/ajax/gethash/";
                $http.get(url_getreply_haxi,{cache: false}).then(function(response){
                    reply_gethaxi = response.data;
                    $rootScope.reply_haxi = JSON.stringify(reply_gethaxi);
                    defer.resolve();
                });
                return defer.promise;
            }
            //保存新的回复
            function newreply(){
                var url_newreply = "http://www.jtbang.cn/question/ajax/save_answer/";
                var question_id = localStorage.getItem(set_question_id);
                var str_reply = window.sessionStorage.str_reply;
                var reply_content = angular.fromJson(str_reply);
                var content = reply_content.content;
                var reply_gethaxi = angular.fromJson($rootScope.reply_haxi);
                var posthash = reply_gethaxi.posthash;
                var atckey = reply_gethaxi.atckey;
                var defer=$q.defer();
                var data = {'question_id':question_id,'post_hash':posthash,'attach_access_key':atckey,'answer_content':content,'_post_type':'ajax'};
                $http({
                    method:"POST",
                    url:url_newreply+"?now="+ new Date().getTime(),
                    data:data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                    transformRequest: function(obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    }
                }).success(function(response){
                    defer.resolve();
                    if(response.errno == 1) {
                        //诸葛io统计
                        zhuge.track('APP-交通帮回答问题', {'内容': content});
                        $rootScope.Loadinghide();
                        $ionicPopup.show({
                            title: "发布问题成功",
                            buttons: [
                                {
                                    text: "<b>确认</b>",
                                    type: "button-positive"
                                }
                            ]
                        });
                    }else{
                        $rootScope.Loadinghide();
                        $ionicPopup.alert({
                            title: "回答内容失败，请重试"
                        })
                    }
                }).error(function(){
                    $rootScope.Loadinghide();
                    $ionicPopup.alert({
                        title: "网络出错，请重试"
                    })
                });
                return defer.promise;
            }
            //回复内容
            $scope.replyData = {};
            $scope.replyData.content = "";
            $scope.saveReply = function () {
                $rootScope.Loadingshow();
                if($scope.replyData.content.length==0){
                    $rootScope.Loadinghide();
                    $ionicPopup.alert({
                        title:'回答不能为空'
                    });
                }
                else{
                    Memos.Reply_request(
                        $scope.replyData.content.toUpperCase()
                    );
                    getreply().then(function(){
                        return newreply();
                    }).then(function(){
                        return GetPer_detail();
                    });
                    $scope.replyData.content = "";
                }
            }
        }]);