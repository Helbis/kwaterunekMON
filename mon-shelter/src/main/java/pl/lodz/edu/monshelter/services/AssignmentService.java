package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Assignment;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.repositories.AssignmentRepository;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, RoomService roomService, PersonService personService) {
        this.assignmentRepository = assignmentRepository;

        Room room1 = roomService.getRoomList().get(0);
        Room room2 = roomService.getRoomList().get(1);
        Room room3 = roomService.getRoomList().get(2);

        Person person1 = personService.getPeopleList(true).get(0);
        Person person2 = personService.getPeopleList(true).get(1);
        Person person3 = personService.getPeopleList(true).get(2);
        Person person4 = personService.getPeopleList(true).get(3);
        Person person5 = personService.getPeopleList(true).get(4);

        ZoneId zoneId = ZoneId.of("UTC+1");
        List<Assignment> assignments = List.of(
                new Assignment(
                        ZonedDateTime.of(2023, 05, 05, 12, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 05, 10, 12, 0, 0, 0, zoneId), person1, room1),
                new Assignment(
                        ZonedDateTime.of(2023, 05, 01, 12, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 05, 05, 12, 0, 0, 0, zoneId), person2, room1),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 12, 12, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 14, 12, 0, 0, 0, zoneId), person3, room2),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 20, 12, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 21, 12, 0, 0, 0, zoneId), person4, room3),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 01, 12, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 10, 12, 0, 0, 0, zoneId), person5, room3)
        );
        assignmentRepository.saveAll(assignments);
    }

    public List<Assignment> getAssignmentsList() {
        return CollectionUtils.iterableToList(assignmentRepository.findAll());
    }

    public Assignment createAssignment(Assignment assignment) {
        // Check if person is active
        if (!assignment.getPerson().isActive()) {
            throw new ConflictException("User with id %s is inactive.".formatted(assignment.getPerson().getId()));
        }

        // Get all assignments conflicting with new assignment
        List<Assignment> assignmentList = assignment.getRoom().getAssignmentList();
        long conflictedAssignments = assignmentList.stream().filter(ass -> ass.isActive() && assignmentsConflicts(ass, assignment)).count();
        if (assignment.getRoom().getSlots() <= conflictedAssignments) {
            throw new ConflictException("Room with id %s have not enough slots in given period.".formatted(assignment.getRoom().getId()));
        }
        return assignmentRepository.save(assignment);
    }

    private boolean assignmentsConflicts(Assignment ass1, Assignment ass2) {
        return !(ass1.getFromTime().isBefore(ass2.getFromTime()) && ass1.getToTime().isBefore(ass2.getFromTime()) ||
                ass1.getFromTime().isAfter(ass2.getToTime()) && ass1.getToTime().isAfter(ass2.getToTime()));
    }
}
