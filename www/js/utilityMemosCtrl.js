angular.module('ionicApp.MemosCtrl', [])
    .controller("MemosCtrl",['$scope','Memos','$rootScope','$stateParams','$http','$ionicModal','$state','$ionicPopup','$ionicScrollDelegate','$ionicPopover','$location',
        function ($scope,Memos,$rootScope,$stateParams,$http, $ionicModal,$state,$ionicPopup,$ionicScrollDelegate,$ionicPopover,$location) {
            $scope.memos = [];
            $scope.$on("$ionicView.beforeEnter",function(){
                $rootScope.isHideTabs=true;
            });
            $rootScope.isjtbanglogin=false;
            var uid = localStorage.getItem('uid');
            Memos.GetJtbang_user(uid);
            //首页加载
            Memos.GetPer_page();
            //上拉刷新
            $scope.doRefresh = function reload() {
                Memos.GetDoRefresh_page().then(function (memos) {
                    for (var i = 0; i < memos.length; i++) {
                        $scope.memos = memos;
                        memos[i].add_time = memos[i].add_time*1000;
                    }
                    if(memos != null || memos != undefined){
                        $scope.$broadcast('scroll.refreshComplete');
                    }else{
                        $ionicPopup.show({
                            title: "数据加载失败，请检查网络重试",
                            scope: $scope,
                            buttons: [
                                {
                                    text: "<b>确定</b>",
                                    type: "button-positive"
                                }
                            ]
                        });
                    }
                });
            };
            //加载更多
            $scope.loadMore = function() {
                Memos.GetPage().then(function(memos){
                    for(var i=0;i<memos.length;i++){
                        $scope.memos.push(memos[i]);
                        memos[i].add_time = memos[i].add_time*1000;
                    }
                    if(memos != null || memos != undefined){
                        $scope.$broadcast('scroll.refreshComplete');
                    }else{
                        $ionicPopup.show({
                            title: "数据加载失败，请检查网络重试",
                            scope: $scope,
                            buttons: [
                                {
                                    text: "<b>确定</b>",
                                    type: "button-positive"
                                }
                            ]
                        });
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };
            //返回顶部
            $scope.lgr_refresh = function(){
                var defer=$q.defer();
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
                $scope.doRefresh();
                return defer.promise;
            };
            //跳转
            $scope.GoContent=function(id){
                localStorage.setItem(set_question_id,id);
                $state.go("tab.memo-content");
            };
            //搜索值获取
            $scope.srs = {};
            $scope.srs.jtb_search = '';
            $scope.jtb_search_commit = function(){
                if($scope.srs.jtb_search.length == 0){
                    $ionicPopup.show({
                        template: "",
                        title: "搜索内容不能为空",
                        scope: $scope,
                        buttons: [
                            {
                                text: "<b>确定</b>",
                                type: "button-positive",
                            }
                        ]
                    })
                }else{
                    $state.go('tab.memo-srs', {});
                    Memos.Search_request(
                        $scope.srs.jtb_search.toUpperCase()
                    );
                    Memos.getsearch();
                    //搜索结果显示
                    Memos.GetSrs_page().then(function(searchs){
                        $scope.searchs = searchs;
                        if(searchs.detail == null){
                            searchs.detail == searchs.name;
                        }else{
                            return;
                        }
                    });
                }
            }
            //搜索内容加载更多
            $scope.searchs = [];
            $scope.SrsLoadMore = function() {
                Memos.GetSrsmore_page().then(function(searchs){
                    for(var i=0;i<searchs.length;i++){
                        $scope.searchs.push(searchs[i]);
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };
            //添加信息
            $scope.addMemo = function () {
                if($rootScope.isjtbanglogin){
                    Memos.getMemo();
                }else{
                    $ionicPopup.show({
                        title: "温馨提示",
                        template:"需要注册登录后才能发布问题",
                        scope: $scope,
                        buttons: [
                            { text: "取消" },
                            {
                                text: "<a class='bdhm'>注册</a>",
                                type: "button-positive",
                                onTap: function(e) {
                                    //返回登陆首页
                                    //安卓或者ios代码
                                }
                            }
                        ]
                    })
                }
            }
            //我的提问
            $scope.myques = function () {
                if($scope.popover!=null)
                    $scope.popover.hide();
                if($rootScope.isjtbanglogin){
                    $state.go('tab.memo-ques', {});
                }else{
                    $ionicPopup.show({
                        title: "温馨提示",
                        template:"需要注册登录后才能发布问题",
                        scope: $scope,
                        buttons: [
                            { text: "取消" },
                            {
                                text: "<a class='bdhm'>注册</a>",
                                type: "button-positive",
                                onTap: function(e) {
                                    //返回登陆首页
                                    //安卓或者ios代码
                                }
                            }
                        ]
                    })
                }
            };
            //我的回答
            $scope.myanswers = function () {
                if($scope.popover!=null)
                    $scope.popover.hide();
                if($rootScope.isjtbanglogin){
                    $state.go('tab.memo-answers', {});
                }else{
                    $ionicPopup.show({
                        title: "温馨提示",
                        template:"需要注册登录后才能发布问题",
                        scope: $scope,
                        buttons: [
                            { text: "取消" },
                            {
                                text: "<a class='bdhm'>注册</a>",
                                type: "button-positive",
                                onTap: function(e) {
                                    //返回登陆首页
                                    //安卓或者ios代码
                                }
                            }
                        ]
                    })
                }
            }
            // 弹出菜单
            $ionicPopover.fromTemplateUrl('templates/utility-memos-popover.html',{
                scope:$scope
            }).then(function(popover){
                $scope.popover=popover;
            });

        }]);
