package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

/*
Sample JSON output
{
    "name":"Tom",
    "surname":"Binary",
    "rank":"Pułkownik",
    "info":"Preferuje mieszkać sam",
    "telephone":"543543543"
}
 */

@Data
@EqualsAndHashCode(callSuper = true)
public class PersonDto extends AbstractDto {
    @NotBlank
    private String name;
    @NotBlank
    private String surname;
    private String rank;
    private String info;
    private String telephone;
    private boolean active = true;

    public PersonDto(Long id, String name, String surname, String rank, String info, String telephone, boolean active) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.info = info;
        this.telephone = telephone;
        this.active = active;
    }
}


