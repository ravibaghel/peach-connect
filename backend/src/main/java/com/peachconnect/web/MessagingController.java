package com.peachconnect.web;

import com.peachconnect.domain.Message;
import com.peachconnect.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessagingController {
	private final MessageService messageService;

	public MessagingController(MessageService messageService) {
		this.messageService = messageService;
	}

	@GetMapping
	public ResponseEntity<List<Message>> getMessages(@RequestParam(required = false) String receiverName) {
		if (receiverName != null) {
			return ResponseEntity.ok(messageService.getMessagesForReceiver(receiverName));
		}
		return ResponseEntity.ok(messageService.getAllMessages());
	}

	@PostMapping
	public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
		Message saved = messageService.sendMessage(message);
		return ResponseEntity.ok(saved);
	}
}
