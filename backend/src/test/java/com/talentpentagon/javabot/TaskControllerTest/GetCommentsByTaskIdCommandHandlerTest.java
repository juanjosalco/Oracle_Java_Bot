package com.talentpentagon.javabot.TaskControllerTest;

import com.talentpentagon.javabot.queryhandlers.GetCommentsByTaskIdCommandHandler;
import com.talentpentagon.javabot.model.Comment;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.repository.CommentRepository;
import com.talentpentagon.javabot.service.CommentService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
// import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.scheduling.config.Task;

public class GetCommentsByTaskIdCommandHandlerTest {
    @Mock
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getCommentsByTaskIdCommandHandler_validFilter_returnsComment() {
        CommentService commentServiceMock = Mockito.mock(CommentService.class);

        // Task for test scenario
        TaskItem task = new TaskItem();
        task.setId(1);
        task.setTaskTitle("Task 1");
        task.setDescription("Description for Task 1");

        // List of Comment objects for Task
        List<Comment> commentList = new ArrayList<>();

        // Comment objects for the list of comments
        // Comment1
        Comment comment1 = new Comment();
        comment1.setId(1);
        comment1.setCommenterId(1);
        comment1.setTaskId(1);
        var time1 = Timestamp.valueOf("2024-05-18 00:00:00");
        comment1.setCreationDate(time1);
        comment1.setMessage("Comment 1");

        // Comment2
        Comment comment2 = new Comment();
        comment2.setId(2);
        comment2.setCommenterId(2);
        comment2.setTaskId(1);
        var time2 = Timestamp.valueOf("2024-05-18 00:00:00");
        comment2.setCreationDate(time2);
        comment2.setMessage("Comment 2");

        // Add comments to the list
        commentList.add(comment1);
        commentList.add(comment2);

        // Mock the behavior of the CommentService to return the list of Comment objects
        Mockito.when(commentServiceMock.getCommentsByTaskId(1)).thenReturn(ResponseEntity.ok(commentList));

        // Create an instance of GetCommentsByTaskIdCommandHandler
        GetCommentsByTaskIdCommandHandler handler = new GetCommentsByTaskIdCommandHandler();

        // Set the mocked CommentService in the handler
        handler.setCommentService(commentServiceMock);

        // Call the execute method of the handler
        ResponseEntity<List<Comment>> response = handler.execute(1);

        // Assert that the response status code is OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the expected list of Comment objects
        assertEquals(commentList, response.getBody());
    }
}