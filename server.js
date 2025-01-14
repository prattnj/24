const express = require('express');

const app = express();
const port = 3007;

app.use(express.static('build'));
app.listen(port, () => {
    console.log('Express server listening on port %s...', port);
});