angular.module('ionicApp', ['ionic', 'ionicApp.controllers','ionicApp.services','ionicApp.MemosCtrl','ionicApp.MemoQuesCtrl','ionicApp.MemoDetailCtrl','ionicApp.MemoContentCtrl','ionicApp.MemoAnswersCtrl','ionicApp.MyCtrl','ionicApp.directives',])
 .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
     $ionicConfigProvider.tabs.position('bottom');
     $ionicConfigProvider.tabs.style('standard');
     $ionicConfigProvider.navBar.alignTitle('center');
     $ionicConfigProvider.backButton.text('返回').icon('ion-ios-arrow-back');
     $stateProvider
            // 全局
            .state('tab', {
                url: "/tab",
                templateUrl: "templates/tabs.html"
            })
            //交通帮
            .state('tab.memos',{
                url:'/memos',
                views:{
                    'tab-memos':{
                        templateUrl:'templates/utility-memos.html',
                        controller: 'MemosCtrl'
                    }
                }
            })
            //搜索
            .state('tab.memo-srs', {
                url: '/memo-srs',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-srs.html',
                        controller:'MemosCtrl'
                    }
                }
            })
            //搜索结果查看
            .state('tab.memo-srs-detail', {
                url: '/memo-srs-detail/:searchId',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-srs-detail.html',
                        controller:'MemosCtrl'
                    }
                }
            })
            //显示信息
            .state('tab.memo-content', {
                url: '/memo-content/:memoId',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-content.html',
                        controller: 'MemoContentCtrl'
                    }
                }
            })
            //发布信息
            .state('tab.memo-detail', {
                url: '/memo-detail',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-detail.html',
                        controller: 'MemoDetailCtrl'
                    }
                }
            })
            //我的问题utility-memo-answers.html
            .state('tab.memo-ques', {
                url: '/memo-ques',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-ques.html',
                        controller:'MemoQuesCtrl'
                    }
                }
            })
            //我的回答
            .state('tab.memo-answers', {
                url: '/memo-answers',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-answers.html',
                        controller:'MemoAnswersCtrl'
                    }
                }
            })
          ;
        // 所有的返回值
        $urlRouterProvider.otherwise('/tab/memos');

    });

	