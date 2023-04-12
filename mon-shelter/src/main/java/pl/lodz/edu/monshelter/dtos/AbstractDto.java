package pl.lodz.edu.monshelter.dtos;

import lombok.Builder;
import lombok.Data;

@Data
public class AbstractDto {
    private Long id;

    public AbstractDto() {
    }

    public AbstractDto(Long id) {
        this.id = id;
    }
}
