import React, { Component } from 'react';
import './App.css';
import { BookService } from './service/BookService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            book: {
                id: null,
                name: null,
                orderCollection: null,
                collection: null,
            },
            selectedBook: {},
        };
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                command: () => {
                    this.showSaveDialog();
                },
            },
            {
                label: 'Update',
                icon: 'pi pi-fw pi-pencil',
                command: () => {
                    this.showEditDialog();
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this.delete();
                },
            },
        ];
        this.bookService = new BookService();
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.footer = (
            <div>
                <Button label="Save" icon="pi pi-check" onClick={this.save} />
            </div>
        );

        this.footerUpdate = (
            <div>
                <Button label="Save" icon="pi pi-check" onClick={this.update} />
            </div>
        );
    }

    componentDidMount() {
        this.bookService
            .getAll()
            .then((data) => this.setState({ books: data }));
    }

    save() {
        this.bookService.save(this.state.book).then((data) => {
            this.setState({
                visible: false,
                book: {
                    id: null,
                    name: null,
                    orderCollection: null,
                    collection: null,
                },
            });
            this.growl.show({
                severity: 'success',
                summary: 'Attention!',
                detail: 'The record was saved successfully',
            });
            this.bookService
                .getAll()
                .then((data) => this.setState({ books: data }));
        });
    }

    update() {
        this.bookService.update(this.state.book).then((data) => {
            this.setState({
                visible: false,
                book: {
                    id: null,
                    name: null,
                    orderCollection: null,
                    collection: null,
                },
            });
            this.growl.show({
                severity: 'success',
                summary: 'Attention!',
                detail: 'The record was updated successfully',
            });
            this.bookService
                .getAll()
                .then((data) => this.setState({ books: data }));
        });
    }

    delete() {
        if (window.confirm('Are you sure to delete the record?')) {
            this.bookService.delete(this.state.selectedBook.id).then((data) => {
                this.growl.show({
                    severity: 'success',
                    summary: 'Attention!',
                    detail: 'The record was deleted successfully',
                });
                this.bookService
                    .getAll()
                    .then((data) => this.setState({ books: data }));
            });
        }
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Cosmere Books CRUD">
                    <DataTable
                        value={this.state.books}
                        paginator={true}
                        rows="10"
                        selectionMode="single"
                        selection={this.state.selectedBook}
                        onSelectionChange={(e) =>
                            this.setState({ selectedBook: e.value })
                        }
                    >
                        {/* <Column field="id" header="ID"></Column> */}
                        <Column field="name" header="Name"></Column>
                        <Column
                            field="orderCollection"
                            header="Order Collection"
                        ></Column>
                        <Column field="collection" header="Collection"></Column>
                    </DataTable>
                </Panel>
                <Dialog
                    header="Create Book"
                    visible={this.state.visible}
                    style={{ width: '400px' }}
                    footer={this.state.isNew ? this.footer : this.footerUpdate}
                    modal={true}
                    onHide={() => this.setState({ visible: false })}
                >
                    <form id="book-form">
                        <span className="p-float-label">
                            <InputText
                                value={this.state.book.name}
                                style={{ width: '100%' }}
                                id="name"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState((prevState) => {
                                        let book = Object.assign(
                                            {},
                                            prevState.book
                                        );
                                        book.name = val;

                                        return { book };
                                    });
                                }}
                            />
                            <label htmlFor="name">Name</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText
                                value={this.state.book.orderCollection}
                                style={{ width: '100%' }}
                                id="orderCollection"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState((prevState) => {
                                        let book = Object.assign(
                                            {},
                                            prevState.book
                                        );
                                        book.orderCollection = val;

                                        return { book };
                                    });
                                }}
                            />
                            <label htmlFor="orderCollection">
                                Order Collection
                            </label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText
                                value={this.state.book.collection}
                                style={{ width: '100%' }}
                                id="collection"
                                onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState((prevState) => {
                                        let book = Object.assign(
                                            {},
                                            prevState.book
                                        );
                                        book.collection = val;

                                        return { book };
                                    });
                                }}
                            />
                            <label htmlFor="collection">Collection</label>
                        </span>
                    </form>
                </Dialog>
                <Growl ref={(el) => (this.growl = el)} />
            </div>
        );
    }

    showSaveDialog() {
        this.setState({
            visible: true,
            isNew: true,
            book: {
                id: null,
                name: null,
                orderCollection: null,
                collection: null,
            },
        });
        document.getElementById('book-form').reset();
    }

    showEditDialog() {
        this.setState({
            visible: true,
            isNew: false,
            book: {
                id: this.state.selectedBook.id,
                name: this.state.selectedBook.name,
                orderCollection: this.state.selectedBook.orderCollection,
                collection: this.state.selectedBook.collection,
            },
        });
    }
}
