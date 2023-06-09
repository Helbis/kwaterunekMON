package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lodz.edu.monshelter.dtos.InstitutionDto;
import pl.lodz.edu.monshelter.entities.Institution;
import pl.lodz.edu.monshelter.services.InstitutionService;
import pl.lodz.edu.monshelter.util.DtoConverter;

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
    public List<InstitutionDto> getAllInstitutions() {
        return
                DtoConverter.toIntitutionDtoList(service.getInstitutionsList());
    }

    @PostMapping()
    public InstitutionDto createInstitution(@RequestBody @Validated InstitutionDto institutionDto) {
        Institution entity = service.createInstitution(DtoConverter.createInstitutionEntity(institutionDto));
        return DtoConverter.toInstitutionDto(entity);
    }
}
