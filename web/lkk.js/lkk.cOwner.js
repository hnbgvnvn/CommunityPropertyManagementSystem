function submitForm()
{
	//获得用户输入的投诉信息
	var cTheme = $("#complaintsTheme").val();
	if(cTheme == "")
	{
		alert("主题不许为空");
		return;
	}
	
	//$("#complaintsDetail").text("123");
	
	var cText = $("#complaintsDetail").val();
	alert("cText："+cText);
	if(cText == "")
	{
		alert("内容不许为空");
		return;
	}
	//定义url
	var url = "lkk.jsp/oComplaintsSubmit.jsp?cTheme="+cTheme+"&cText="+cText;
	//发起post请求
	$.post(url, function(result){
		if(JSON.parse(result) == true)
		{
			alert("提交成功，请耐心等待处理");
			$("#complaintsTheme").val("");
			$("#complaintsDetail").val("");
			//更新投诉列表
			updateMyComplaintsTable(0);
		}
	});
}
function clearMyComplaintsTable()
{
	var table = document.getElementById("myComplaintsTable");
	while(table.rows.length>1)
		table.deleteRow(1);
}
function loadMyComplaintsTableFromResult(result)
{
	//清空投诉列表
	clearMyComplaintsTable();
	
    var complaintsInfos = JSON.parse(result);
    var table = document.getElementById("myComplaintsTable");
    
    //3-逐个访问投诉信息，生成投诉列表
    var index = 0;
    for(index=0; index<complaintsInfos.length; index++)
    {
    	var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0),col2 = newRow.insertCell(1), 
            col3 = newRow.insertCell(2),col4 = newRow.insertCell(3);

        col1.innerHTML = complaintsInfos[index].cTheme;
        col2.innerHTML = "<input type='button' class='btn btn-info' onclick='textDetails(\"" + complaintsInfos[index].cText + "\")' id='textDetails' value='详细'/>";
        col3.innerHTML = complaintsInfos[index].cDate;
        //alert(complaintsInfos[index].isReply);
        if(complaintsInfos[index].isReply == true)  	
        	col4.innerHTML ="<input type='button' class='btn btn-info' onclick='handleDetails(\"" + complaintsInfos[index].rText + "\")' id='handleDetails' value='回复详情'/>";
        else
        	col4.innerHTML ="<input type='button' class='btn btn-info disabled' id='handleDetails' value='待回复'/>";
    }
}
function loadMyComplaintsTable()
{
	updateMyComplaintsTable(0);
}
function updateMyComplaintsTable(move)
{
	//总共有多少页的投诉
	var url ="lkk.jsp/oComplaintsPage.jsp";
	$.get(url, function(result){
		//alert(JSON.parse(result));
		if(JSON.parse(result) == "0")
			$("#lblTotal").text(parseInt(JSON.parse(result))+1);
		else
			$("#lblTotal").text(JSON.parse(result));
		//处理初始加载
		var queryPage=$("#lblRequest").text();
		if(queryPage==null || queryPage=="" || queryPage=="0"){
			queryPage=1;
			$("#lblRequest").text(queryPage);
		}
		queryPage = parseInt(queryPage)+parseInt(move);
		
		//alert(queryPage +" "+ parseInt($("#lblTotal").text()));
		//判断请求是否合理
		if(parseInt(queryPage)<1 || parseInt(queryPage)>parseInt($("#lblTotal").text()))
			return;
		$("#lblRequest").text(queryPage);
		//alert("当前页"+queryPage);
		//响应用户请求页
		var url="lkk.jsp/oLoadComplaints.jsp?queryPage="+queryPage;
		$.post(url, function(result){
			if(JSON.parse(result) != null)	
				//加载投诉列表
				loadMyComplaintsTableFromResult(result);
			//alert(JSON.parse(result));
		});
		
	});
	
}
function preRow()
{
	updateMyComplaintsTable(-1);
}
function nextRow()
{
	updateMyComplaintsTable(1);
}
function textDetails(cText)
{
	alert(cText);
}
function handleDetails(rText)
{
	//alert("come in");
	alert(rText);
}