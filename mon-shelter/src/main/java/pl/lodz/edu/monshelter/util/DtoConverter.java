package pl.lodz.edu.monshelter.util;

import pl.lodz.edu.monshelter.dtos.PersonDto;
import pl.lodz.edu.monshelter.entities.Person;

import java.util.Collection;
import java.util.List;

public class DtoConverter {

    public static PersonDto toPersonDto(Person person) {
        return new PersonDto(person.getId(), person.getName(), person.getSurname(),
                person.getRank(), person.getInfo(), person.getTelephone(),person.isActive());
    }

    public static Person createPersonEntity(PersonDto personDto) {
        return new Person(personDto.getId(), personDto.getName(), personDto.getSurname(),
                personDto.getRank(), personDto.getInfo(), personDto.getTelephone(),personDto.isActive());
    }

    public static List<PersonDto> toPersonDtoList(Collection<Person> personCollection) {
        return personCollection.stream().map(DtoConverter::toPersonDto).toList();
    }

}
