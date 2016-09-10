const app = require('express')();
const userRoutes = require('./routes/user');

app.post('/user', userRoutes.create);
app.get('/user/:id', userRoutes.read);
app.put('/user/:id', userRoutes.update);
app.delete('/user/:id', userRoutes.delete);
app.get('/users', userRoutes.list);

app.listen(3000, () => console.log('User API listening on port 3000!'));
