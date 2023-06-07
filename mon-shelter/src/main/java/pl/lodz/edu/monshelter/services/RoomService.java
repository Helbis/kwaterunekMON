package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository repository, InstitutionService institutionService) {
        this.roomRepository = repository;
    }

    public List<Room> getRoomList() {
        return CollectionUtils.iterableToList(roomRepository.findAll());
    }

    public Room createRoom(Room roomEntity) {
        return roomRepository.save(roomEntity);
    }

    public Room getRoomWithId(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(
                () -> new NotFoundException(String.format("Room with given id: %s not found.", roomId)));
    }

    public List<Room> getRoomList(Long institutionId) {
        return roomRepository.findAllByInstitutionId(institutionId);
    }
}
