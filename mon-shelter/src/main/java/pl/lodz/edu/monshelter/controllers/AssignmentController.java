package pl.lodz.edu.monshelter.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.lodz.edu.monshelter.dtos.AssignmentDto;
import pl.lodz.edu.monshelter.dtos.AssignmentEntryDto;
import pl.lodz.edu.monshelter.entities.Assignment;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.services.AssignmentService;
import pl.lodz.edu.monshelter.services.PersonService;
import pl.lodz.edu.monshelter.services.RoomService;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.util.List;

@RestController
@RequestMapping("api/assignment")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final PersonService personService;

    private final RoomService roomService;

    @Autowired
    public AssignmentController(AssignmentService service, PersonService personService, RoomService roomService) {
        this.assignmentService = service;
        this.personService = personService;
        this.roomService = roomService;
    }

    @GetMapping("all")
    public List<AssignmentEntryDto> getAllAssignments() {
        return DtoConverter.toAssignmentEntryDtoList(assignmentService.getAssignmentsList());
    }

    @PostMapping
    public AssignmentDto createAssignment(@Valid @RequestBody AssignmentDto assignmentDto) {
        Assignment assignment = DtoConverter.createAssignmentFromDto(assignmentDto);
        assignment.setPerson(personService.getPersonWithId(assignmentDto.getPersonId()));
        assignment.setRoom(roomService.getRoomWithId(assignmentDto.getRoomId()));
        return DtoConverter.toAssignmentDto(assignmentService.createAssignment(assignment));
    }

    @PutMapping
    public AssignmentEntryDto editAssignmentPerson(Long assignmentId, Long personId) {
        Person person = personService.getPersonWithId(personId);
        return DtoConverter.toAssignmentEntryDto(assignmentService.changeAssignmentPerson(assignmentId, person));
    }

    @DeleteMapping("{id}")
    public  void deleteAssignment(@PathVariable Long id){
        assignmentService.delete(id);
    }
}
