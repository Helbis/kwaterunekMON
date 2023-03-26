package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String surname;

    private String rank;

    private String info;

    public Person(String name, String surname, String rank, String info) {
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.info = info;
    }
    public Person() {

    }
}
