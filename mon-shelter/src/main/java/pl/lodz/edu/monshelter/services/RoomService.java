package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.entities.Location;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final LocationService locationService;


    @Autowired
    public RoomService(RoomRepository repository, LocationService locationService) {
        this.roomRepository = repository;

        //Data init
        this.locationService = locationService;

        Location location1 = locationService.getLocation(1L);
        Location location2 = locationService.getLocation(2L);

        List<Room> rooms = List.of(
                new Room("Pokój 1", 5, location1),
                new Room("Pokój 1A", 3, location1),
                new Room("Sypialnia", 2, location1),
                new Room("Koszary A", 25, location2),
                new Room("Koszary B", 25, location2)
        );

        roomRepository.saveAll(rooms);
    }

    public List<Room> getRoomList() {
        return CollectionUtils.iterableToList(roomRepository.findAll());
    }

    public Room createRoom(Room roomEntity) {
        return roomRepository.save(roomEntity);
    }

    public Room getRoomWithId(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(
                () -> new NotFoundException(String.format("Pokój o ID: %s nie odnaleziony.", roomId)));
    }

    public List<Room> getRoomList(Long locationId) {
        return roomRepository.findAllByLocationId(locationId);
    }
}
