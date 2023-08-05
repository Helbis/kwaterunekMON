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

    @NotBlank(message = "Nazwa pokoju nie może być pusta")
    @Size(min = 2, message = "Nazwa pokoju powinna mieć conajmniej 2 znaki")
    private String name;

    @NotNull(message = "Podaj liczbę miejsc")
    @Min(value = 1,message = "Pokój musi mieć przynajmniej jedno miejsce")
    private int slots;

    @Min(value = 0, message = "Piętro nie może być mniejsze niż 0")
    private int floor;

    private int occupation;

    @NotNull(message = "Nie podano ID instytucji")
    private Long locationId;

    public RoomDto(Long id, String name, int slots, Long locationId) {
        super(id);
        this.name = name;
        this.slots = slots;
        this.locationId = locationId;
    }
}
