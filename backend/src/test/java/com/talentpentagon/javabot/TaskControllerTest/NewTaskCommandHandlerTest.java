package com.talentpentagon.javabot.TaskControllerTest;

import com.talentpentagon.javabot.commandhandlers.NewTaskCommandHandler;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.TaskService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.OffsetDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest()
public class NewTaskCommandHandlerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private NewTaskCommandHandler newTaskCommandHandler;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void newTaskCommandHandler_validTask_returnSuccess() {
        TaskItem task = new TaskItem();
        task.setId(1);
        task.setAssignee(1);
        task.setTaskTitle("Task 1");
        task.setDescription("Task 1 description");
        task.setCreationDate(OffsetDateTime.now().plusDays(10));
        task.setDueDate(OffsetDateTime.now().plusDays(11));
        task.setPriority(1);
        task.setStatus("To do");

        // Stub behavior of the task service
        Mockito.when(taskService.addTask(Mockito.any(TaskItem.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));

        ResponseEntity<TaskItem> response = newTaskCommandHandler.execute(task);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }
}