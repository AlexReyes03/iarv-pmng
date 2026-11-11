package utez.edu.mx.service.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import utez.edu.mx.service.model.Person;
import utez.edu.mx.service.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Person> getAllPeople() {
        return userRepository.findAll();
    }

    @Transactional
    public Person savePerson(Person person) {
        Person entity = new Person(person.getName().trim());
        return userRepository.save(entity);
    }
}
