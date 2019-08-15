const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.static(path.join(__dirname + '/../dist')));

app.use('/', express.static(path.join(__dirname + '/../dist')));

app.listen(port, () => console.log(`App running on port ${port}`));
