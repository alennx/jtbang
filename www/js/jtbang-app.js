angular.module('ionicApp', ['ionic', 'ionicApp.controllers',  'ionicApp.services','ionicApp.MemosCtrl','ionicApp.MemoQuesCtrl','ionicApp.MemoDetailCtrl','ionicApp.MemoContentCtrl','ionicApp.MemoAnswersCtrl','ionicApp.MyCtrl','ionicApp.directives',])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {

        $stateProvider
        	//全局
        	.state('menu',{
        		url:"/menu",
        		templateUrl:"templates/menu.html",
                controller: 'MenuCtrl'
        	})
            // 切换+全局
            .state('menu.tab', {
                url: "/tab",
                views: {
		        'menuContent' :{
		          templateUrl: "templates/tabs.html"
		        }
		      }
            })
            //交通帮
            .state('menu.tab.memos',{
                url:'/memos',
                views:{
                    'tab-memos':{
                        templateUrl:'templates/utility-memos.html',
                        controller: 'MemosCtrl'
                    }
                }
            })
            //搜索
            .state('menu.tab.memo-srs', {
                url: '/memo-srs',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-srs.html',
                        controller:'MemosCtrl'
                    }
                }
            })
            //搜索结果查看
            .state('menu.tab.memo-srs-detail', {
                url: '/memo-srs-detail/:searchId',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-srs-detail.html',
                        controller:'MemosCtrl'
                    }
                }
            })
            //显示信息
            .state('menu.tab.memo-content', {
                url: '/memo-content/:memoId',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-content.html',
                        controller: 'MemoContentCtrl'
                    }
                }
            })
            //发布信息
            .state('menu.tab.memo-detail', {
                url: '/memo-detail',
                views: {
                    'tab-memos': {
                        templateUrl: 'templates/utility-memo-detail.html',
                        controller: 'MemoDetailCtrl'
                    }
                }
            })
            //个人中心
            .state('menu.tab.my', {
                url: '/my',
                views: {
                    'tab-my': {
                        templateUrl: 'templates/my.html',
                        controller: 'MyCtrl'
                    }
                }
            })

            //我的问题utility-memo-answers.html
            .state('menu.tab.memo-ques', {
                url: '/memo-ques',
                views: {
                    'tab-my': {
                        templateUrl: 'templates/utility-memo-ques.html',
                        controller:'MemoQuesCtrl'
                    }
                }
            })
            //我的回答
            .state('menu.tab.memo-answers', {
                url: '/memo-answers',
                views: {
                    'tab-my': {
                        templateUrl: 'templates/utility-memo-answers.html',
                        controller:'MemoAnswersCtrl'
                    }
                }
            })
          ;
        $locationProvider.html5Mode(true);
        // 所有的返回值
        $urlRouterProvider.otherwise('/menu/tab/memos');

    });

	