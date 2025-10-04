package com.peachconnect.web;

import com.peachconnect.domain.Student;
import com.peachconnect.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        // Validate required fields
        if (student.getFirstName() == null || student.getFirstName().trim().isEmpty() ||
            student.getLastName() == null || student.getLastName().trim().isEmpty() ||
            student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("First name, last name, and email are required."));
        }
        // Check for duplicate email
        List<Student> allStudents = studentService.getAllStudents();
        boolean emailExists = allStudents.stream()
            .anyMatch(s -> s.getEmail() != null && s.getEmail().equalsIgnoreCase(student.getEmail()));
        if (emailExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("A student with this email already exists."));
        }
        Student saved = studentService.saveStudent(student);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        if (!studentService.getStudentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        student.setId(id);
        Student updated = studentService.saveStudent(student);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (!studentService.getStudentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    // ErrorResponse class for error messages
    class ErrorResponse {
        public String message;
        public ErrorResponse(String message) { this.message = message; }
    }
}
