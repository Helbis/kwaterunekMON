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

        // Data init
        List<Person> people = List.of(
                new Person("Jacek", "Grudzień", "Generał", "Instytucja 1", null, "543-543-543", true),
                new Person("Beata", "Wąs", "Cywil", "Instytucja 1", null, null, true),
                new Person("Monika", "Piórko", "Cywil", "Instytucja 1", "Kucharka", null, true),
                new Person("Adam", "Nowak", "Sierżant", "Instytucja 2", null, null, true),
                new Person("Tom", "Binary", "Pułkownik", "Instytucja 2", "Preferuje mieszkać sam", null, true),
                new Person("Piotr", "Salko", "Generał", "Instytucja 2", null, null, true),
                new Person("Anna", "Piątek", "Cywil", "Instytucja 2", "Higienistka", "928-182-321", true),
                new Person("Ludwik", "Nowakowski", "Cywil", "Instytucja 3", "Koserwator budynku", null, true),
                new Person("Bob", "Nieaktywny", null, "Instytucja 3", "Wyjechał z kraju", null, false)
        );
        repository.saveAll(people);

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
                () -> new NotFoundException(String.format("Osoba o ID: %s nie odnaleziona.", id)));
    }

    public Person addNewPerson(Person person) {
        if (person.getId() != null) {
            Optional<Person> expected = repository.findById(person.getId());
            if (expected.isPresent()) {
                throw new ConflictException(String.format("Osoba o ID: %s już istnieje.", person.getId()));
            }
        }
        if (person.getTelephone() != null) {
            Optional<Person> expected = repository.findByTelephone(person.getTelephone());
            if (expected.isPresent()) {
                throw new ConflictException(
                        String.format("Osoba z podanym numerem telefonu: %s już istnieje.", person.getTelephone()));
            }
        }
        return repository.save(person);
    }

    public Person editPerson(Person personEntity) {
        Long id = personEntity.getId();
        Person personToEdit = repository.findById(id).orElseThrow(
                () -> new NotFoundException(String.format("Osoba o podanym ID: %s nie odnaleziona.", id)));
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
                    "Osoba o ID %s ma zaplanowane przyszłe zameldowania, nie może zostać usunięta.".formatted(id));
        }
        repository.deleteById(id);
    }
}
