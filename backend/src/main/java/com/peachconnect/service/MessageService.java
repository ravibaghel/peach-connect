package com.peachconnect.service;

import com.peachconnect.domain.Message;
import com.peachconnect.repository.MessageRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
	private final MessageRepository messageRepository;

	public MessageService(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	public List<Message> getAllMessages() {
		return messageRepository.findAll();
	}

	public List<Message> getMessagesForReceiver(String receiverName) {
		return messageRepository.findByReceiverName(receiverName);
	}

	public Message sendMessage(Message message) {
		message.setTimestamp(LocalDateTime.now());
		return messageRepository.save(message);
	}
}
