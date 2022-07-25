<template>
    <div class="general-container">
        <header class="page-header">
            <div class="logo">
                <h1 class="main-title">La Strage degli Innocenti</h1>
            </div>
        </header>
        <main class="main-content">
            <section class="innocents">
                <h3 class="section-title">Elenco degli innocenti rapiti al loro papà</h3>

                <div class="innocents-list">
                    <div class="innocent-item" v-for="book in books" :key="book._id">
                        <p class="autore"><span class="item-attr">Autore: </span>{{ book.author }}</p>
                        <p class="titolo"><span class="item-attr">Titolo: </span>{{ book.title }}</p>
                        <p class="aggiunto_da"><span class="item-attr">In catalogo da: </span>{{ formatDate(new Date(book.date_added)) }}</p>
                    </div>
                </div>
            </section>
            <section class="add-innocent">
                <h3 class="section-title">Aggiungi libro</h3>
                <div class="innocent-form">
                    <form>
                        <div class="input-box">
                            <label for="author">Autore</label>
                            <input type="text" name="author" id="author" v-model="author">
                        </div>
                        <div class="input-box">
                            <label for="title">Titolo</label>
                            <input type="text" name="title" id="title" v-model="title">
                        </div>
                        <div class="input-box">
                            <button type="submit" class="submit" @click.prevent="addBook">Aggiungi</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            books: [],
            author: '',
            title: '',
        }
    },
    async created() {  
        try {
            const response = await axios.get('/api/books');
            this.books = response.data;
        } catch(err) {}  
    },
    methods: {
        formatDate(date) {
            const language = navigator.languages[0] || navigator.language;
            const formattedDate = new Intl.DateTimeFormat(language, {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
            return formattedDate;
        },
        async addBook() {
            try {
                const response = await axios.post('/api/books/add/', { author: this.author, title: this.title});
                this.books.push(response.data);
                this.author = '';
                this.title = '';
            } catch(err) {}
        }
    }
}
</script>

<style scoped>

</style>