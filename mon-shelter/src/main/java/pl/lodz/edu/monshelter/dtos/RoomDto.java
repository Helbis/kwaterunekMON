package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomDto extends AbstractDto {

    @NotBlank
    @Size(min = 2, message = "Room name must have at least 2 characters!")
    private String name;

    @NotNull(message = "Provide slots number!")
    @Min(value = 1,message = "Room must have at least 1 slot!")
    private int slots;

    private int occupation;

    @NotNull(message = "Provide institution id!")
    private Long institutionId;

    public RoomDto(Long id, String name, int slots, Long institutionId) {
        super(id);
        this.name = name;
        this.slots = slots;
        this.institutionId = institutionId;
    }
}
