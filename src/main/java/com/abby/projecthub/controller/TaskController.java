package com.abby.projecthub.controller;

import com.abby.projecthub.dto.TaskRequest;
import com.abby.projecthub.dto.TaskResponse;
import com.abby.projecthub.service.TaskService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/projects/{projectId}/tasks")
    public TaskResponse createTask(
            @PathVariable Long projectId,
            @RequestBody TaskRequest request,
            Authentication authentication) {

        return taskService.createTask(
                projectId,
                request,
                authentication.getName()
        );
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskResponse> getProjectTasks(
            @PathVariable Long projectId,
            Authentication authentication) {

        return taskService.getProjectTasks(
                projectId,
                authentication.getName()
        );
    }

    @GetMapping("/tasks/{taskId}")
    public TaskResponse getTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        return taskService.getTask(
                taskId,
                authentication.getName()
        );
    }

    @PutMapping("/tasks/{taskId}")
    public TaskResponse updateTask(
            @PathVariable Long taskId,
            @RequestBody TaskRequest request,
            Authentication authentication) {

        return taskService.updateTask(
                taskId,
                request,
                authentication.getName()
        );
    }

    @DeleteMapping("/tasks/{taskId}")
    public String deleteTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        taskService.deleteTask(
                taskId,
                authentication.getName()
        );

        return "Task deleted successfully";
    }
}