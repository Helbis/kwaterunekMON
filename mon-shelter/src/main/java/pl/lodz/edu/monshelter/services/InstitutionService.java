package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Institution;
import pl.lodz.edu.monshelter.repositories.InstitutionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InstitutionService {

    private final InstitutionRepository repository;

    @Autowired
    public InstitutionService(InstitutionRepository repository) {
        this.repository = repository;

        List<Institution> institutions = List.of(
                new Institution("MPGK Warszawa"),
                new Institution("Akadamik Łódź")
        );
        repository.saveAll(institutions);
    }

    public List<Institution> getInstitutionsList() {
        return CollectionUtils.iterableToList(repository.findAll());
    }

    public Institution getInstitution(Long id) {
        Optional<Institution> institution = repository.findById(id);
        return institution.orElse(null);
    }

}
