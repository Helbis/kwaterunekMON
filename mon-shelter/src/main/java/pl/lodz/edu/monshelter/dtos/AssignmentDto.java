package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.ZonedDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class AssignmentDto extends AbstractDto{
    
    @NotNull(message = "Musisz wybrać okres zameldowania")
    private ZonedDateTime fromTime;
    @NotNull(message = "Musisz wybrać okres zameldowania")
    private ZonedDateTime toTime;
    @NotNull(message = "Musisz wybrać osobę")
    private Long personId;
    @NotNull(message = "Musisz wybrać pokój")
    private Long roomId;
    private boolean active;

    public AssignmentDto(Long id, ZonedDateTime fromTime, ZonedDateTime toTime, Long personId, Long roomId, boolean active) {
        super(id);
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.personId = personId;
        this.roomId = roomId;
        this.active = active;
    }
}
