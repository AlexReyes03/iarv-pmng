package utez.edu.mx.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import utez.edu.mx.service.model.Person;

public interface UserRepository extends JpaRepository<Person, Integer> {
    Person findByName(String name);
}
