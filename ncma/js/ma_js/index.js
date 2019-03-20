function openTab(type,titles){
    var header = $summer.byId('header');
    var headerPos = $summer.offset(header);    
    var footer = $summer.byId('footer');
    var footerPos = $summer.offset(footer); 
	
    var width = $summer.winWidth();//==320
    var height = $summer.winHeight()-footerPos.h-headerPos.h;//gct:计算frame的高  
    $('#h-title').html(titles);
    var html = type +'.html';
     document.getElementById("content").innerHTML = '<object type="text/html" data= "' +html+ '" width="100%" height="100%"></object>';
     
    
    maObject.setPageParam("main",{"name":type});
    /*
	summer.openFrame({
		id : type,
		name: type,
		url: 'html/'+ type +'.html',
		rect: {
			x: 0,
			y: headerPos.h,
			w: width,
			h: height
		},
		pageParam: {
	        name: type
	    }
	});
	*/
	      
}
summerready=function(){
	//openTab('dsp','待审批');
	var params = ["android.permission.READ_PHONE_STATE",
	"android.permission.ACCESS_FINE_LOCATION",
	"android.permission.READ_EXTERNAL_STORAGE",
	"android.permission.WRITE_EXTERNAL_STORAGE"];
	summer.getPermission(params,  function(args){
	
	}, function(args){
	    alert(args); //失败返回illegal access
	})
	var pk_log = localStorage.getItem("pk_log");
	var params = {
			'userid' : localStorage.getItem("userid"),
			'userCode':localStorage.getItem("usercode"),
			'pk_log':localStorage.getItem("pk_log")
	}
	maObject.post(url + "func=test",params,function(json){
		if(json.state != 1){
			goToLogin();
		}else{
			openTab('dsp','待审批');
		}
	})
	
	
}
function goToLogin(){
	maObject.openHtml("login","login.html",{});
	
}
function indexOpenWin(id,url,json){
	maObject.openHtml(id,url,json);
}

var turn = 0;
function keyBack(){
    turn++;
    if(turn==2){
        clearInterval(intervalID); 
        summer.exitApp()
    }else{
        summer.toast({"msg":"再点击一次退出!"});
    }
    var intervalID = setInterval(function() {
        clearInterval(intervalID);
        turn=0;
    }, 3000);
}

 
