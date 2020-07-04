package net.cosmere.library.crud.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "books")
public class Book {

	@Transient
    public final static String SEQUENCE_NAME = "books_sequence";
	
	@Id
	private long id;
	
	@NotBlank
    @Size(max=100)
    @Indexed(unique=true)
	private String name;
	
	private int orderCollection;
	
	private String collection;
	
	public Book() {
		
	}

	public Book(long id, @NotBlank @Size(max = 100) String name, int orderCollection, String collection) {
		super();
		this.id = id;
		this.name = name;
		this.orderCollection = orderCollection;
		this.collection = collection;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOrderCollection() {
		return orderCollection;
	}

	public void setOrderCollection(int orderCollection) {
		this.orderCollection = orderCollection;
	}

	public String getCollection() {
		return collection;
	}

	public void setCollection(String collection) {
		this.collection = collection;
	}

	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", name=" + name + ", orderCollection=" + orderCollection + ", collection="
				+ collection + "]";
	}

	
	
	
}
