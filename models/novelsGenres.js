export default (connection, Sequelize, Genres, Novels) => connection.define('novelsGenres', {
  genreId: { type: Sequelize.INTEGER, references: { model: Genres, key: 'id' } },
  novelId: { type: Sequelize.INTEGER, references: { model: Novels, key: 'id' } },
})
