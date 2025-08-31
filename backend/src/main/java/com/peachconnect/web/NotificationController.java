package com.peachconnect.web;

import com.peachconnect.domain.Notification;
import com.peachconnect.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
	private final NotificationService notificationService;

	public NotificationController(NotificationService notificationService) {
		this.notificationService = notificationService;
	}

	@GetMapping
	public ResponseEntity<List<Notification>> getNotifications(@RequestParam(required = false) String recipientName) {
		if (recipientName != null) {
			return ResponseEntity.ok(notificationService.getNotificationsForRecipient(recipientName));
		}
		return ResponseEntity.ok(notificationService.getAllNotifications());
	}

	@PostMapping
	public ResponseEntity<Notification> sendNotification(@RequestBody Notification notification) {
		Notification saved = notificationService.sendNotification(notification);
		return ResponseEntity.ok(saved);
	}
}
