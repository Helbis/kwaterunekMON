package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.lodz.edu.monshelter.dtos.RoomDto;
import pl.lodz.edu.monshelter.entities.Location;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.services.LocationService;
import pl.lodz.edu.monshelter.services.RoomService;
import pl.lodz.edu.monshelter.util.DtoConverter;

import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {

    private final RoomService service;
    private final LocationService locationService;

    @Autowired
    public RoomController(RoomService service, LocationService locationService) {
        this.service = service;
        this.locationService = locationService;
    }

    @GetMapping("all")
    public List<RoomDto> getAllRooms() {
        return DtoConverter.toRoomDtoList(service.getRoomList());
    }

    @GetMapping("{locationId}")
    public List<RoomDto> getRoomsByLocationId(@PathVariable Long locationId){
        return DtoConverter.toRoomDtoList(service.getRoomList(locationId));
    }

    @PostMapping
    public RoomDto createRoom(@RequestBody @Validated RoomDto roomDto) {
        Room roomEntity = DtoConverter.createRoomEntity(roomDto);
        Location location = locationService.getLocation(roomDto.getLocationId());
        roomEntity.setLocation(location);
        return DtoConverter.toRoomDto(service.createRoom(roomEntity));
    }
}
