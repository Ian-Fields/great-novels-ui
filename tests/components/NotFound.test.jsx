import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import NotFound from '../../components/NotFound'

describe('Components - NotFound', () => {
  it('displays the children within the Page styled element', () => {
    const wrapper = shallow(<NotFound message="Alexandre Dumas who?" />)

    expect(wrapper.text()).to.equal('¯\\_(ツ)_/¯Alexandre Dumas who?')
  })
})
