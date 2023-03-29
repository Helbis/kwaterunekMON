package pl.lodz.edu.monshelter.dtos;

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
    private String name;
    private String surname;
    private String rank;
    private String info;
    private String telephone;

    public PersonDto(Long id, String name, String surname, String rank, String info, String telephone) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.rank = rank;
        this.info = info;
        this.telephone = telephone;
    }
}


