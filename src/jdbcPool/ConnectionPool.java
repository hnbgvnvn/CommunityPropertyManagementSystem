package jdbcPool;

import com.microsoft.sqlserver.jdbc.SQLServerDriver;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.LinkedList;

public class ConnectionPool {
    //链表 --- 实现栈结构
    private LinkedList<Connection> dataSources = new LinkedList<Connection>();

    //初始化连接数量
    public ConnectionPool() {
        //一次性创建10个连接
        for(int i = 0; i < 10; i++) {
            try {
                //1、装载sqlserver驱动对象
                DriverManager.registerDriver(new SQLServerDriver());
                //2、通过JDBC建立数据库连接
                Connection con =DriverManager.getConnection(
                        "jdbc:sqlserver://localhost:1433;DatabaseName=StudentScore", "student", "student");
                //3、将连接加入连接池中
                dataSources.add(con);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


    public Connection getConnection() throws SQLException {
        //取出连接池中一个连接
        final Connection conn = dataSources.removeFirst(); // 删除第一个连接返回
        return conn;
    }

    //将连接放回连接池
    public void releaseConnection(Connection conn) {
        dataSources.add(conn);
    }
}