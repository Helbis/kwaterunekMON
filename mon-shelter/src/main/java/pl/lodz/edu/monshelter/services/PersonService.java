package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Person;
import pl.lodz.edu.monshelter.repositories.PersonRepository;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;

        List<Person> people = List.of(
                new Person("Jacek", "Grudzień", "Generał",null),
                new Person("Beata", "Wąs", "Cywil",null),
                new Person("Monika", "Piórko", "Cywil","Kucharka"),
                new Person("Adam", "Nowak", "Sierżant",null),
                new Person("Tom", "Binary", "Pułkownik","Preferuje mieszkać sam"),
                new Person("Piotr", "Salko", "Generał",null),
                new Person("Anna", "Piątek", "Cywil","Higienistka"),
                new Person("Ludwik", "Nowakowski", "Cywil", "Koserwator budynku")
        );
        repository.saveAll(people);
    }

    public List<Person> getPeopleList() {
        return CollectionUtils.iterableToList(repository.findAll());
    }

}
