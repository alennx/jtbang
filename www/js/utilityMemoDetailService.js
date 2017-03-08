angular.module('ionicApp.controllers', []).factory('Mockservice', function () {
	var mock_data = [{"title":"测试1"},{"title":"测试2"},{"title":"测试3"}];
	this.getTitle = function(callback){
		callback(mock_data);
	};
	var mock = new Mockservice;
	mock.getTitle(function(){
		status.go('tab.memos');
	})
})