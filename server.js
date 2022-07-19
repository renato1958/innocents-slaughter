require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookRoutes = require('./routes/api/bookRoutes');
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', bookRoutes);

app.listen(port, host, () => {
    console.log(`Server in ascolto sulla porta ${port};
Ctrl-C per uscire`)
})