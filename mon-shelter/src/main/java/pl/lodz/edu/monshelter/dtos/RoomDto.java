package pl.lodz.edu.monshelter.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomDto extends AbstractDto {

    private String name;
    private int slots;
    private int occupation;
    private Long institutionId;

    public RoomDto(Long id, String name, int slots, Long institutionId) {
        super(id);
        this.name = name;
        this.slots = slots;
        this.institutionId = institutionId;
    }
}
