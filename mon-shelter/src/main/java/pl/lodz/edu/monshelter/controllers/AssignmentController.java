package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.edu.monshelter.entities.Assignment;
import pl.lodz.edu.monshelter.services.AssignmentService;

import java.util.List;

@RestController
@RequestMapping("assignment")
public class AssignmentController {

    private final AssignmentService service;

    @Autowired
    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    @GetMapping("all")
    public List<Assignment> getAllAssignments() {
        return service.getAssignmentsList();
    }
}
