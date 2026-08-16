package com.abby.projecthub.service;

import com.abby.projecthub.dto.ProjectRequest;
import com.abby.projecthub.dto.ProjectResponse;
import com.abby.projecthub.dto.UserResponse;
import com.abby.projecthub.entity.Project;
import com.abby.projecthub.entity.User;
import com.abby.projecthub.repository.ProjectRepository;
import com.abby.projecthub.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.abby.projecthub.exception.ProjectNotFoundException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public ProjectResponse createProject(ProjectRequest request, String email) {

        User user = getUser(email);

        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setOwner(user);

        Project savedProject = projectRepository.save(project);

        return convertToResponse(savedProject);
    }

    public List<ProjectResponse> getMyProjects(String email) {

        User user = getUser(email);

        return projectRepository.findByOwner(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public ProjectResponse getProject(Long id, String email) {

        User user = getUser(email);

        Project project = projectRepository.findByIdAndOwner(id, user)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));

        return convertToResponse(project);
    }

    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request,
            String email) {

        User user = getUser(email);

        Project project = projectRepository.findByIdAndOwner(id, user)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));

        project.setName(request.getName());
        project.setDescription(request.getDescription());

        Project updatedProject = projectRepository.save(project);

        return convertToResponse(updatedProject);
    }

    public void deleteProject(Long id, String email) {

        User user = getUser(email);

        Project project = projectRepository.findByIdAndOwner(id, user)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));

        projectRepository.delete(project);
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private ProjectResponse convertToResponse(Project project) {

        User user = project.getOwner();

        UserResponse ownerResponse = new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );

        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                ownerResponse
        );
    }
}