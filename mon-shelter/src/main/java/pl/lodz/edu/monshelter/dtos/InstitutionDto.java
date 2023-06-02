package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class InstitutionDto extends AbstractDto {

    @NotBlank
    @Size(min = 3, message = "Institution name must have at least 3 characters!")
    private String name;

    public InstitutionDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
