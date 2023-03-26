package pl.lodz.edu.monshelter.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.edu.monshelter.entities.Assignment;

@Repository
public interface AssignmentRepository extends CrudRepository<Assignment, Long> {
}
