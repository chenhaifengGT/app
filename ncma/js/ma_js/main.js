var selected = null;
function dspClick(){
	selected = "queryDspBill";
	refreshData("queryDspBill");
	
}
function yspClick(){
	selected = "queryYspBill";
	refreshData("queryYspBill");
}
function ybhClick(){
	selected = "queryYbhBill";
	refreshData("queryYbhBill");
}
function refreshSelectedData(){
	refreshData(selected);
}
function successCallBack(responseJson){
	if(responseJson.state == 1){
   		changeData(responseJson.data);
   }else{
   		UM.alert({
        "title" : "失败信息",
        "text" : responseJson.message,
        "btnText" : ["","确定"],
        "overlay" : true,
        "cancle" :function(){
         }
    });
	    if(responseJson.message.indexOf("过期") >0){
	    	maObject.openHtml("login","login.html",{});
	    }
   }
}
function errprCallBack(responseJson){
	kodata.removeAll();
}
function refreshData(func){
	var params = {
			//'userid' : '000110100000000000S4' //获取用户id
			'userid' : localStorage.getItem("userid"),
			'userCode':localStorage.getItem("usercode"),
			'pk_log':localStorage.getItem("pk_log")
	}
	maObject.post(url + "func=" + func,params,successCallBack,errprCallBack);
    
 }
var kodata = null;
function changeData(data){
	if(kodata == null){
		initData(data);
		return;
	}
	kodata.removeAll();
	for(var i = 0; i < data.length; i++){
		kodata.push(data[i]);
	}
}
function cleanData(){
	if(kodata != null && kodata != undefined){
		kodata.removeAll();
	}
}
summerready = function(){

	var name = maObject.getPageParam("main","name");
	if(name == "dsp"){
		dspClick();
	}else if(name == "ysp"){
		yspClick();
	}else if(name == "ybh"){
		ybhClick();
	}
	
	
}

function initData(data){
	//Knockout绑定               
	var ViewModel = function() {                
        		};
	var viewModel = new ViewModel();           
	viewModel.data = ko.observableArray(data);
	kodata = viewModel.data;
	ko.applyBindings(viewModel);
	//构造控件实例
	var listview = UM.listview('#listview');
	listview.on('itemClick', function(sender, args) {
		var item = viewModel.data()[args.rowIndex];
		var param = {
                  "count" : 1,
                  "jsonData" : item,
                  "headerTitle" : "编辑",
                  "selected" : selected};
		
		maObject.openHtml("bill","bill.html",param);
              
             
        // window.execScript('indexOpenWin("bill","bill.html",param)', "JavaScript");
		
	});	
	listview.on('pullDown', function(sender) {
		//这是可以编写列表下拉加载逻辑，参数sender即为当前列表实例对象
		 refreshSelectedData();
		 sender.refresh(); 
	});
}
 
