package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.services.PersonService;

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
    public List<Person> getAllPeople(){
        return service.getPeopleList();
    }
}
