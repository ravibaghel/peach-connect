package com.peachconnect.repository;

import com.peachconnect.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
	// Additional query methods if needed
}
