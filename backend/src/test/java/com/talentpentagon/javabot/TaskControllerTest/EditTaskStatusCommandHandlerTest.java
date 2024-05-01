package com.talentpentagon.javabot.TaskControllerTest;

import com.talentpentagon.javabot.commandhandlers.EditTaskStatusCommandHandler;
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
public class EditTaskStatusCommandHandlerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private EditTaskStatusCommandHandler editTaskStatusCommandHandler;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void editTaskStatusCommandHandler_validTaskStatusChange_returnSuccess() {
        TaskItem task = new TaskItem();
        task.setId(2);
        task.setStatus("OnGoing");
        task.setCreationDate(OffsetDateTime.now().plusDays(0));
        task.setStatusChangeDate(OffsetDateTime.now().plusDays(10));

        // Stub behavior of the task service
        Mockito.when(taskService.updateTaskStatus(task.getId(), task.getStatus(), task.getStatusChangeDate()))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));

        ResponseEntity<TaskItem> response = editTaskStatusCommandHandler.execute(task);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}