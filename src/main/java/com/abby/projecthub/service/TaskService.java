package com.abby.projecthub.service;

import com.abby.projecthub.dto.TaskRequest;
import com.abby.projecthub.dto.TaskResponse;
import com.abby.projecthub.dto.UserResponse;
import com.abby.projecthub.entity.Project;
import com.abby.projecthub.entity.Task;
import com.abby.projecthub.entity.User;
import com.abby.projecthub.repository.ProjectRepository;
import com.abby.projecthub.repository.TaskRepository;
import com.abby.projecthub.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.abby.projecthub.exception.TaskNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       ProjectRepository projectRepository,
                       UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(
            Long projectId,
            TaskRequest request,
            String email) {

        User currentUser = getUser(email);

        Project project = projectRepository
                .findByIdAndOwner(projectId, currentUser)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        User assignee = userRepository
                .findById(request.getAssigneeId())
                .orElseThrow(() ->
                        new RuntimeException("Assignee not found"));

        Task task = new Task();

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setCreatedAt(LocalDateTime.now());
        task.setProject(project);
        task.setAssignee(assignee);

        Task savedTask = taskRepository.save(task);

        return convertToResponse(savedTask);
    }

    public List<TaskResponse> getProjectTasks(
            Long projectId,
            String email) {

        User currentUser = getUser(email);

        Project project = projectRepository
                .findByIdAndOwner(projectId, currentUser)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        return taskRepository.findByProject(project)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public TaskResponse getTask(
            Long taskId,
            String email) {

        User currentUser = getUser(email);

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        if (!task.getProject().getOwner().getId()
                .equals(currentUser.getId())) {

            throw new TaskNotFoundException("Task not found");
        }

        return convertToResponse(task);
    }

    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request,
            String email) {

        User currentUser = getUser(email);

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        if (!task.getProject().getOwner().getId()
                .equals(currentUser.getId())) {

            throw new TaskNotFoundException("Task not found");
        }

        User assignee = userRepository
                .findById(request.getAssigneeId())
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setAssignee(assignee);

        Task updatedTask = taskRepository.save(task);

        return convertToResponse(updatedTask);
    }

    public void deleteTask(
            Long taskId,
            String email) {

        User currentUser = getUser(email);

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new TaskNotFoundException("Task not found"));

        if (!task.getProject().getOwner().getId()
                .equals(currentUser.getId())) {

            throw new TaskNotFoundException("Task not found");
        }

        taskRepository.delete(task);
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private TaskResponse convertToResponse(Task task) {

        User assignee = task.getAssignee();

        UserResponse assigneeResponse = null;

        if (assignee != null) {
            assigneeResponse = new UserResponse(
                    assignee.getId(),
                    assignee.getName(),
                    assignee.getEmail(),
                    assignee.getRole()
            );
        }

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getCreatedAt(),
                assigneeResponse
        );
    }
}