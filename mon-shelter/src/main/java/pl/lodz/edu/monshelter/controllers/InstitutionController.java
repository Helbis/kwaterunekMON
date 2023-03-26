package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.edu.monshelter.entities.Institution;
import pl.lodz.edu.monshelter.services.InstitutionService;

import java.util.List;

@RestController
@RequestMapping("institution")
public class InstitutionController {

    private final InstitutionService service;

    @Autowired
    public InstitutionController(InstitutionService service) {
        this.service = service;
    }

    @GetMapping("all")
    public List<Institution> getAllInstitutions() {
        return service.getInstitutionsList();
    }

}
