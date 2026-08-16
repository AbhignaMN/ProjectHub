package com.abby.projecthub.controller;

import com.abby.projecthub.dto.ProjectRequest;
import com.abby.projecthub.dto.ProjectResponse;
import com.abby.projecthub.service.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ProjectResponse createProject(
            @RequestBody ProjectRequest request,
            Authentication authentication) {

        return projectService.createProject(
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<ProjectResponse> getMyProjects(
            Authentication authentication) {

        return projectService.getMyProjects(
                authentication.getName()
        );
    }

    @GetMapping("/{id}")
    public ProjectResponse getProject(
            @PathVariable Long id,
            Authentication authentication) {

        return projectService.getProject(
                id,
                authentication.getName()
        );
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @RequestBody ProjectRequest request,
            Authentication authentication) {

        return projectService.updateProject(
                id,
                request,
                authentication.getName()
        );
    }

    @DeleteMapping("/{id}")
    public String deleteProject(
            @PathVariable Long id,
            Authentication authentication) {

        projectService.deleteProject(
                id,
                authentication.getName()
        );

        return "Project deleted successfully";
    }
}