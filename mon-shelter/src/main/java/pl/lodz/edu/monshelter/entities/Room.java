package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private int slots;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "room")
    private List<Assignment> assignmentList;


    public Room(String name, int slots, Institution institution) {
        this.name = name;
        this.slots = slots;
        this.institution = institution;
    }

    public Room() {

    }
}
