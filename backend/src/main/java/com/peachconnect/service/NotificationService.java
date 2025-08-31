package com.peachconnect.service;

import com.peachconnect.domain.Notification;
import com.peachconnect.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
	private final NotificationRepository notificationRepository;

	public NotificationService(NotificationRepository notificationRepository) {
		this.notificationRepository = notificationRepository;
	}

	public List<Notification> getAllNotifications() {
		return notificationRepository.findAll();
	}

	public List<Notification> getNotificationsForRecipient(String recipientName) {
		return notificationRepository.findByRecipientName(recipientName);
	}

	public Notification sendNotification(Notification notification) {
		notification.setTimestamp(LocalDateTime.now());
		notification.setRead(false);
		return notificationRepository.save(notification);
	}
}
