function pConfirm()
{
	//从输入中获得需要的值
	var pUNo = $("#pUNo").val();
	var pPaymentKinds = $("#pPaymentKinds").val(); ;
	var pMoney = $("#pMoney").val();
	var pDeadline = $("#pDeadline").val();
	
	var url = "lkk.jsp/p_mPaymentCreate.jsp";
	//alert("come in");
	//发起post请求
	$.post(url, 
			{
				pUNo: pUNo,
				pPaymentKinds: pPaymentKinds,
				pMoney: pMoney,
				pDeadline: pDeadline
			},
			function(result)
			{
				//判断是否插入成功
				if(JSON.parse(result) == true)
				{	
					alert("创建成功");
					//更新缴费清单
					updateSearch(0);
				}
				else
					alert("创建失败,输入有误");
			}
			
	);
	//alert(pUNo + pMoney +pPaymentKinds + pDeadline);
	
}
function pSearch()
{
	//每个查询清空页数信息
	$("#lblTotal").text("");
	$("#lblRequest").text("");
	updateSearch(0);
}
function loadPTable()
{
	updateSearch(0);
}
function clearPTable()
{
	var table = document.getElementById("pTable");
	while(table.rows.length>1)
		table.deleteRow(1);
}

function loadPTableFromResult(result, result2)
{
	//清空投诉列表
	clearPTable();
    var payments = JSON.parse(result);
    var name = JSON.parse(result2);
    var table = document.getElementById("pTable");
    //3-逐个访问投诉信息，生成投诉列表
    var index = 0;
    for(index=0; index<payments.length; index++)
    {
    	var newRow = table.insertRow(table.rows.length);
        var col1 = newRow.insertCell(0),col2 = newRow.insertCell(1), 
            col3 = newRow.insertCell(2),col4 = newRow.insertCell(3);
        	col5 = newRow.insertCell(4),col6 = newRow.insertCell(5);
        	col7 = newRow.insertCell(6);
        col1.innerHTML = payments[index].pNo;
        col2.innerHTML = payments[index].User_ID;
        col3.innerHTML = name[index];
        col4.innerHTML = payments[index].pItem;
        col5.innerHTML = payments[index].pMoney;
        col6.innerHTML = payments[index].pDeadline;
        if(payments[index].pIsfinished == true)
        {
        	col7.innerHTML = "已缴费";
        }
        else
        {
        	col7.innerHTML = "待缴费";
       	}
    }
}
function updateSearch(move)
{
	
	
	var pUInfo = $("#pUInfo").val();
	var sPaymentKinds = $("#sPaymentKinds").val();
	var sStateKinds = $("#sStateKinds").val();
	
	//总共有多少页的投诉
	var url ="lkk.jsp/p_mPaymentsPage.jsp?pUInfo="+pUInfo+"&sPaymentKinds="+sPaymentKinds+"&sStateKinds="+sStateKinds;
	
	$.get(url, function(result){	
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

		//判断请求是否合理
		if(parseInt(queryPage)<1 || parseInt(queryPage)>parseInt($("#lblTotal").text()))
			return;
		$("#lblRequest").text(queryPage);

		//
			var url = "lkk.jsp/p_mLoadPayments.jsp";
			//alert("come in");
			//发起post请求
			$.post(url, 
					{
						pUInfo: pUInfo,
						sPaymentKinds: sPaymentKinds,
						sStateKinds: sStateKinds,
						queryPage: queryPage
					},
					//两张表，第一次请求得到除姓名的信息
					function(result1)
					{
						//得到姓名信息
						$.get("lkk.jsp/p_mUName.jsp",function(result2)
								{
									loadPTableFromResult(result1, result2);
								}
								);
						//加载表单
					}
			);
	});
}


function preRow()
{
	updateSearch(-1);
}
function nextRow()
{
	updateSearch(1);
}
