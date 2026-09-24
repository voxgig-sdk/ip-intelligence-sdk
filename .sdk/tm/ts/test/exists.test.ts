
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpIntelligenceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IpIntelligenceSDK.test()
    equal(testsdk instanceof IpIntelligenceSDK, true,
      'IpIntelligenceSDK.test() must return a client synchronously')
  })

})
