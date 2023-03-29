package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.repositories.PersonRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;

        List<Person> people = List.of(
                new Person("Jacek", "Grudzień", "Generał", null, "543543543"),
                new Person("Beata", "Wąs", "Cywil", null, null),
                new Person("Monika", "Piórko", "Cywil", "Kucharka", null),
                new Person("Adam", "Nowak", "Sierżant", null, null),
                new Person("Tom", "Binary", "Pułkownik", "Preferuje mieszkać sam", null),
                new Person("Piotr", "Salko", "Generał", null, null),
                new Person("Anna", "Piątek", "Cywil", "Higienistka", "928182321"),
                new Person("Ludwik", "Nowakowski", "Cywil", "Koserwator budynku", null)
        );
        repository.saveAll(people);
    }

    public List<Person> getPeopleList() {
        return CollectionUtils.iterableToList(repository.findAll());
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
        return repository.save(person);
    }
}
