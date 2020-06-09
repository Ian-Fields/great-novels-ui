export default (connection, Sequelize, Authors) => connection.define('novels', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: Sequelize.STRING, allowNull: false },
  authorId: { type: Sequelize.INTEGER, references: { model: Authors, key: 'id' } },
})
