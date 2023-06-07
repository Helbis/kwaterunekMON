package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
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
    }

    public List<Institution> getInstitutionsList() {
        return CollectionUtils.iterableToList(repository.findAll());
    }

    public Institution getInstitution(Long id) {
        Optional<Institution> institution = repository.findById(id);
        return institution.orElseThrow(
                () -> new NotFoundException(String.format("Institution with given id: %s do not exists!", id)));
    }

    public Institution createInstitution(Institution institutionEntity) {
        Optional<Institution> optional = repository.findByName(institutionEntity.getName());
        if (optional.isPresent()) {
            throw new ConflictException(
                    String.format("Institution with given name: %s already exists.", institutionEntity.getName()));
        }
        return repository.save(institutionEntity);
    }
}
