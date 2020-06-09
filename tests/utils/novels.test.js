import { expect } from 'chai'
import { createSandbox } from 'sinon'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import { novelList, novelFilters } from '../mocks/novels'
import * as NovelActions from '../../actions/novels'
import { filterNovels, retrieveNovels } from '../../utils/novels'

describe('Utils - Novels', () => {
  let sandbox
  let stubbedFetchNovels

  before(() => {
    sandbox = createSandbox()

    stubbedFetchNovels = sandbox.stub(NovelActions, 'fetchNovels')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('filterNovels', () => {
    it('returns an array of matching novels', () => {
      const filtered = filterNovels(novelList, 'dra')

      expect(filtered).to.deep.equal(novelFilters)
    })
  })

  describe('retrieveNovels', () => {
    it('returns the data provided by the fetch action', async () => {
      stubbedFetchNovels.returns(novelList)

      const data = await retrieveNovels()
      expect(data).to.deep.equal(novelList)
    })
  })
})
