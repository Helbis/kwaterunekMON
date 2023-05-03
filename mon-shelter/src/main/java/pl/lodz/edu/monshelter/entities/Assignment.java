package pl.lodz.edu.monshelter.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;

@Entity
@Data
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private ZonedDateTime fromTime;

    private ZonedDateTime toTime;

    private boolean active = true;

    @ManyToOne
    private Person person;

    @ManyToOne
    private Room room;

    public Assignment(ZonedDateTime fromTime, ZonedDateTime toTime, Person person, Room room) {
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.person = person;
        this.room = room;
    }

    public Assignment() {

    }
}
