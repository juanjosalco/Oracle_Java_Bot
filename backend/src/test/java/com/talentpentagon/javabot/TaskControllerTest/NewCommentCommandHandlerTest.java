// package com.talentpentagon.javabot.TaskControllerTest;

// import com.talentpentagon.javabot.commandhandlers.NewCommentCommandHandler;
// import com.talentpentagon.javabot.model.Comment;
// import com.talentpentagon.javabot.service.CommentService;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.fail;

// import java.sql.Timestamp;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.MockitoAnnotations;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.server.ResponseStatusException;

// import static org.mockito.Mockito.when;

// @SpringBootTest()
// public class NewCommentCommandHandlerTest {

//     @Mock
//     private CommentService commentService;

//     @InjectMocks
//     private NewCommentCommandHandler newCommentCommandHandler;

//     @BeforeEach
//     public void setup() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     public void newCommentCommandHandler_validComment_returnSuccess() {
//         Comment comment = new Comment();
//         comment.setId(1);
//         comment.setTaskId(1);
//         comment.setCommenterId(1);
//         var time = Timestamp.valueOf("2024-05-18 00:00:00");
//         comment.setCreationDate(time);
//         comment.setMessage("Comment 1");

//         // Execute the command handler
//         ResponseEntity<Comment> response = newCommentCommandHandler.execute(comment);

//         // Assert the response
//         assertEquals(HttpStatus.CREATED, response.getStatusCode());
//     }

//     @Test
//     public void newCommentCommandHandler_InvalidComment_returnFail() {
//         Comment comment = new Comment();
//         comment.setId(1);
//         comment.setTaskId(1);
//         comment.setCommenterId(1);
//         var time = Timestamp.valueOf("2024-05-18 00:00:00");
//         comment.setCreationDate(time);
//         comment.setMessage(""); // Empty message | Invalid

//         // try {
//         // // Execute the command handler
//         // ResponseEntity<Comment> response = newCommentCommandHandler.execute(comment);
//         // fail("Expected ResponseStatusException was not thrown");
//         // } catch (ResponseStatusException ex) {
//         // // Assert the response status code
//         // assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
//         // // Optionally, assert the response body or message
//         // assertEquals("Empty Comment", ex.getReason());
//         // }
//     }
// }
