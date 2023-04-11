package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Institution;
import pl.lodz.edu.monshelter.entities.Room;
import pl.lodz.edu.monshelter.repositories.RoomRepository;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final InstitutionService institutionService;

    @Autowired
    public RoomService(RoomRepository repository, InstitutionService institutionService) {
        this.roomRepository = repository;
        this.institutionService = institutionService;

        Institution institution1 = institutionService.getInstitution(1L);
        Institution institution2 = institutionService.getInstitution(2L);

        List<Room> rooms = List.of(
                new Room("Pokój 1", 5, institution1),
                new Room("Pokój 1A", 3, institution1),
                new Room("Sypialnia", 2, institution1),
                new Room("Koszary A", 25, institution2),
                new Room("Koszary B", 25, institution2)
        );

        roomRepository.saveAll(rooms);
    }

    public List<Room> getRoomList() {
        return CollectionUtils.iterableToList(roomRepository.findAll());
    }
}
