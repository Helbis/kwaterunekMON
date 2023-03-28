package pl.lodz.edu.monshelter.dtos;

import lombok.Data;

@Data
public class PersonDto extends AbstractDto{
    private String name;
    private String surname;
    private String rank;
    private String info;
    private String telephone;

}
