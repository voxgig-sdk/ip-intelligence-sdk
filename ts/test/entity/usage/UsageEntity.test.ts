

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpIntelligenceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('UsageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IP_INTELLIGENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('IP_INTELLIGENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpIntelligenceSDK.test()
    const ent = testsdk.Usage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IP_INTELLIGENCE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'usage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"account_level","req":true,"short":"Account tier level","type":"`$STRING`","index$":0},{"active":true,"name":"current_usage","req":true,"short":"Number of API requests used in the current billing period","type":"`$INTEGER`","index$":1},{"active":true,"name":"monthly_limit","req":true,"short":"Total monthly request limit for this account","type":"`$INTEGER`","index$":2},{"active":true,"format":"date-time","name":"next_reset","req":true,"short":"ISO 8601 timestamp when the usage counter resets","type":"`$STRING`","index$":3},{"active":true,"name":"remaining_requests","req":true,"short":"Number of requests remaining in the current billing period","type":"`$INTEGER`","index$":4},{"active":true,"format":"float","name":"usage_percentage","req":true,"short":"Percentage of monthly limit used","type":"`$NUMBER`","index$":5}],"name":"usage","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/usage","json":"{\"operationId\":\"getUsageStats\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"account_level\":\"developer\",\"current_usage\":5000,\"monthly_limit\":100000,\"next_reset\":\"2025-02-01T00:00:00Z\",\"remaining_requests\":95000,\"usage_percentage\":5},\"schema\":{\"properties\":{\"account_level\":{\"description\":\"Account tier level\",\"example\":\"developer\",\"type\":\"string\"},\"current_usage\":{\"description\":\"Number of API requests used in the current billing period\",\"example\":5000,\"type\":\"integer\"},\"monthly_limit\":{\"description\":\"Total monthly request limit for this account\",\"example\":100000,\"type\":\"integer\"},\"next_reset\":{\"description\":\"ISO 8601 timestamp when the usage counter resets\",\"example\":\"2025-02-01T00:00:00Z\",\"format\":\"date-time\",\"type\":\"string\"},\"remaining_requests\":{\"description\":\"Number of requests remaining in the current billing period\",\"example\":95000,\"type\":\"integer\"},\"usage_percentage\":{\"description\":\"Percentage of monthly limit used\",\"example\":5,\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"account_level\",\"current_usage\",\"monthly_limit\",\"usage_percentage\",\"remaining_requests\",\"next_reset\"],\"type\":\"object\"}}},\"description\":\"Successful response with usage statistics\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - API key required\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key authentication via header (recommended method). API keys start with 'zone_' and are 32 characters long.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"description\":\"API key authentication via query parameter (alternative method).\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/usage","segments":[{"lit":"api"},{"lit":"usage"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"usage","name__orig":"usage","Name":"Usage","name_":"usage","name-":"usage","NAME":"USAGE","index$":1}, {"active":true,"entity":"usage","key$":"BasicUsageFlow","kind":"basic","name":"BasicUsageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"usage_ref01","srcdatavar":"usage_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-usage_ref01"}}],"index$":0}]}, 'Usage')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let usage_ref01_data = Object.values(setup.data.existing.usage)[0] as any

    // LOAD
    const usage_ref01_ent = client.Usage()
    const usage_ref01_match_dt0: any = {}
    const usage_ref01_data_dt0 = (await usage_ref01_ent.load(usage_ref01_match_dt0)).data()
    assert(null != usage_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/usage/UsageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpIntelligenceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['usage01','usage02','usage03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IP_INTELLIGENCE_TEST_USAGE_ENTID': idmap,
    'IP_INTELLIGENCE_TEST_LIVE': 'FALSE',
    'IP_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
    'IP_INTELLIGENCE_APIKEY': '',
  })

  idmap = env['IP_INTELLIGENCE_TEST_USAGE_ENTID']

  const live = 'TRUE' === env.IP_INTELLIGENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IP_INTELLIGENCE_TEST_USAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpIntelligenceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.IP_INTELLIGENCE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.IP_INTELLIGENCE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
