package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.Null;
import lombok.Builder;
import lombok.Data;

@Data
public class AbstractDto {
    @Null
    private Long id;

    public AbstractDto() {
    }

    public AbstractDto(Long id) {
        this.id = id;
    }
}
