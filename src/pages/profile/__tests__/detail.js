import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import TestApp from 'TestApp'
import { config } from '../mock'


it('profile', async () => {
  let wrapper
  config.fetch = true
  await act(async () => {
    wrapper = await mount(
      <TestApp path="/profile" />
    )
  })
  expect(window.rest.get).toHaveBeenCalled()
  const email = wrapper.find('input[type="email"]')
  expect(email.instance().value).toBe('admin@example.com')
})


it('profile failed', async () => {
  config.fetch = false
  await act(async () => {
    await mount(
      <TestApp path="/profile" />
    )
  })
  expect(window.rest.get).toHaveBeenCalled()
})
