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
    private Location location;

    @OneToMany(mappedBy = "room")
    private List<Assignment> assignmentList;


    public Room(String name, int slots, Location location) {
        this.name = name;
        this.slots = slots;
        this.location = location;
    }

    public Room() {

    }
}
