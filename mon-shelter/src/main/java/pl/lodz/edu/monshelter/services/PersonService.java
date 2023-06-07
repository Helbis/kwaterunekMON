package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
import pl.lodz.edu.monshelter.repositories.PersonRepository;
import pl.lodz.edu.monshelter.util.CollectionUtils;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> getPeopleList(boolean includeInactive) {
        List<Person> personList = CollectionUtils.iterableToList(repository.findAll());
        if (!includeInactive) {
            personList = personList.stream().filter(Person::isActive).toList();
        }
        return personList;
    }

    public Person getPersonWithId(Long id) {
        Optional<Person> personOptional = repository.findById(id);
        return personOptional.orElseThrow(
                () -> new NotFoundException(String.format("Person with given id: %s not found.", id)));
    }

    public Person addNewPerson(Person person) {
        if (person.getId() != null) {
            Optional<Person> expected = repository.findById(person.getId());
            if (expected.isPresent()) {
                throw new ConflictException(String.format("Person with given id: %s already exists.", person.getId()));
            }
        }
        if (person.getTelephone() != null) {
            Optional<Person> expected = repository.findByTelephone(person.getTelephone());
            if (expected.isPresent()) {
                throw new ConflictException(
                        String.format("Person with given telephone: %s already exists.", person.getTelephone()));
            }
        }
        return repository.save(person);
    }

    public Person editPerson(Person personEntity) {
        Long id = personEntity.getId();
        Person personToEdit = repository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format("Person with given id: %s not found.", id)));
        copyProperties(personEntity, personToEdit);
        return repository.save(personToEdit);
    }

    private void copyProperties(Person sourceEntity, Person targetEntity) {
        targetEntity.setName(sourceEntity.getName());
        targetEntity.setSurname(sourceEntity.getSurname());
        targetEntity.setRank(sourceEntity.getRank());
        targetEntity.setInfo(sourceEntity.getInfo());
        targetEntity.setTelephone(sourceEntity.getTelephone());
    }

    public void deletePerson(Long id) {
        Person person = getPersonWithId(id);
        boolean conflicted = person.getAssignmentList().stream()
                .anyMatch(ass -> ass.getToTime().isAfter(ZonedDateTime.now()) && ass.isActive());
        if (conflicted) {
            throw new ConflictException(
                    "Person with id %s has planned assignments in future, cannot be deleted.".formatted(id));
        }
        repository.deleteById(id);
    }
}
