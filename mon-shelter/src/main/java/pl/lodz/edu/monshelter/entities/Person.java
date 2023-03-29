package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;


    @Column(nullable = false)
    private String surname;


    @Column(nullable = true)
    private String rank;


    @Column(nullable = true)
    private String info;

    @Column(nullable = true, unique = true)
    private String telephone;

    @OneToMany(mappedBy = "person")
    private List<Assignment> assignmentList;

    public Person(Long id, String name, String surname, String rank, String info, String telephone) {
        this(name, surname, rank, info, telephone);
        this.id = id;
    }

    public Person(String name, String surname, String rank, String info, String telephone) {
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.info = info;
        this.telephone = telephone;
    }

    public Person() {

    }
}
