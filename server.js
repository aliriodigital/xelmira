const server = require('./app');
const port = process.env.PORT || 3000;

require('./database.js');

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
})