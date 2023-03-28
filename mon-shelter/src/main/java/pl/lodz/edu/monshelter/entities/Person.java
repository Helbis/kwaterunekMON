package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.lang.NonNull;

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

    public Person(String name, String surname, String rank, String info) {
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.info = info;
    }
    public Person() {

    }
}
