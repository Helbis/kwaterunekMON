package pl.lodz.edu.monshelter.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.edu.monshelter.exceptions.ConflictException;
import pl.lodz.edu.monshelter.exceptions.NotFoundException;
import pl.lodz.edu.monshelter.util.CollectionUtils;
import pl.lodz.edu.monshelter.entities.Location;
import pl.lodz.edu.monshelter.repositories.LocationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository repository;

    @Autowired
    public LocationService(LocationRepository repository) {
        this.repository = repository;

        List<Location> institutions = List.of(
                new Location("MPGK Warszawa"),
                new Location("Akadamik Łódź")
        );
        repository.saveAll(institutions);
    }

    public List<Location> getLocationList() {
        return CollectionUtils.iterableToList(repository.findAll());
    }

    public Location getLocation(Long id) {
        Optional<Location> location = repository.findById(id);
        return location.orElseThrow(
                () -> new NotFoundException(String.format("Lokalizacja o ID: %s nie istnieje!", id)));
    }

    public Location createLocation(Location locationEntity) {
        Optional<Location> optional = repository.findByName(locationEntity.getName());
        if (optional.isPresent()) {
            throw new ConflictException(
                    String.format("Lokalizacja o nazwie: %s już istnieje.", locationEntity.getName()));
        }
        return repository.save(locationEntity);
    }
}
