package pl.lodz.edu.monshelter.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.services.RoomService;

import java.util.List;

@RestController
@RequestMapping("room")
public class RoomController {

    private final RoomService service;

    @Autowired
    public RoomController(RoomService service) {
        this.service = service;
    }

    @GetMapping("all")
    public List<Room> getAllRooms() {
        return service.getRoomList();
    }
}
