package com.peachconnect.web;

import com.peachconnect.domain.User;
import com.peachconnect.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;

	public AuthController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		User created = userService.register(user);
		return ResponseEntity.ok(created);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User loginRequest) {
		return userService.findByUsername(loginRequest.getUsername())
			.filter(user -> userService.checkPassword(user, loginRequest.getPassword()))
			.map(user -> {
				String token = userService.generateJwtToken(user);
				return ResponseEntity.ok().body(token);
			})
			.orElse(ResponseEntity.status(401).body("Invalid credentials"));
	}
}
