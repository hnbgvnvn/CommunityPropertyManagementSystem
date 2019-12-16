/**
 * 页面初始化
 * @param cookieUsercode cookie中的用户编号
 * @param logonMsg 登录提示信息
 * @return
 */
function page_init(cookieUsercode,logonMsg)
{
	var msg = logonMsg;
	if (msg != 'null') 
	{
		$("#logonMsg").html(msg);
		$("#logonMsg").show();
	}
	$("#usercode").val(cookieUsercode);
	if ($("#usercode").val() == "") 
	{
		$("#usercode").focus();
	}
	else 
	{
		$("#passwd").focus();
	}
	
	changePlaceholder();
}

/**
 * 处理键盘回车事件
 * @param e
 * @param useValidImage 是否使用了验证码
 * @return
 */
function checkKey(e,useValidImage)
{
  var oriE = e;
  if (window.event) { e = event; e.which = e.keyCode; } else if (!e.which) e.which = e.keyCode;
  var key = e.which;
  if(key == 13)
  {
	//alert(useValidImage + '|' + );
	if("true"!=useValidImage) //未使用验证码
	{
		$("#passwd").focus();
	    if ($("#passwd").val()=="")
	    {
	    	return false;
	    }
	    {
	  		onLogin();
	  	}
	}
	else
	{
		var activEleId = document.activeElement.id;
		if(activEleId == "usercode")
		{
			$("#passwd").focus();
		}
		else if(activEleId == "passwd")
		{
			$("#validimage").focus();
		}
		else if(activEleId == "validimage")
		{
			if ($("#validimage").val()=="")
		    {
		    	return false;
		    }
		    {
		  		onLogin();
		  	}
		}
		else
		{
			$("#validimage").focus();
		}
	}
  }
}

/**
 * 登录
 * @
 */
function onLogin()
{
	//错误提示隐藏
	$("#logonMsg").html("");
	$("#logonMsg").hide();
	//登录按钮变样式
	$(".loginBtn").addClass("loginBtnload");
	
	$("form").submit();
}

/**
 * 修改登录文本提示的状态
 */
function changePlaceholder()
{
	if ($("#usercode").val() != "") 
	{
		$("#phusercode").hide();
	}
	else
	{
		$("#phusercode").show();
	}
	
	if ($("#passwd").val() != "") 
	{
		$("#phpasswd").hide();
	}
	else
	{
		$("#phpasswd").show();
	}
	
	if ($("#validimage").val() != "") 
	{
		$("#phvalidimage").hide();
	}
	else
	{
		$("#phvalidimage").show();
	}
}