package com.peachconnect.service;

import com.peachconnect.domain.User;
import com.peachconnect.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.security.Key;

@Service
public class UserService {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private final Key jwtKey = Keys.hmacShaKeyFor("peachconnectSecretKeypeachconnectSecretKey".getBytes()); // 32+ chars for HS256
	private final long jwtExpirationMs = 86400000; // 1 day

	public String generateJwtToken(User user) {
		return Jwts.builder()
				.setSubject(user.getUsername())
				.claim("role", user.getRole())
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(jwtKey, SignatureAlgorithm.HS256)
				.compact();
	}

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public User register(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public boolean checkPassword(User user, String rawPassword) {
		return passwordEncoder.matches(rawPassword, user.getPassword());
	}
}
