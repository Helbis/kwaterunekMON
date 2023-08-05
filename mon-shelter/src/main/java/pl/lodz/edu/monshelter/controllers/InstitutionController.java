package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lodz.edu.monshelter.dtos.LocationDto;
import pl.lodz.edu.monshelter.entities.Location;
import pl.lodz.edu.monshelter.services.LocationService;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.util.List;

@RestController
@RequestMapping("institution")
public class InstitutionController {

    private final LocationService service;

    @Autowired
    public InstitutionController(LocationService service) {
        this.service = service;
    }

    @GetMapping("all")
    public List<LocationDto> getAllInstitutions() {
        return
                DtoConverter.toIntitutionDtoList(service.getLocationList());
    }

    @PostMapping()
    public LocationDto createInstitution(@RequestBody @Validated LocationDto locationDto) {
        Location entity = service.createLocation(DtoConverter.createInstitutionEntity(locationDto));
        return DtoConverter.toInstitutionDto(entity);
    }
}
