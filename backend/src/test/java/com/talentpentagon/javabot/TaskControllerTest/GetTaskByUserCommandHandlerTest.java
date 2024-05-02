package com.talentpentagon.javabot.TaskControllerTest;

import com.talentpentagon.javabot.queryhandlers.GetTaskByUserCommandHandler;
import com.talentpentagon.javabot.model.CustomUser;
import com.talentpentagon.javabot.model.TaskItem;
import com.talentpentagon.javabot.service.CustomUserDetailsService;
import com.talentpentagon.javabot.service.TaskService;
import com.talentpentagon.javabot.repository.CustomUserRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GetTaskByUserCommandHandlerTest {

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private CustomUserRepository customUserRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // load tasks by User Id
    @Test
    public void getTaskByTeamCommandHandler_validFilter_returnsTask() {

        TaskService taskServiceMock = mock(TaskService.class);

        // CustomUser object for test scenario
        CustomUser user = new CustomUser();
        user.setId(1);
        user.setTeamId(1);
        user.setRole("Employee");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPhonenumber("1234567890");

        // List of TaskItem objects for User
        List<TaskItem> taskItemList = new ArrayList<>();

        // TaskItem objects for the list of tasks
        TaskItem task1 = new TaskItem();
        task1.setId(1);
        task1.setTaskTitle("Task 1");
        task1.setDescription("Description for Task 1");
        taskItemList.add(task1);

        TaskItem task2 = new TaskItem();
        task2.setId(2);
        task2.setTaskTitle("Task 2");
        task2.setDescription("Description for Task 2");
        taskItemList.add(task2);

        // List of assigned tasks for the user
        user.setAssignedTasks(taskItemList);

        // Mock the behavior of the TaskService to return the list of TaskItem objects
        when(taskServiceMock.getTasksForUser(any(Integer.class), any(String.class), any(String.class)))
                .thenReturn(ResponseEntity.ok(taskItemList));

        // Create an instance of GetTaskByUserCommandHandler
        GetTaskByUserCommandHandler handler = new GetTaskByUserCommandHandler();

        // Set the mocked TaskService in the handler
        handler.setTaskService(taskServiceMock);

        // Call the execute method of the handler
        ResponseEntity<List<TaskItem>> response = handler.execute(1, "sortBy", "status");

        // Assert that the response status code is OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the expected list of TaskItem objects
        assertEquals(taskItemList, response.getBody());

    }
}
