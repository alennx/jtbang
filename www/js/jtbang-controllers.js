angular.module('ionicApp.controllers', [])

/* 向导页面 */
/*.controller('WizardCtrl', function($scope, $state, $ionicViewService) {

  window.localStorage['didWizard'] = false;// 本地存储单位

  var startApp = function() {
    $ionicViewService.clearHistory();
    // 默认进入首页交通帮列表
    $state.go('menu.tab.things', {groupId: -3});
    window.localStorage['didWizard'] = true;
  };

  if(window.localStorage['didWizard'] === "true") {
    console.log('Skip intro');
    // 向导页面只显示一次
    startApp();
  } else {
    setTimeout(function () {
      navigator.splashscreen.hide();
    }, 750);
  }

  // "立即体验"按钮Event跳转进入交通帮列表
  $scope.gotoMain = function() {
    startApp();
  }

  $scope.slideHasChanged = function(index) {
  };
})*/

/*左侧信息栏*/
.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate) {
   $scope.toggle = function(){
		$ionicSideMenuDelegate.toggleLeft();
	};
 })

