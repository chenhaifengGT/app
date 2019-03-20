summerready = function(){
	var jsonData = maObject.getPageParam("approveInfo");
	getBillData(jsonData,"queryBillApproveInfo");
}

function initHtml(data2) {
	var data = [{
		"approver" : "集团中心副总裁",
		"status":"已审批",
		"opinion" : "审批通过",
		"time" : "2016/1/13 12:10:00"
	}, {
		"approver" : "采购部总经理",
		"status":"已审批",
		"opinion" : "审批通过",
		"time" : "2016/1/13 08:50:20"
	}, {
		"approver" : "财务部负责人",
		"status":"已审批",
		"opinion" : "审批通过",
		"time" : "2016/1/13 01:40:25"
	}, {
		"approver" : "部门经理",
		"status":"已审批",
		"opinion" : "审批通过",
		"time" : "2016/1/12 23:45:10"
	}];
	var ViewModel = function() {
	};
	var viewModel = new ViewModel();
	viewModel.data = ko.observableArray(data2);
	ko.applyBindings(viewModel);
}
function successCallBack(responseJson){
	 if(responseJson.state == 1){
		   	initHtml(responseJson.data);
		   }else{
			   	UM.alert({
			        "title" : "失败信息",
			        "text" : responseJson.message,
			        "btnText" : ["","确定"],
			        "overlay" : true,
			        "cancle" :function(){
			         }
			    });
		   }
}
        	
function getBillData(jsonData,func){

	jsonData["userCode"] = localStorage.getItem("usercode");
	jsonData["pk_log"] = localStorage.getItem("pk_log");
	alert("postjson");
	alert(JSON.stringify(jsonData));
	maObject.post(url + "func=" + func,jsonData,successCallBack);
    

}			