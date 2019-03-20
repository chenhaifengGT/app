var selected = null

summerready = function(){
	if(self!=top){
		top.location=self.location; 
		return;
	}
	var jsonData = maObject.getPageParam("bill","jsonData");
	selected = maObject.getPageParam("bill","selected");
	if(jsonData == undefined || jsonData == null){
		jsonData = {
            "senddate": "2017-03-16",
            "billtypename": "报销单",
            "checkman": "000110100000000000S4",
            "billid": "1003021000000000QYCQ",
            "checkmanname": "用友99",
            "money": 300,
            "billno": "BXGA1703160003",
            "status": "待审批",
            "pk_billtype": "2641"
        };
        
	}
	jsonData["selected"] = selected;
	jsonData["userid"] = localStorage.getItem("userid");
	alert(JSON.stringify(jsonData));
	billData = jsonData;
	getBillData(jsonData,"queryBillVO");
	//initData(null);
	
	
}
function initStyle(json){

	if(selected == "queryYspBill"){
		$("#approval input").attr("disabled","disabled");
		$("#approval .um-black").css("color","gray");
		$("#approveButton").text("弃审");
		$("#approveButton").css("background-color","red")
		
	}else if (selected == "queryYbhBill"){
		$("#approval input").attr("disabled","disabled");
		$("#approval .um-black").css("color","gray");
		$("#approveButton").css("background-color","gray")
	}

	
	$("#approval").find("input:radio").on("change",function(){
		alert(this.checked);
    	if(this.checked) {
	        checkValue = $(this).val();
	        if(checkValue == 1){
				$("#leaveremark").val("批准！")
			}else if (checkValue == 0){
				$("#leaveremark").val("不同意！")
			}else if(checkValue == 2){
				$("#leaveremark").val("驳回！")
			}
	        
	    }
	})
	
	var arr = json.approve;
	var  approveJson = arr[0];
	var checknote = approveJson.checknote;
	var value = approveJson.value;
	if(checknote != null && checknote.length > 0){
		$("#leaveremark").val(checknote)
	}
	if(value != null && value.length > 0){
		if("1" == value){
			$("#approval").find("input:radio")[0].checked = true
		}else if("0" == value){
			$("#approval").find("input:radio")[1].checked = true
		}else if("2" == value){
			$("#approval").find("input:radio")[2].checked = true
		}
	}
	
	
}
var checkValue = 1;
var billData = null;
function approveBill(){
	if("queryYbhBill" == selected){
			return;
		}
	if(checkValue != null){
		//alert("你选择了"+checkValue);
		//alert($("#leaveremark").val());
		var approveresult = null;
		
		if(checkValue == 1){
			approveresult = "Y";
		}else if (checkValue == 0){
			approveresult = "N";
		}else if(checkValue == 2){
			approveresult = "R";
		}else{
			alert("审批意见值为:" + checkValue + "无法识别,请重新选择审批意见");
		}
		var actionName = "APPROVE";
		if("queryYspBill" == selected){
			actionName = "UNAPPROVE" + localStorage.getItem("userid");
		}
		var jsonData = {
			"actionName" : actionName,
			"billType" : billData.pk_billtype,
			"billId" : billData.billid,
			"approveresult" : approveresult,
			"checkNote" : $("#leaveremark").val() + "(来自移动审批)"
			
		}
		
		getBillData(jsonData,"process");
	}
}
function getBillData(jsonData,func){

	jsonData["userCode"] = localStorage.getItem("usercode");
	jsonData["pk_log"] = localStorage.getItem("pk_log");
	alert("postjson");
	alert(JSON.stringify(jsonData));
	
	maObject.post(url + "func=" + func,jsonData,
		function (responseJson){
			if(func == "queryBillVO"){
			   	 if(responseJson.state == 1){
			   	 	initData(responseJson.data);
			   	 	initStyle(responseJson.data)
			   	 }else{
			   	 	UM.alert({
				        "title" : "处理失败",
				        "text" : responseJson.message,
				        "btnText" : ["取消","确定"],
				        "overlay" : true,
				        "ok" :function(){
				        	closeBill();
				         }
				    });
			   	 }
			   	 
			   }else if(func == "process"){
			   	approveBillCallBack(responseJson);
			   }
		},function (response){});
    

}
function closeBill(){
	var frameId = null;
	if(selected == "queryDspBill"){
		frameId = "dsp";
	}else if(selected == "queryYspBill"){
		frameId = "ysp";
	}else if(selected == "queryYbhBill"){
		frameId = "ybh";
	}
	maObject.closeCurrentHtml();
	
	
}
function approveBillCallBack(json){
	if(json.state == 1){
		UM.alert({
		        "title" : "操作成功",
		        "text" : json.message,
		        "btnText" : ["","确定"],
		        "overlay" : true,
		        "ok" :function(){
		        	closeBill();
		         }
		    });
		
	}else{
		UM.alert({
		        "title" : "处理失败",
		        "text" : json.message,
		        "btnText" : ["","确定"],
		        "overlay" : true,
		        "cancle" :function(){
		         }
		    });
	}
}

function initData(data){
		//手风琴效果代码
			$('.content_line').on('click','div.head',function(e){
				$(e.currentTarget).next().toggleClass('active').slideToggle();
				$(e.currentTarget).find('i').toggleClass('ti-angle-up').toggleClass('ti-angle-down');
			});
		//数据
		
			var data2 = {
        "lines": [],
        "header": [
            {
                "fieldName": "单据ID",
                "fieldValue": "1003021000000000QYCQ"
            },
            {
                "fieldName": "单据类型",
                "fieldValue": "2641"
            }
        ],
        "approve": [
            {
                "value": "2",
                "title": "审批意见:",
                "opinion": "同意!",
                "options": [
                    {
                        "value": "1",
                        "text": "通过"
                    },
                    {
                        "value": "0",
                        "text": "不通过"
                    },
                    {
                        "value": "2",
                        "text": "驳回"
                    }
                ]
            }
        ]
    }
			
	
			var arrText1 = doT.template($("#list1").text());
           $("#content_header").html(arrText1(data.header));
            var arrText2 = doT.template($("#list2").text());
           $("#content_line").html(arrText2(data.lines));
           //var arrText3 = doT.template($("#list3").text());
           //$("#order_name").html(arrText3(data.lister));
           var arrText4 = doT.template($("#list4").text());
           $("#approval").html(arrText4(data.approve));

}

    
$(function() {
	$(".um-header-right").popover({
		content : document.getElementById("temp").innerHTML,
		width : 140,
		animation : "pop",
		delay : {
			show : 100,
			hide : 100
		}
	});
})

function goToApproveInfo(){
	maObject.openHtml("approveInfo","approveInfo.html",{
              "jsonData" : maObject.getPageParam("bill","jsonData")
          })
	
}