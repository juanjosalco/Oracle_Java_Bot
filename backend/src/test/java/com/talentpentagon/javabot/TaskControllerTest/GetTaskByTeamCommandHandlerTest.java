// package com.talentpentagon.javabot.TaskControllerTest;

// import com.talentpentagon.javabot.queryhandlers.GetTaskByTeamHandler;
// import com.talentpentagon.javabot.model.CustomUser;
// import com.talentpentagon.javabot.model.TaskItem;
// import com.talentpentagon.javabot.model.Team;
// import com.talentpentagon.javabot.service.TeamService;
// import com.talentpentagon.javabot.repository.TeamRepository;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// public class GetTaskByTeamCommandHandlerTest {

// @Mock
// private TeamService teamService;

// @Mock
// private TeamRepository teamRepository;

// @InjectMocks
// private GetTaskByTeamHandler getTaskByTeamHandler;

// @BeforeEach
// public void setup() {
// MockitoAnnotations.openMocks(this);
// }

// @Test
// public void getTaskByTeamCommandHandler_validFilter_returnsTask() {
// // Create a team object for the test scenario
// Team team = new Team();
// team.setId(1); // Set the team ID
// team.setName("Test Team"); // Set the team name
// team.setDescription("Description for Test Team"); // Set the team description

// // Create a list of members for the team
// List<CustomUser> members = new ArrayList<>();

// // Create a CustomUser object for the test scenario
// CustomUser user = new CustomUser();
// user.setId(1);
// user.setTeamId(1);
// user.setRole("Employee");
// user.setFirstName("John");
// user.setLastName("Doe");
// user.setPhonenumber("1234567890");
// members.add(user);

// // Set the list of members for the team
// team.setMembers(members);

// // Create a list of TaskItem objects for mocking the
// teamService.getTeamTasks()
// // method
// List<TaskItem> taskItemList = new ArrayList<>();

// // Create some TaskItem objects and add them to the list
// TaskItem task1 = new TaskItem();
// task1.setId(1);
// task1.setTaskTitle("Task 1");
// task1.setDescription("Description for Task 1");
// // Set other properties for task1 as needed
// taskItemList.add(task1);

// TaskItem task2 = new TaskItem();
// task2.setId(2);
// task2.setTaskTitle("Task 2");
// task2.setDescription("Description for Task 2");
// // Set other properties for task2 as needed
// taskItemList.add(task2);

// // Set the list of assigned tasks for the user
// user.setAssignedTasks(taskItemList);

// // Mock the teamService.getTeamTasks() method to return the list of TaskItem
// // objects
// when(teamService.getTeamTasks(any(Integer.class), any(String.class),
// any(String.class)))
// .thenReturn(taskItemList);

// // Mock the behavior of teamRepository to return a team when findById is
// called
// when(teamRepository.findById(1)).thenReturn(Optional.of(team));

// // Call the execute method of the getTaskByTeamHandler and capture the
// response
// ResponseEntity<List<TaskItem>> response = getTaskByTeamHandler.execute(1,
// "Priority", "In Progress");

// // Assert that the response contains the expected list of TaskItem objects
// assertEquals(taskItemList, response.getBody());
// assertEquals(HttpStatus.OK, response.getStatusCode());
// }
// }
