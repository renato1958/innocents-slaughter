require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bookRoutes = require('./routes/api/bookRoutes');
const dbConnect = require('./database/dbConn');
const port = process.env.PORT || 3000;
const host = '0.0.0.0';
dbConnect();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', bookRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'dist', index.html));
    })
}

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port};
Ctrl-C per uscire`)
});