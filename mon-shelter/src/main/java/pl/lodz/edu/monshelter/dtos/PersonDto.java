package pl.lodz.edu.monshelter.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Value;

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

    @NotBlank(message = "Imię nie może być puste")
    @Size(min = 2, message = "Imię powinno mieć conajmniej 2 znaki")
    private String name;

    @NotBlank(message = "Nazwisko nie może być puste")
    @Size(min = 2, message = "Nazwisko powinno mieć conajmniej 2 znaki")
    private String surname;

    // Nullable
    private String rank;

    // Nullable
    private String info;

    @Pattern(regexp = "^(\\+[0-9]{2})?[\\s]?[0-9]{3}[-\\s]?[0-9]{3}[-\\s]?[0-9]{3}$",
            message = "Podaj numer w formacie: 111-222-333 lub +48 111-222-333")
    private String telephone;

    // Nullable
    private boolean active;

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


