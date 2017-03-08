angular.module('ionicApp.directives', [])
    .directive('hideTabs',function($rootScope){

        return {

            restrict:'AE',

            link:function($scope){

                $rootScope.hideTabs = 'tabs-item-hide';

                $scope.$on('$destroy',function(){

                    $rootScope.hideTabs = ' ';

                })

            }

        }

    })

.directive('bindUnsafeHtml', ['$compile', function($compile){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {enhtml:"@bindUnsafeHtml"}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '<span ng-bind-html="scehtml"></span>',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            $scope.$watch(function($scope){
                return $scope.$eval(iAttrs.bindUnsafeHtml);
            },function(value){
                iElm.html(value);
                $compile(iElm.contents())($scope);
            });
        }
    };
}]);