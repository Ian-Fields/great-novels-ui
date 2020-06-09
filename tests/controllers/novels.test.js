/* eslint-disable max-len */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import { getAllNovels, getNovelByIdOrTitle } from '../../controllers/novels'
import models from '../../models'
import { novelList, novelFilters } from '../mocks/novels'

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - Novels', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus
  let stubbedNovelsFindAll
  let stubbedNovelsFindOne

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedNovelsFindAll = sandbox.stub(models.Novels, 'findAll')
    stubbedNovelsFindOne = sandbox.stub(models.Novels, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getAllNovels', () => {
    it('retrieves a list of all novels from the database.', async () => {
      stubbedNovelsFindAll.returns(novelList)

      await getAllNovels({}, response)

      expect(stubbedNovelsFindAll).to.have.been.calledWith({
        include: [{ model: models.Authors }, { model: models.Genres }],
      })
      expect(stubbedSend).to.have.been.calledWith(novelList)
    })
  })

  describe('getNovelByIdOrTitle', () => {
    it('retrieves the novel associated with the id passed by the user with its author and genres.', async () => {
      stubbedNovelsFindOne.returns(novelFilters)
      const request = { params: { identifier: 1 } }

      await getNovelByIdOrTitle(request, response)

      expect(stubbedNovelsFindOne).to.be.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: request.params.identifier },
            { title: { [models.Sequelize.Op.like]: `%${request.params.identifier}%` } },
          ],
        },
        include: [{ model: models.Authors }, { model: models.Genres }],
      })
      expect(stubbedSend).to.have.been.calledWith(novelFilters)
    })

    it('returns a 404 status when no novel is found matching the id provided by the user.', async () => {
      stubbedNovelsFindOne.returns(null)
      const request = { params: { identifier: 1 } }

      await getNovelByIdOrTitle(request, response)

      expect(stubbedNovelsFindOne).to.be.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: request.params.identifier },
            { title: { [models.Sequelize.Op.like]: `%${request.params.identifier}%` } },
          ],
        },
        include: [{ model: models.Authors }, { model: models.Genres }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })
})
