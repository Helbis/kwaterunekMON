package pl.lodz.edu.monshelter.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.ZonedDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class AssignmentEntryDto extends AbstractDto{

    private final ZonedDateTime from;
    private final ZonedDateTime to;
    private final String rank;
    private final String person;
    private final int floor;
    private final String institution;
    private final String location;
    private final String room;

    public AssignmentEntryDto(Long id, ZonedDateTime fromTime, ZonedDateTime toTime, String rank, String person, int floor, String institution, String location, String room){
        super(id);
        this.from = fromTime;
        this.to = toTime;
        this.rank = rank;
        this.person = person;
        this.floor = floor;
        this.institution = institution;
        this.location = location;
        this.room = room;
    }
    
}
