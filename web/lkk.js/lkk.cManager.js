
function clearComplaintsTable()
{
	var table = document.getElementById("complaintsTable");
	while(table.rows.length>1)
		table.deleteRow(1);
}

function loadComplaintsTableFromResult(result)
{
	//lkk.cManager
	//清空投诉列表
	clearComplaintsTable();

    var mcomplaintsInfos = JSON.parse(result);
    var table = document.getElementById("complaintsTable");
    //3-逐个访问投诉信息，生成投诉列表
    var index = 0;
    for(index=0; index<mcomplaintsInfos.length; index++)
    {
    	var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0),col2 = newRow.insertCell(1), 
            col3 = newRow.insertCell(2),col4 = newRow.insertCell(3);
        	col5 = newRow.insertCell(4),col6 = newRow.insertCell(5);
        	
        col1.innerHTML = mcomplaintsInfos[index].User_ID;
        col2.innerHTML = mcomplaintsInfos[index].UNAME;
        col3.innerHTML = mcomplaintsInfos[index].cTheme+
        "<input type='button' class='btn btn-info' onclick='complaintsDetails(\"" + mcomplaintsInfos[index].cText  + "\")' id='complaintsDetails' value='详细'/>";
        col4.innerHTML = mcomplaintsInfos[index].cDate;
        //alert(mcomplaintsInfos[index].isReply);
        if(mcomplaintsInfos[index].isReply == true)
        {
        	col5.innerHTML ="<input type='button' class='btn btn-info' onclick='complaintsReplyText(\"" + mcomplaintsInfos[index].rText+ "\")' id='handleDetails' value='回复详细'/>";
        	col6.innerHTML = mcomplaintsInfos[index].rDate;
        }
        else
        {
        	/*
        	此处逻辑搞不懂，
        	*/
        	var mcomplaintsInfo = JSON.stringify(mcomplaintsInfos[index]);
        	col5.innerHTML ="<input type='button' class='btn btn-info'  onclick='complaintsReply(" + mcomplaintsInfo + ")' id='handleDetails' value='回复'/>";
       	}
        
        //alert(JSON.stringify(mcomplaintsInfos[index]));
    }
}

function loadComplaintsTable()
{
	updateComplaintsTable(0)
}
function updateComplaintsTable(move)
{
	//总共有多少页的投诉
	var url ="lkk.jsp/mComplaintsPage.jsp";
	$.get(url, function(result){
		if(JSON.parse(result) == "0")
			$("#lblTotal").text(parseInt(JSON.parse(result))+1);
		else
			$("#lblTotal").text(JSON.parse(result));
		
		//alert($("#lblTotal").text());
		
		//处理初始加载
		var queryPage=$("#lblRequest").text();
		if(queryPage==null || queryPage=="" || queryPage=="0"){
			queryPage=1;
			$("#lblRequest").text(queryPage);
		}

		queryPage = parseInt(queryPage)+parseInt(move);

		
		//判断请求是否合理
		if(parseInt(queryPage)<1 || parseInt(queryPage)>parseInt($("#lblTotal").text()))
			return;
		$("#lblRequest").text(queryPage);
		//alert("当前页"+queryPage);
		//响应用户请求页
		var url="lkk.jsp/mLoadComplaints.jsp?queryPage="+queryPage;
		$.post(url, function(result){

			if(JSON.parse(result) != null)
				//加载投诉列表
				loadComplaintsTableFromResult(result);
		});
	});
	
	
}
function preRow()
{
	updateComplaintsTable(-1);
}
function nextRow()
{
	updateComplaintsTable(1);
}
function complaintsDetails(cText)
{
	alert(cText);
}
function complaintsReplyText(rText)
{
	alert(rText);
}
function complaintsReply(mcomplaintsInfo)
{
	var rText = prompt("回复：","此处输入回复信息");
	if(rText == "此处输入回复信息" || rText == null)
	{
		alert("回复无效");
		return;
	}

	var url = "lkk.jsp/mManagerReply.jsp?cNo="+mcomplaintsInfo.cNo+"&rText="+rText;
	$.post(url, function(result)
	{
		if(JSON.parse(result) == true)
		{
			alert("回复成功");		
			updateComplaintsTable(0);
		}
		else
			alert("回复失败");
	});	
}
