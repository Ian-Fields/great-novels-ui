import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Novel from '../../components/Novel'

describe('Components - Novel', () => {
  it('displays the novel and their author', () => {
    const wrapper = shallow(<Novel id={1} name="Ian Fields" title="Monkey Salad" />)

    expect(wrapper.text()).to.equal('Monkey Salad by Ian Fields')
  })
})
