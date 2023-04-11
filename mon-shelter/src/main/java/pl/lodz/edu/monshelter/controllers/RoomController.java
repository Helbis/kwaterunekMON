package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.edu.monshelter.dtos.RoomDto;
import pl.lodz.edu.monshelter.entities.Institution;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.services.InstitutionService;
import pl.lodz.edu.monshelter.services.RoomService;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {

    private final RoomService service;
    private final InstitutionService institutionService;

    @Autowired
    public RoomController(RoomService service, InstitutionService institutionService) {
        this.service = service;
        this.institutionService = institutionService;
    }

    @GetMapping("all")
    public List<RoomDto> getAllRooms() {
        return DtoConverter.toRoomDtoList(service.getRoomList());
    }

    @PostMapping
    public RoomDto createRoom(RoomDto roomDto) {
        Room roomEntity = DtoConverter.createRoomEntity(roomDto);
        Institution institution = institutionService.getInstitution(roomDto.getInstitutionId());
        roomEntity.setInstitution(institution);
        return DtoConverter.toRoomDto(service.createRoom(roomEntity));
    }
}
