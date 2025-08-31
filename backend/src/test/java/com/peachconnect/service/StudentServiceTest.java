package com.peachconnect.service;

import com.peachconnect.domain.Student;
import com.peachconnect.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.Optional;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class StudentServiceTest {
    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllStudents() {
        Student s1 = new Student(); s1.setId(1L); s1.setFirstName("John");
        Student s2 = new Student(); s2.setId(2L); s2.setFirstName("Jane");
        when(studentRepository.findAll()).thenReturn(Arrays.asList(s1, s2));
        List<Student> students = studentService.getAllStudents();
        assertEquals(2, students.size());
    }

    @Test
    void testGetStudentById() {
        Student s = new Student(); s.setId(1L); s.setFirstName("John");
        when(studentRepository.findById(1L)).thenReturn(Optional.of(s));
        Optional<Student> result = studentService.getStudentById(1L);
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getFirstName());
    }

    @Test
    void testSaveStudent() {
        Student s = new Student(); s.setFirstName("John");
        when(studentRepository.save(s)).thenReturn(s);
        Student saved = studentService.saveStudent(s);
        assertEquals("John", saved.getFirstName());
    }

    @Test
    void testDeleteStudent() {
        doNothing().when(studentRepository).deleteById(1L);
        studentService.deleteStudent(1L);
        verify(studentRepository, times(1)).deleteById(1L);
    }
}
