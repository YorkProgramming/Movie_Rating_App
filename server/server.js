const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;


app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended : true }));

app.use(cors({
	origin: 'http://localhost:3000'
}));


require('./config/mongoose.config');
require('./routes/movie.routes')(app);
require('./routes/user.routes')(app);
require('dotenv').config();

app.listen(port, () => console.log(`Listening on port: ${port}`) );