<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="model.*,dao.*,Utils.*" %>
<%
	String userName=request.getParameter("userName");
	String Password=request.getParameter("Password");
	UserAccountDao canLogin = new UserAccountDao();
	Integer is = canLogin.login(userName,Password);
	
	Integer id = canLogin.getID(userName, is);
	
	String name = canLogin.getName(id,is);
	session.setAttribute("userID", id);
	session.setAttribute("name", name);
	//java对象(数组) 转换 json字符串
	String jsonStr=JsonUtils.objectToJson(is);
	out.write( jsonStr );
	
	
%>