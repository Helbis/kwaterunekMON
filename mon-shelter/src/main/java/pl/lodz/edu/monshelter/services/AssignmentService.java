package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Assignment;
import pl.lodz.edu.monshelter.repositories.AssignmentRepository;

import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, RoomService roomService,
            PersonService personService) {
        this.assignmentRepository = assignmentRepository;
    }

    public List<Assignment> getAssignmentsList() {
        return CollectionUtils.iterableToList(assignmentRepository.findAll());
    }

    public Assignment createAssignment(Assignment assignment) {
        // Check if person is active
        if (!assignment.getPerson().isActive()) {
            throw new ConflictException("Użytkownik o ID %s jest nieaktywny.".formatted(assignment.getPerson().getId()));
        }

        // Get all assignments conflicting with new assignment
        List<Assignment> assignmentList = assignment.getRoom().getAssignmentList();
        long conflictedAssignments = assignmentList.stream()
                .filter(ass -> ass.isActive() && assignmentsConflicts(ass, assignment)).count();
        if (assignment.getRoom().getSlots() <= conflictedAssignments) {
            throw new ConflictException(
                    "Pokój o ID %s ma niewystarczającą ilość miejsc w danym okresie.".formatted(assignment.getRoom().getId()));
        }
        return assignmentRepository.save(assignment);
    }

    private boolean assignmentsConflicts(Assignment ass1, Assignment ass2) {
        return !(ass1.getFromTime().isBefore(ass2.getFromTime()) && ass1.getToTime().isBefore(ass2.getFromTime()) ||
                ass1.getFromTime().isAfter(ass2.getToTime()) && ass1.getToTime().isAfter(ass2.getToTime()));
    }
}
