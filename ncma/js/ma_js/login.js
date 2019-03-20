var usercode = null;
var password = null;
summerready = function(){
	if(self!=top){
		top.location=self.location; 
		return;
	}
	usercode = localStorage.getItem("usercode");
	password = localStorage.getItem("password");
	if(checkVar(usercode)){
		$("#usercode").val(usercode);
		if(checkVar(password)){
			$("#password").val(password);
			doLogin();
		}
	}
}

function checkInfo(){
	reload()
	usercode = localStorage.getItem("usercode");
	password = localStorage.getItem("password");
	if(!checkVar(ip)){
		alert("请先点击右上角的设置,进行服务器信息配置")
		return false;
	}
	if(!checkVar(port)){
		alert("请先点击右上角的设置,进行服务器信息配置")
		return false;
	}
	if(!checkVar(usercode) || !checkVar(password)){
		alert("请填写用户和密码");
		return false;
	}else{
		return true;
	}
}
function loginCallBack(json){
	alert(JSON.stringify(json));
	alert(json.state);
	if(json.state == 1){
		localStorage.setItem("pk_log", json.data.pk_log); //pk_log
		localStorage.setItem("pk_corp", json.data.pk_corp); //pk_corp
		localStorage.setItem("userid", json.data.userId);
		localStorage.setItem("username", json.data.userName);
		maObject.openHtml("index","index.html",{});
	}else{
		UM.alert({
		        "title" : "登陆失败",
		        "text" : json.message,
		        "btnText" : ["","确定"],
		        "overlay" : true,
		        "ok" :function(){
		        	
		         }
		    });
	}
}
function doLogin(){
	
	localStorage.setItem("usercode", $("#usercode").val());
	localStorage.setItem("password", $("#password").val());
	var r = checkInfo();
	if(!r){
		return;
	}
	var params = {
		'userCode' : usercode, //获取用户名
		'password' : password, //获取密码
		'corpCode' : "0001"
	}
	
	maObject.post(url + "func=login",params,loginCallBack);
	
	
}
function checkVar(v){
	if(v == null || v == undefined || v == ""){
		return false;
	}else{
		return true;
	}
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

