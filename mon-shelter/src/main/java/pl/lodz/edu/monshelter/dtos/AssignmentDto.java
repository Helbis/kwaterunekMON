package pl.lodz.edu.monshelter.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.ZonedDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class AssignmentDto extends AbstractDto{

    private ZonedDateTime fromTime;
    private ZonedDateTime toTime;

    private Long personId;

    private Long roomId;

    public AssignmentDto(Long id, ZonedDateTime fromTime, ZonedDateTime toTime, Long personId, Long roomId) {
        super(id);
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.personId = personId;
        this.roomId = roomId;
    }
}
