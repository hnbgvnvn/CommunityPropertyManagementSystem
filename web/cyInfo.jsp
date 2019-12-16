<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="keshe1.*" %>
<%
String str = null;
//1-通过服务层获得数据
cyInfo[] car=DbUtils.getCyInfo();
//2-java对象(数组) 转换 json字符串

String jsonStr=JsonUtils.objectToJson(car);
//3-json对象(数组) 转换 json字符串
out.write(jsonStr);
%>
