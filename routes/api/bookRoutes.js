const router = require('express').Router();
const BookModel = require('../../models/book');

router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find();
        if(!books || books.length === 0) {
            res.status(204).json({ messaggio: "Nessun libro in catalogo" });
        } else {
            res.status(200).json(books);
        }
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findById(id);
        if(!book) throw new Error("Libro non presente in catalogo");
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
});

router.post('/add', async (req, res) => {
    const newBook = new BookModel(req.body);
    try {
        const bookToAdd = await newBook.save();
        if(!newBook) throw new Error("Impossibile aggiungere il libro");
        res.status(202).json(bookToAdd);
    } catch (error) {
        res.status(500).json({ messaggio: error.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findByIdAndDelete(id);
        if(!book) throw new Error("Impossibile eliminare il libro");
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
});

router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findByIdAndUpdate(id, req.body);
        if(!book) throw new Error("Impossibile aggiornare il libro");
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
});

router.delete('/deleteAll', async (req, res) => {
    try {
        const books = await BookModel.deleteMany({});
        if(!books) throw new Error("Impossibile compiere la strage");
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ messaggio: error.message });
    }
});

module.exports = router;