package com.peachconnect.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String senderName;
	private String receiverName;
	private String content;
	private LocalDateTime timestamp;

	// Getters and setters
	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }
	public String getSenderName() { return senderName; }
	public void setSenderName(String senderName) { this.senderName = senderName; }
	public String getReceiverName() { return receiverName; }
	public void setReceiverName(String receiverName) { this.receiverName = receiverName; }
	public String getContent() { return content; }
	public void setContent(String content) { this.content = content; }
	public LocalDateTime getTimestamp() { return timestamp; }
	public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
