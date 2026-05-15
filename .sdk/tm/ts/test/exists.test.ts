
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpIntelligenceSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpIntelligenceSDK.test()
    equal(null !== testsdk, true)
  })

})
