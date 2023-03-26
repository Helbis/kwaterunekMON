package pl.lodz.edu.monshelter.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.edu.monshelter.entities.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Long> {
}
