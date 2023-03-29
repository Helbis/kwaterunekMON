package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    private final RoomService roomService;
    private final PersonService personService;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, RoomService roomService, PersonService personService) {
        this.assignmentRepository = assignmentRepository;
        this.roomService = roomService;
        this.personService = personService;

        Room room1 = roomService.getRoomList().get(0);
        Room room2 = roomService.getRoomList().get(1);
        Room room3 = roomService.getRoomList().get(2);

        Person person1 = personService.getPeopleList().get(0);
        Person person2 = personService.getPeopleList().get(1);
        Person person3 = personService.getPeopleList().get(2);
        Person person4 = personService.getPeopleList().get(3);
        Person person5 = personService.getPeopleList().get(4);

        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        ZoneId zoneId = ZoneId.of("UTC+1");
        List<Assignment> assignments = List.of(
                new Assignment(
                        ZonedDateTime.of(2023, 05, 05, 0, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 05, 10, 0, 0, 0, 0, zoneId), person1, room1),
                new Assignment(
                        ZonedDateTime.of(2023, 05, 01, 0, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 05, 05, 0, 0, 0, 0, zoneId), person2, room1),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 12, 0, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 14, 0, 0, 0, 0, zoneId), person3, room2),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 20, 0, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 21, 0, 0, 0, 0, zoneId), person4, room3),
                new Assignment(
                        ZonedDateTime.of(2023, 07, 01, 0, 0, 0, 0, zoneId),
                        ZonedDateTime.of(2023, 07, 10, 0, 0, 0, 0, zoneId), person5, room3)
        );
        assignmentRepository.saveAll(assignments);
    }

    public List<Assignment> getAssignmentsList() {
        return CollectionUtils.iterableToList(assignmentRepository.findAll());
    }

}
