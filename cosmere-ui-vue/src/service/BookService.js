import axios from 'axios';

export default class BookService {
    baseUrl = 'http://localhost:8080/api/v1/books/';

    getAll() {
        return axios.get(this.baseUrl);
    }

    save(book) {
        return axios.post(this.baseUrl, book);
    }

    update(book) {
        return axios.put(this.baseUrl + book.id, book);
    }

    delete(id) {
        return axios.delete(this.baseUrl + id);
    }
}
