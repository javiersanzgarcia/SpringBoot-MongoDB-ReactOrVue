<template>
    <div style="margin: 0 auto; width:70%">
        <Panel header="Crud App Cosmere">
            <Menubar :model="items" />
            <br />
            <DataTable
                :value="books"
                :paginator="true"
                :rows="10"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 20]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                selectionMode="single"
                :selection.sync="selectedBook"
                data-key="id"
            >
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="collection" header="Collection"></Column>
                <Column field="orderCollection" header="Order Collection"></Column>
            </DataTable>
        </Panel>

        <Dialog
            header="Create Book"
            :visible.sync="displayModal"
            :style="{width: '30vw'}"
            :modal="true"
        >
            <span class="p-float-label">
                <InputText id="name" type="text" v-model="book.name" />
                <label for="name">Name</label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="collection" type="text" v-model="book.collection" />
                <label for="collection">Collection</label>
            </span>
            <br />
            <span class="p-float-label">
                <InputText id="orderCollection" type="text" v-model="book.orderCollection" />
                <label for="orderCollection">Order Collection</label>
            </span>
            <template #footer>
                <Button label="Save" icon="pi pi-check" @click="saveOrUpdate" autofocus />
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    @click="closeModal"
                    class="p-button-text"
                />
            </template>
        </Dialog>
    </div>
</template>

<script>
import BookService from '../service/BookService';
export default {
    name: 'CrudApp',
    data() {
        return {
            books: null,
            displayModal: false,
            isNew: false,
            book: {
                id: null,
                name: null,
                collection: null,
                orderCollection: null
            },
            selectedBook: {
                id: null,
                name: null,
                collection: null,
                orderCollection: null
            },
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        this.showSaveModal();
                    }
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    command: () => {
                        this.showEditModal();
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash',
                    command: () => {
                        this.delete();
                    }
                },
                {
                    label: 'Refresh',
                    icon: 'pi pi-fw pi-refresh',
                    command: () => {
                        this.refresh();
                    }
                }
            ]
        };
    },
    bookService: null,
    created() {
        this.bookService = new BookService();
    },
    mounted() {
        this.getAll();
    },
    methods: {
        getAll() {
            this.bookService.getAll().then(reponse => {
                this.books = reponse.data;
            });
        },
        showSaveModal() {
            this.isNew = true;
            this.displayModal = true;
        },
        showEditModal() {
            this.book = this.selectedBook;
            this.displayModal = true;
        },
        closeModal() {
            this.displayModal = false;
        },
        saveOrUpdate() {
            if (this.isNew) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.bookService.save(this.book).then(data => {
                if (data.status === 200) {
                    this.displayModal = false;
                    this.book = {
                        name: null,
                        collection: null,
                        orderCollection: null
                    };
                    this.isNew = false;
                    this.getAll();
                }
            });
        },
        update() {
            this.bookService.update(this.book).then(data => {
                if (data.status === 200) {
                    this.displayModal = false;
                    this.book = {
                        name: null,
                        collection: null,
                        orderCollection: null
                    };
                    this.isNew = false;
                    this.getAll();
                }
            });
        },
        delete() {
            this.book = this.selectedBook;
            this.bookService.delete(this.book.id).then(data => {
                if (data.status === 200) {
                    this.book = {
                        name: null,
                        collection: null,
                        orderCollection: null
                    };
                    this.getAll();
                }
            });
        },
        refresh() {
            this.getAll();
        }
    }
};
</script>

<style></style>
