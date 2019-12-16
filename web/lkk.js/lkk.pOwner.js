function loadOTable()
{
	updateOTable(0);
}
function oSearch()
{
	//每个查询清空页数信息
	$("#lblTotal").text("");
	$("#lblRequest").text("");

	updateOTable(0);
}

function clearOTable()
{
	var table = document.getElementById("oTable");
	while(table.rows.length>1)
		table.deleteRow(1);
}

function loadOTableFromResult(result)
{

	//清空投诉列表
	clearOTable();
	
    var payments = JSON.parse(result);
    
    var table = document.getElementById("oTable");
    //3-逐个访问投诉信息，生成投诉列表
    var index = 0;
    for(index=0; index<payments.length; index++)
    {
    	var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0),col2 = newRow.insertCell(1), 
            col3 = newRow.insertCell(2),col4 = newRow.insertCell(3);
        	col5 = newRow.insertCell(4);
        col1.innerHTML = payments[index].pNo;
        col2.innerHTML = payments[index].pItem;
        col3.innerHTML = payments[index].pMoney;
        col4.innerHTML = payments[index].pDeadline;
        if(payments[index].pIsfinished == true)
        {
        	col5.innerHTML = "已缴费";
        }
        else
        {
        	//
        	col5.innerHTML = "<input type='button' class='btn btn-info' onclick='toPayment(\"" + payments[index].pNo + "\")' value='缴费'/>";
       	}
    }
}
function toPayment(pNo)
{
	//alert(pNo);
	var url = "lkk.jsp/p_oToPayment.jsp?pNo="+pNo;
	$.get(url, function(result)
			{
				if(JSON.parse(result) == true)
				{	
					alert("缴费成功");
					updateOTable(0);
				}
				else
					alert("缴费失败");
			});
}

function updateOTable(move)
{
	var oStateKinds = $("#oStateKinds").val();
	//alert(oStateKinds);
	//总共有多少页的投诉
	var url ="lkk.jsp/p_oPaymentsPage.jsp?oStateKinds="+oStateKinds;
	
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
		var url="lkk.jsp/p_oLoadPayments.jsp?queryPage="+queryPage+"&oStateKinds="+oStateKinds;
		
		$.post(url, function(result){
			if(JSON.parse(result) != null)	
				//加载投诉列表
				loadOTableFromResult(result);
			//alert(JSON.parse(result));
		});
		
	});
	
}
function preRow()
{
	updateOTable(-1);
}
function nextRow()
{
	updateOTable(1);
}