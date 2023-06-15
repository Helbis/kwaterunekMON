package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class InstitutionDto extends AbstractDto {

    @NotBlank(message = "Nazwa instytucji nie może być pusta")
    @Size(min = 3, message = "Nazwa Instytucji musi mieć conajmniej 3 znaki")
    private String name;

    public InstitutionDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
