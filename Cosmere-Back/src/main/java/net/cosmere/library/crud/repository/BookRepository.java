package net.cosmere.library.crud.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import net.cosmere.library.crud.model.Book;

@Repository
public interface BookRepository extends MongoRepository<Book, Long>{

}
