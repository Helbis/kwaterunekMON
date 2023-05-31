package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(mappedBy = "institution")
    private List<Room> roomList = new ArrayList<>();

    public Institution(String name) {
        this.name = name;
    }

    public Institution() {

    }

    public Institution(Long id, String name) {
        this(name);
        this.id = id;
    }
}
