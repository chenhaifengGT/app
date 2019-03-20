function maObject(){
	
}

maObject.openHtml = function(pageId,htmlPath,param){
	for(var key in param){
		var value = param[key];
		if(isJson(value)){
			value = JSON.stringify(value);
		}
		localStorage.setItem(pageId + "_" + key,value);
	}
	top.location.href=htmlPath; 
	//window.open(htmlPath);
}


maObject.getPageParam = function(pageId,key){
	var value = localStorage.getItem(pageId + "_" + key);
	if(isJson_string(value)){
		value = JSON.parse(value);
	}
	return value;
}
maObject.setPageParam = function(pageId,param){
	for(var key in param){
		localStorage.setItem(pageId + "_" + key,param[key]);
	}
	
}

maObject.closeCurrentHtml = function(){
	window.history.back(-1);
}

maObject.post = function(url,data,callBackFunc,errorCallBackFunc){
	UM.showLoadingBar({
		    text: "正在发送数据..",
		    icons: 'ti-loading',
		});
	$.ajax({  
        type : "POST",  //提交方式  
        url : url,//路径  
        data : data,//数据，这里使用的是Json格式进行传输  
        dataType : "JSON",
        timeout : 8000,
        success : function(result) {//返回数据根据结果进行相应的处理  
        	UM.hideLoadingBar();
            callBackFunc(result);
           
        },
        error : function(result){
        	UM.hideLoadingBar();
        	if(errorCallBackFunc != null){
        		errorCallBackFunc(result);
        	}
        	
        	UM.alert({
		        "title" : "失败信息",
		        "text" : JSON.stringify(result),
		        "btnText" : ["","确定"],
		        "overlay" : true,
		        "ok" :function(){
		         }
		    });
        } 
    })
}

function isJson(obj){

	if(typeof(obj) == "object" && 
		Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && 
		!obj.length){
		return true;
	}else{
		return false;
	}
}

function isJson_string(str){
	if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }

        } catch(e) {
            return false;
        }
    }
}


