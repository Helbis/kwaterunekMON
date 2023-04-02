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
                new Person("Jacek", "Grudzień", "Generał", null, "543543543",true),
                new Person("Beata", "Wąs", "Cywil", null, null,true),
                new Person("Monika", "Piórko", "Cywil", "Kucharka", null,true),
                new Person("Adam", "Nowak", "Sierżant", null, null,true),
                new Person("Tom", "Binary", "Pułkownik", "Preferuje mieszkać sam", null,true),
                new Person("Piotr", "Salko", "Generał", null, null,true),
                new Person("Anna", "Piątek", "Cywil", "Higienistka", "928182321",true),
                new Person("Ludwik", "Nowakowski", "Cywil", "Koserwator budynku", null,true),
                new Person("Bob", "Nieaktywny", null,"Wyjechał z kraju",null,false)
        );
        repository.saveAll(people);
    }

    public List<Person> getPeopleList(boolean includeInactive) {
        List<Person> personList = CollectionUtils.iterableToList(repository.findAll());
        if(!includeInactive){
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
}
