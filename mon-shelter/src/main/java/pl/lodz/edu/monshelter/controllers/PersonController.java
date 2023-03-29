package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.edu.monshelter.dtos.PersonDto;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.services.PersonService;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.util.List;

@RestController
@RequestMapping("person")
public class PersonController {

    private final PersonService service;

    @Autowired
    public PersonController(PersonService service) {
        this.service = service;
    }

    @GetMapping("all")
    public List<PersonDto> getAllPeople() {
        return DtoConverter.toPersonDtoList(service.getPeopleList());
    }

    @GetMapping("{id}")
    public PersonDto getPersonWithId(@PathVariable Long id) {
        return DtoConverter.toPersonDto(service.getPersonWithId(id));
    }

    @PostMapping
    public PersonDto createPerson(@RequestBody PersonDto person) {
        Person personEntity = DtoConverter.createPersonEntity(person);
        return DtoConverter.toPersonDto(service.addNewPerson(personEntity));
    }
}
