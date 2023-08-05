package pl.lodz.edu.monshelter.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.edu.monshelter.entities.Room;

import java.util.List;

@Repository
public interface RoomRepository extends CrudRepository <Room,Long> {

    List<Room> findAllByLocationId(Long id);
}
