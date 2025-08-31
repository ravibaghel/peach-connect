package com.peachconnect.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String recipientName;
	private String content;
	private boolean read;
	private LocalDateTime timestamp;

	// Getters and setters
	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }
	public String getRecipientName() { return recipientName; }
	public void setRecipientName(String recipientName) { this.recipientName = recipientName; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public boolean isRead() { return read; }
	public void setRead(boolean read) { this.read = read; }
	public LocalDateTime getTimestamp() { return timestamp; }
	public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
