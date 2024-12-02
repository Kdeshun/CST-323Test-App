const mysql = require('mysql');
const { connection } = require('../conn');
const { v4: uuid } = require('uuid');

const all = ({ limit, sort } = {}) => {
  // TODO: Use filtering
  return new Promise((res, rej) =>
    connection.query('SELECT * FROM TEST.Posts', (error, results) => {
      if (error) rej(error);
      console.debug('all posts -- ', results);
      res(results);
    })
  );
};
const get = ({ id } = {}) => {
  return new Promise((res, rej) =>
    connection.query(
      mysql.format('SELECT * FROM TEST.Posts WHERE ID = ?', [id]),
      (error, results) => {
        if (error) rej(error);
        console.debug('get post -- ', results);
        res(results);
      }
    )
  );
};
const create = ({ title, content, author } = {}) => {
  const query = mysql.format(
    'INSERT INTO TEST.Posts (ID, Title, Content, Author, Created) VALUES (?, ?, ?, ?, ?)',
    [uuid(), title, content, author, mysql.raw('NOW()'), mysql.raw('NOW()')]
  );
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('create post -- ', results);
      res(results);
    })
  );
};

const update = ({ id, title, content, upVotes, downVotes }) => {
  const query = mysql.format(
    'UPDATE TEST.Posts SET Title = ?, Content = ? UpVotes = ?, DownVotes = ? WHERE ID = ?',
    [title, content, upVotes, downVotes, id]
  );
  return new Promise((res, rej) =>
    connection.query(query, (error, results) => {
      if (error) rej(error);
      console.debug('update post -- ', results);
      res(results);
    })
  );
};

// const deleteItem = ({ id = '' } = {}) => {
//   const query = mysql.format('UPDATE TEST.Posts SET Deleted = ? WHERE ID = ?', [
//     mysql.raw('NOW()'),
//     id,
//   ]);
//   return new Promise((res, rej) =>
//     connection.query(query, (error, results) => {
//       if (error) rej(error);
//       console.debug('delete post -- ', results);
//       res(results);
//     })
//   );
// };

module.exports = {
  all,
  get,
  create,
  update,
  // deleteItem,
};
