const models = require('../models')

const getAllAuthors = async (request, response) => {
  const authors = await models.Authors.findAll()

  return response.send(authors)
}

const getAuthorByIdOrName = async (request, response) => {
  const { identifier } = request.params

  const author = await models.Authors.findOne({
    where: {
      [models.Sequelize.Op.or]: [
        { id: identifier },
        { nameLast: { [models.Sequelize.Op.like]: `%${identifier}%` } },
      ],
    },
    include: [{
      model: models.Novels,
      include: [{ model: models.Genres }],
    }],
  })

  return author
    ? response.send(author)
    : response.sendStatus(404)
}

module.exports = { getAllAuthors, getAuthorByIdOrName }
