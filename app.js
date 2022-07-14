import dbDAO from './dbDAO';

const dbDAO = new dbDAO();

dbDAO.findAll('users').then(function (rows) {
    console.log(rows);
}
).catch(function (err) {
    console.log(err);
}
).finally(function () {
    knex.destroy();
}

);