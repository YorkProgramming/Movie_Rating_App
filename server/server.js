const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(cors({
	origin: 'http://localhost:8000'
}));

require('./config/mongoose.config');
require('./routes/movie.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );