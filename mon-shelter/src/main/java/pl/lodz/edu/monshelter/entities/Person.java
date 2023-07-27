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

    @Column(nullable = false)
    private String institution;

    @Column(nullable = true)
    private String info;

    @Column(nullable = true, unique = true)
    private String telephone;

    @Column(nullable = false)
    private boolean active = true;

    @OneToMany(mappedBy = "person")
    private List<Assignment> assignmentList;

    public Person(Long id, String name, String surname, String rank, String institution, String info, String telephone, boolean active) {
        this(name, surname, rank, institution, info, telephone, active);
        this.id = id;
    }

    public Person(String name, String surname, String rank, String institution, String info, String telephone, boolean active) {
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.institution=institution;
        this.info = info;
        this.telephone = telephone;
        this.active = active;
    }

    public Person() {

    }
}
