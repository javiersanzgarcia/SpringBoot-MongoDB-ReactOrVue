import axios from 'axios';

export class BookService {
    baseUrl = 'http://localhost:8080/api/v1/books/';

    getAll() {
        return axios.get(this.baseUrl).then((res) => res.data);
    }

    save(book) {
        return axios.post(this.baseUrl, book).then((res) => res.data);
    }

    update(book) {
        return axios.put(this.baseUrl + book.id, book).then((res) => res.data);
    }

    delete(id) {
        return axios.delete(this.baseUrl + id).then((res) => res.data);
    }
}
