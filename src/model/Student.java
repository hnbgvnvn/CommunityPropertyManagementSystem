package model;
import java.io.Serializable;

/**
 * 作为JavaBean的例子看一下
 * 实现get和set方法时注意大小写
 */
public class Student implements Serializable{
        private String studentNo; //学生的学号
        private String specialty;//学生的专业
        private String grade;//学生的年级
        private String studentSex;//学生的性别
        private String subjectName;//学科的名称
        private String studentScore;//学生的成绩
        private String studentName;

    public Student(){}//无参构造方法
    
    public Student(  String studentNo, String specialty, String grade, String studentSex, String subjectName,String studentScore,String studentName){
        this.studentNo = studentNo;
        this.specialty = specialty;
        this.grade = grade;
        this.studentSex = studentSex;
        this.subjectName= subjectName;
        this.studentScore = studentScore;
        this.studentName = studentName;
    }
    //有参的构造方法
    //01studentno
    public String getStudentNo(){
        return studentNo;
    }

    public void setStudentNo(String studentNo){
        this.studentNo = studentNo;
    }

    //02studensex
    public String getStudentSex(){
        return studentSex;
    }
    
    public void setStudentSex(String studentSex){
        this.studentSex = studentSex;
    }

    //03specialty
    public String getSpecialty(){
        return specialty;
    }

    public void setSpecialty(String specialty){
        this.specialty = specialty;
    }

    //04grade
    public String getGrade(){
        return grade;
    }

    public void setGrade(String grade){
        this.grade = grade;
    }

    //05subjectname
    public String getSubjectName(){
        return subjectName;
    }

    public void setSubjectName(String subjectName){
        this.subjectName = subjectName;
    }

    //06studentscore
    public String getStudentScore(){
        return studentScore;
    }

    public void setStudentScore(String studentScore){
        this.studentScore = studentScore;
    }


    //07studentname
    public String getStudentName(){
        return studentName;
    }

    public void setStudentName(String studentName){
        this.studentName = studentName;
    }




    public String toString() {
        return "Student{" +
                "specialty='" + specialty+'\''+
                ",grade='" + grade + '\'' +
                ",studentNo='" + studentNo + '\'' +
                ",studentName='" + studentName + '\'' +
                ",studentSex='" + studentSex + '\'' +
                ",subjectName='" + subjectName + '\'' +
                ",studentScore='" + studentScore + '\'' +

                '}';
    }
}
