(function($) {
    var UISpaceNavigation = {
		lastSearchKeyword : '',
        completeHTMLForEmptyField : null,
        moreSpaceVisible : false,
        init : function(uicomponentId, mySpaceRestUrl, noSpace, selectSpaceAction) {
            var me = this;
            me.mySpaceRestUrl = mySpaceRestUrl;
            me.selectSpaceAction = selectSpaceAction;
            me.noSpace=noSpace;
            var textField = $('#' + uicomponentId).find("input.searchText");
            textField.on('keyup', function() {
                me.onTextSearchChange(uicomponentId);
            });
        	me.completeHTMLForEmptyField = $('#' + uicomponentId).find('ul.spaceNavigation').html();
        	me.moreSpaceVisible = $('#' + uicomponentId).find(".moreSpace").is(":visible");
        },
        requestData : function(keyword, uicomponentId) {
            var me = this;

            $.ajax({
                async : true,
                url : me.mySpaceRestUrl + "?fields=id,url,displayName,avatarUrl&keyword=" + keyword,
                type : 'GET',
                data : '',
                success : function(data) {
                    me.render(data, uicomponentId);
                }
            });
        },
        render: function(dataList, uicomponentId) {
            var me = this;
            me.dataList = dataList;

            var spacesListREsult = $('#' + uicomponentId).find('ul.spaceNavigation');
            var spaces = dataList;
            var groupSpaces = '';
            for (i = 0; i < spaces.length; i++) {
                var spaceId = spaces[i].id;
                var spaceUrl = window.location.protocol + "//" + window.location.host + "/" + spaces[i].url;
                var name = spaces[i].displayName;
                var imageUrl=spaces[i].avatarUrl;
                if (imageUrl == null) {
                    imageUrl = "/eXoSkin/skin/images/system/SpaceAvtDefault.png";
                }
                var spaceDiv = "<li class='spaceItem'>"+"<a class='spaceIcon avatarMini'"
                    + "' href='" + spaceUrl + "' title='" + name + "'><img src='"+imageUrl+"'/>"
                    + name + "</a></li>";
                groupSpaces += spaceDiv;
            }
            if(groupSpaces != ''){
                spacesListREsult.html(groupSpaces);
            }else{
                spacesListREsult.html("<li class='noSpace'>" + me.noSpace + "</li>") ;
            }
        },
        onTextSearchChange: function(uicomponentId) {
            var me = this;
            clearTimeout(me.timeout);
            me.timeout = setTimeout(function(){
                var textSearch = $('#' + uicomponentId).find("input.searchText").val();
                if (textSearch != me.lastSearchKeyword) {
                    me.lastSearchKeyword = textSearch;
	                if (!textSearch || !textSearch.trim().length) {
	                	$('#' + uicomponentId).find('ul.spaceNavigation').html(me.completeHTMLForEmptyField);
	                	if (me.moreSpaceVisible) {
	                		$('#' + uicomponentId).find(".moreSpace").show();
	                	} else {
	                		$('#' + uicomponentId).find(".moreSpace").hide();
	                	}
	                } else {
	                    me.requestData(textSearch, uicomponentId);
	                    $('#' + uicomponentId).find(".moreSpace").hide();
	                }
                }
            }, 300);
        },
        ajaxRedirect: function (url) {
            if(self == top) {
                window.location.href = url;
            } else {
                //Iframe case
                window.parent.location.href = url;
            }
        }
    };

    return UISpaceNavigation;
})($);
