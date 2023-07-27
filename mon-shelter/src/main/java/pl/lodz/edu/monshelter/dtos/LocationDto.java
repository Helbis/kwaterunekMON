package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LocationDto extends AbstractDto {

    @NotBlank(message = "Nazwa lokacji nie może być pusta")
    @Size(min = 3, message = "Nazwa lokacji musi mieć conajmniej 3 znaki")
    private String name;

    public LocationDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
