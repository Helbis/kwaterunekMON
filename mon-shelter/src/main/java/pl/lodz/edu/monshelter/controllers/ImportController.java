package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.edu.monshelter.dtos.PersonDto;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.services.PersonService;
import pl.lodz.edu.monshelter.util.CsvUtil;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("import")
public class ImportController {

    private PersonService personService;

    @Autowired
    public ImportController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("upload")
    public int uploadFile(@RequestParam("file") MultipartFile file) {
        List<Person> people = CsvUtil.parseCsvFile(file);
        for (Person person : people) {
            personService.addNewPerson(person);
        }
        return people.size();
    }
}
