package com.talentpentagon.javabot.TaskControllerTest;

import com.talentpentagon.javabot.queryhandlers.GetTaskByIdCommandHandler;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.OffsetDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest()
public class GetTaskByIdCommandHandlerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private GetTaskByIdCommandHandler getTaskByIdCommandHandler;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getTaskByIdCommandHandler_validFilter_returnsTask() {
        TaskItem task = new TaskItem();
        task.setId(3);
        task.setAssignee(1);
        task.setTaskTitle("Task 1");
        task.setDescription("Task 1 description");
        task.setCreationDate(OffsetDateTime.now().plusDays(10));
        task.setDueDate(OffsetDateTime.now().plusDays(11));
        task.setPriority(1);
        task.setStatus("To do");

        when(taskService.getTaskById(task.getId())).thenReturn(new ResponseEntity<>(task, HttpStatus.OK));

        ResponseEntity<TaskItem> response = getTaskByIdCommandHandler.execute(task.getId());
        assertEquals(task, response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}
