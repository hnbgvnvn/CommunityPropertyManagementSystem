package service.impl;


import dao.impl.studentdaoImpl;
import dao.studentdao;
import model.Student;
import service.studentservice;

public class studentserviceImpl implements studentservice {

    private studentdao studentdao = new studentdaoImpl();



    @Override
    public boolean input(Student student) {
        //1.根据数据库中的学号查询用户对象
        boolean subject_grade_exit = studentdao.checkStudent(student);
        //2.如果没有
        if(subject_grade_exit == true){
            return false;
        }else {
            studentdao.save(student);
            return true;
        }
    }

    @Override
    public void modify(Student student) {
        studentdao.modify_score(student);
    }

    @Override
    public void del(Student student) {
        studentdao.delete_score(student);
    }
}
