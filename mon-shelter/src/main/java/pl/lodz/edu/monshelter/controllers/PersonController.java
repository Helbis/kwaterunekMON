package pl.lodz.edu.monshelter.controllers;

import jakarta.validation.Valid;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("allActive")
    public List<PersonDto> getAllPeople() {
        return DtoConverter.toPersonDtoList(service.getPeopleList(false));
    }


    @GetMapping("all")
    public List<PersonDto> getAllPeopleIncludeInactive() {
        return DtoConverter.toPersonDtoList(service.getPeopleList(true));
    }

    @GetMapping("{id}")
    public PersonDto getPersonWithId(@PathVariable Long id) {
        return DtoConverter.toPersonDto(service.getPersonWithId(id));
    }

    @PostMapping
    public PersonDto createPerson(@RequestBody @Valid PersonDto person) {
        Person personEntity = DtoConverter.createPersonEntity(person);
        return DtoConverter.toPersonDto(service.addNewPerson(personEntity));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Long> deletePerson(@PathVariable Long id) {
        service.deletePerson(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    public PersonDto editPerson(@RequestBody PersonDto person) {
        Person personEntity = DtoConverter.createPersonEntity(person);
        return DtoConverter.toPersonDto(service.editPerson(personEntity));
    }
}
