import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { novelList } from '../mocks/novels'
import { fetchNovels } from '../../actions/novels'

describe('Actions - Novels', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchNovels', () => {
    it('returns an array of novels from the API', async () => {
      mockAxios.onGet().reply(200, novelList)

      const data = await fetchNovels()

      expect(data).to.deep.equal(novelList)
    })

    it('returns an empty array when the API responds with a non-200 status', async () => {
      mockAxios.onGet().reply(500, 'Unable to retrieve novels')

      const data = await fetchNovels()

      expect(data).to.deep.equal([])
    })
  })
})
