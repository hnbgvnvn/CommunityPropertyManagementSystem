package service;

import model.Student;

public interface studentservice {
    boolean input(Student student);
    void modify(Student student);
    void del(Student student);
}
