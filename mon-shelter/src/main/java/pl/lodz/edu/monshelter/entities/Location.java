package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "location")
    private List<Room> roomList = new ArrayList<>();

    public Location(String name) {
        this.name = name;
    }

    public Location() {

    }

    public Location(Long id, String name) {
        this(name);
        this.id = id;
    }
}
