package pl.lodz.edu.monshelter.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class InstitutionDto extends AbstractDto {

    private String name;

    public InstitutionDto(Long id, String name) {
        super(id);
        this.name = name;
    }
}
