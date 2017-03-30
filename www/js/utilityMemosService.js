angular.module('ionicApp.services', [])
    .factory('Memos', function ($http,$state,$rootScope,$ionicPopup,$q,$ionicLoading) {
    var jtb_url = "http://www.jtbang.cn/explore/ajax/list/isapp-y__";
    var memos = {};
    var questions = {};
    var ques = {};
    var anwsers = {};
    var per_page = 10;
    var nextPage = 1;
    var gethaxi = {};
    var user = {};
    var register ={};
    $rootScope.Loadingshow=function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><p>正在加载....</p>' //替换默认动画
        });
    };
    $rootScope.Loadinghide=function(){$ionicLoading.hide()};
    var funcs= {
        //获取我的提问列表
        GetQues_page: function(){
            var ques_url = "http://www.jtbang.cn/people/ajax/user_actions/";
            var uid = window.sessionStorage.getItem(set_userid);
            return $http.get(ques_url+'uid-'+uid+'__actions-101__page-0__ajax-1').then(function(response){
                ques = response.data;
                $rootScope.ques = ques;
                var ques_str = JSON.stringify(ques);
                window.sessionStorage.ques_str1 = ques_str;
                return ques;
            });
        },
        //获取我的回答列表
        GetAnwsers_page: function(){
            var ques_url = "http://www.jtbang.cn/people/ajax/user_actions/";
            var uid = window.sessionStorage.getItem(set_userid);
            return $http.get(ques_url+'uid-'+uid+'__actions-201__page-0__ajax-1').then(function(response){
                anwsers = response.data;
                var anwsers_str = JSON.stringify(anwsers);
                window.sessionStorage.anwsers_str1 = anwsers_str;
                return anwsers;
            });
        },
        //交通帮登录
        GetJtbang_user:function(uid){
            function zeroFill(num){
                var str=num+"";
                while(str.length<8)
                    str="0"+str;
                return str;
            }
            var jtb_user_name = 'cxwy'+zeroFill(uid);
            var data={
                user_name:jtb_user_name,
                password:hex_md5(jtb_user_name).substr(8,16),
                email:zeroFill(uid)+'@okek.cn',
                agreement_chk:'agree'
            };
            console.log("第一次登陆参数：");
            console.log(data);
            var url_jtbang_register = "http://www.jtbang.cn/account/ajax/register_process/";
            var url_login = "http://www.jtbang.cn/account/ajax/login_process/";
            $http({
                method:"POST",
                url:url_login,
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
                console.log("第一次登陆返回：");
                console.log(response);
                user = response;
                if(user.errno == '1'){
                    var userid = user.rsm.user.userid;
                    //诸葛io统计
                    zhuge.track('APP-交通帮登录', {
                        '用户ID':uid || '',
                        '交通帮ID': userid});
                    window.sessionStorage.setItem(set_userid,userid);
                    $rootScope.jtbang_user = user;
                    $rootScope.isjtbanglogin = true;
                    return user;
                }else{
                    $http({
                        method:"POST",
                        url:url_jtbang_register,
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
                        console.log("第一次注册返回：");
                        console.log(response);
                        register = response;
                        if(response.errno == '1'){
                            $http({
                                method:"POST",
                                url:url_login,
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
                                user = response;
                                if(user.errno == '1'){
                                    $rootScope.jtbang_user = user;
                                    var userid = user.rsm.user.userid;
                                    //诸葛io统计
                                    zhuge.track('APP-交通帮登录', {
                                        '用户ID':uid || '',
                                        '交通帮ID': userid});
                                    window.sessionStorage.setItem(set_userid,userid);
                                    $rootScope.isjtbanglogin = true;
                                }
                            }).error(function () {
                                funcs.ieerror();
                            });
                        }else{
                            return;
                        }
                    }).error(function () {
                        funcs.ieerror();
                    });
                    return user;
                }
            }).error(function () {
                funcs.ieerror();
            });
        },
        //网络连接
        ieerror:function(){
            $ionicPopup.show({
                template: "",
                title: "网络连接错误，请重试",
                scope: $scope,
                buttons: [
                    {
                        text: "<b>确定</b>",
                        type: "button-positive",
                    }
                ]
            })
        },
        //交通帮退出
        OutJtbang_user:function(){
            var out_login = "http://www.jtbang.cn/account/logout/";
            $http.post(out_login).then(function(response){
                var out = response.data;
            });
        },
        //首页加载数据
        GetPer_page: function(){
            nextPage = 1;
        },
        //下拉刷新第一页
        GetDoRefresh_page: function(){
            var page = 1;
            return $http.get(jtb_url+'per_page-'+per_page+'__page-'+page+'__sort_type-new__ptype-question').then(function(response){
                memos = response.data;
                var str = JSON.stringify(memos);
                window.sessionStorage.str3 = str;
                nextPage = 2;
                return memos;
            });
        },
        //上拉加载更多
        GetPage: function(){
            var page = nextPage;
            nextPage++;
            return $http.get(jtb_url+'per_page-'+per_page+'__page-'+page+'__sort_type-new__ptype-question').then(function(response){
                memos = response.data;
                var str = JSON.stringify(memos);
                window.sessionStorage.str2 = str;
                return memos;
            });
        },
        allMemos: function () {
            var memosString = window.sessionStorage.str1;
            if (memosString) {
                var memos = angular.fromJson(memosString);
                return memos;
            }
            return [];
        },
        save: function (memos) {
            window.sessionStorage.str1 = angular.toJson(memos);
        },
        //查看问题详情
        GetPer_detail: function(){
            var id = window.localStorage.getItem(set_question_id);
            var GetPer_detail_url = 'http://www.jtbang.cn/question/';
            return $http.get(GetPer_detail_url+id+'?ajax=1&notmobile').then(function(response){
                questions = response.data;
                var str_questions = JSON.stringify(questions);
                window.sessionStorage.str_questions = str_questions;
                return questions;
            });
        },
        //搜索内容获取
        Search_request:function(jtb_search){
            var srs = {};
            if(jtb_search!=null)
                srs.jtb_search = jtb_search;
            var str_search = JSON.stringify(srs);
            window.sessionStorage.str_search = str_search;
        },
        //搜索请求
        getsearch:function(){
            var str_search = window.sessionStorage.str_search;
            var searchs = angular.fromJson(str_search);
            var q = searchs.jtb_search;
            var url_search = "http://www.jtbang.cn/search/ajax/search/?";
            $http.get(url_search+'q='+q+'&limit=10').then(function(response){
                searchs = response.data;
                var searchs_str = JSON.stringify(searchs);
                window.sessionStorage.searchs_str = searchs_str;
                return searchs;
            });
        },
        //搜索结果
        GetSrs_page: function(){
            var url_srs = 'http://www.jtbang.cn/search/ajax/search_result/';
            var str_search = window.sessionStorage.str_search;
            var searchs = angular.fromJson(str_search);
            var q = searchs.jtb_search;
            var page = 1;
            return $http.get(url_srs+'search_type-questions'+'__q-'+q+'__page-'+page+'__ajax-1'+'__limit-10').then(function(response){
                searchs = response.data;
                var search = JSON.stringify(searchs);
                window.sessionStorage.search1 = search;
                return searchs;
            });
        },
        //搜索结果下拉加载更多
        GetSrsmore_page: function(){
            var url_srs = 'http://www.jtbang.cn/search/ajax/search_result/';
            var str_search = window.sessionStorage.str_search;
            var searchs = angular.fromJson(str_search);
            var q = searchs.jtb_search;
            var page = nextPage;
            nextPage++
            return $http.get(url_srs+'search_type-questions'+'__q-'+q+'__page-'+page+'__ajax-1'+'__limit-10').then(function(response){
                searchs = response.data;
                var search = JSON.stringify(searchs);
                window.sessionStorage.search2 = search;
                return searchs;
            });
        },
        //创建问题的标题和内容
        Detail_request:function(question_content,question_detail){
            var memo = {};
            if(question_content!=null)
                memo.question_content = question_content;
            if(question_detail!=null)
                memo.question_detail = question_detail;
            var str_detail = JSON.stringify(memo);
            window.sessionStorage.str_detail = str_detail;
        },
        //发布问题(获取哈希)
        getMemo:function(){
            var url_get = "http://www.jtbang.cn/question/ajax/gethash/";
            $http.get(url_get).then(function(response){
                gethaxi = response.data;
                haxi = JSON.stringify(gethaxi);
                window.sessionStorage.setItem(memo1,haxi);
                $state.go('tab.memo-detail', {});
            });
        },
        //发布问题
        newMemo: function () {
            //获取内容
            var str_detail = window.sessionStorage.str_detail;
            var detail = angular.fromJson(str_detail);
            var question_content = detail.question_content;
            var question_detail = detail.question_detail;
            //获取哈希
            var haxi = window.sessionStorage.getItem(memo1);
            var gethaxi = angular.fromJson(haxi);
            var posthash = gethaxi.posthash;
            var atckey = gethaxi.atckey;
            var url_new = "http://www.jtbang.cn/publish/ajax/publish_question/";
            var data = {'category_id':'2','post_hash':posthash,'attach_access_key':atckey,'question_content':question_content,'question_detail':question_detail,'_post_type':'ajax'};
            $http({
                method:"POST",
                url:url_new,
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
                if(response.errno == 1){
                    //诸葛io统计
                    zhuge.track('APP-交通帮发布问题', {
                        '标题':question_detail || '',
                        '内容': question_content});
                    $ionicPopup.show({
                        title: "发布问题成功",
                        buttons: [
                            {
                                text: "<b>确认</b>",
                                type: "button-positive"
                            }
                        ]
                    });
                    $state.go('tab.memos',{reload: true});
                }else{
                    $ionicPopup.alert({
                        title: "输入内容错误，请重试"
                    })
                }
            }).error(function(){
                $ionicPopup.alert({
                    title: "获取信息失败，请重试"
                })
            });
            return {
                question_id: '',
                question_content: '',
                question_detail: '',
                user_info:{
                    user_name:''
                }
            };
        },
        //回复内容
        Reply_request:function(content){
            var replyData = {};
            if(content!=null)
                replyData.content = content;
            var str_reply = JSON.stringify(replyData);
            window.sessionStorage.str_reply = str_reply;
        },
        //标记已读
        Read_notification:function(notificationId){
            var url_notification = "http://www.jtbang.cn/notifications/ajax/read_notification/notification_id-";
            $http.get(url_notification+notificationId);
        }
    };
    return funcs;
})

