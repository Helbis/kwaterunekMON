package pl.lodz.edu.monshelter.util;

import pl.lodz.edu.monshelter.dtos.AssignmentDto;
import pl.lodz.edu.monshelter.dtos.LocationDto;
import pl.lodz.edu.monshelter.dtos.PersonDto;
import pl.lodz.edu.monshelter.dtos.RoomDto;
import pl.lodz.edu.monshelter.entities.Assignment;
import pl.lodz.edu.monshelter.entities.Location;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.entities.Room;

import java.util.Collection;
import java.util.List;

public class DtoConverter {

    public static PersonDto toPersonDto(Person person) {
        return new PersonDto(person.getId(), person.getName(), person.getSurname(),
                person.getRank(), person.getInfo(), person.getTelephone(), person.isActive());
    }

    public static Person createPersonEntity(PersonDto personDto) {
        return new Person(personDto.getId(), personDto.getName(), personDto.getSurname(),
                personDto.getRank(), personDto.getInfo(), personDto.getTelephone(), personDto.isActive());
    }

    public static List<PersonDto> toPersonDtoList(Collection<Person> personCollection) {
        return personCollection.stream().map(DtoConverter::toPersonDto).toList();
    }

    public static Location createInstitutionEntity(LocationDto locationDto) {
        return new Location(locationDto.getId(), locationDto.getName());
    }

    public static LocationDto toInstitutionDto(Location entity) {
        return new LocationDto(entity.getId(), entity.getName());
    }

    public static List<LocationDto> toIntitutionDtoList(List<Location> institutionsList) {
        return institutionsList.stream().map(DtoConverter::toInstitutionDto).toList();
    }

    public static List<RoomDto> toRoomDtoList(List<Room> roomList) {
        return roomList.stream().map(DtoConverter::toRoomDto).toList();
    }

    public static RoomDto toRoomDto(Room room) {
        return new RoomDto(room.getId(), room.getName(), room.getSlots(), room.getLocation().getId());
    }

    public static Room createRoomEntity(RoomDto roomDto) {
        return new Room(roomDto.getName(), roomDto.getSlots(), null);
    }

    public static List<AssignmentDto> toAssignmentDtoList(List<Assignment> assignmentsList) {
        return assignmentsList.stream().map(DtoConverter::toAssignmentDto).toList();
    }

    public static AssignmentDto toAssignmentDto(Assignment assignment) {
        return new AssignmentDto(assignment.getId(), assignment.getFromTime(), assignment.getToTime(),
                assignment.getPerson().getId(), assignment.getRoom().getId(), assignment.isActive());
    }

    public static Assignment createAssignmentFromDto(AssignmentDto assignmentDto) {
        return new Assignment(assignmentDto.getFromTime(), assignmentDto.getToTime(), null, null);
    }
}
