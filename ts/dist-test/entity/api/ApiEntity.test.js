"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_INTELLIGENCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_INTELLIGENCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpIntelligenceSDK.test();
        const ent = testsdk.Api();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_INTELLIGENCE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "asn_handle", "req": true, "short": "Network operator name/handle", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "asn_id", "req": true, "short": "Autonomous System Number of the network operator", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "country_code", "req": true, "short": "Two-letter ISO country code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "country_name", "req": true, "short": "Full country name", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "ipv4", "name": "ip", "req": true, "short": "The IP address that was analyzed", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "is", "req": true, "short": "Array of classifications for this IP.", "type": "`$ARRAY`", "index$": 6 }, { "active": true, "name": "malicious", "req": false, "short": "Information about malicious activity if IP is flagged", "type": "`$OBJECT`", "index$": 7 }, { "active": true, "name": "metadata", "req": false, "short": "Additional contextual information about the IP, structure varies based on classifications", "type": "`$OBJECT`", "index$": 8 }, { "active": true, "name": "trust_score", "req": true, "short": "Trust rating from 0-10, where 10 is most trustworthy.", "type": "`$INTEGER`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "api", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "1.1.1.1", "kind": "param", "name": "id", "orig": "ip", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "zone_your_api_key_here", "kind": "query", "name": "api_key", "orig": "api_key", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/{ip}", "json": "{\"operationId\":\"getIpIntelligence\",\"parameters\":[{\"description\":\"The IP address to analyze (e.g., 1.1.1.1)\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1\",\"format\":\"ipv4\",\"type\":\"string\"}},{\"description\":\"API key for authentication (alternative to X-API-Key header). API keys start with 'zone_' and are 32 characters long.\",\"in\":\"query\",\"name\":\"api_key\",\"required\":false,\"schema\":{\"example\":\"zone_your_api_key_here\",\"pattern\":\"^zone_.{28}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"datacenter\":{\"summary\":\"Datacenter IP (Cloudflare)\",\"value\":{\"asn_handle\":\"CLOUDFLARENET\",\"asn_id\":13335,\"country_code\":\"US\",\"country_name\":\"United States\",\"ip\":\"1.1.1.1\",\"is\":[\"datacenter\"],\"metadata\":{\"datacenter\":\"CLOUDFLARENET\"},\"trust_score\":8}},\"mobile\":{\"summary\":\"Mobile network (Vodafone UK)\",\"value\":{\"asn_handle\":\"VODAFONE-UK\",\"asn_id\":15440,\"country_code\":\"GB\",\"country_name\":\"United Kingdom\",\"ip\":\"42.113.0.1\",\"is\":[\"mobile\"],\"trust_score\":9}},\"tor_exit\":{\"summary\":\"Tor exit node\",\"value\":{\"asn_handle\":\"MilkyWan\",\"asn_id\":2027,\"country_code\":\"FR\",\"country_name\":\"France\",\"ip\":\"80.67.167.81\",\"is\":[\"malicious\",\"tor\",\"datacenter\"],\"malicious\":{\"ipsum_blacklists\":4,\"sources\":[\"abuseipdb\",\"ipsum\"]},\"metadata\":{\"datacenter\":\"MilkyWan\",\"tor\":{\"name\":\"arecoque5\",\"node_id\":\"0DC16FEAA5A5E27A9740....\",\"version\":\"0.4.8.17\"}},\"trust_score\":0}}},\"schema\":{\"properties\":{\"asn_handle\":{\"description\":\"Network operator name/handle\",\"example\":\"CLOUDFLARENET\",\"type\":\"string\"},\"asn_id\":{\"description\":\"Autonomous System Number of the network operator\",\"example\":13335,\"type\":\"integer\"},\"country_code\":{\"description\":\"Two-letter ISO country code\",\"example\":\"US\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"country_name\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"ip\":{\"description\":\"The IP address that was analyzed\",\"example\":\"1.1.1.1\",\"format\":\"ipv4\",\"type\":\"string\"},\"is\":{\"description\":\"Array of classifications for this IP. Possible values: datacenter, mobile, residential, vpn, proxy, tor, malicious, crawler, education, research, cloud, nsp, scanner, monitoring, etc. Multiple classifications are possible.\",\"example\":[\"datacenter\"],\"items\":{\"enum\":[\"datacenter\",\"mobile\",\"residential\",\"vpn\",\"proxy\",\"tor\",\"malicious\",\"crawler\",\"education\",\"research\",\"cloud\",\"nsp\",\"scanner\",\"monitoring\"],\"type\":\"string\"},\"type\":\"array\"},\"malicious\":{\"description\":\"Information about malicious activity if IP is flagged\",\"properties\":{\"ipsum_blacklists\":{\"description\":\"Number of blacklists the IP appears on\",\"type\":\"integer\"},\"sources\":{\"description\":\"Sources reporting this IP as malicious\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"metadata\":{\"additionalProperties\":true,\"description\":\"Additional contextual information about the IP, structure varies based on classifications\",\"properties\":{\"datacenter\":{\"description\":\"Datacenter or hosting provider name\",\"type\":\"string\"},\"tor\":{\"description\":\"Tor node information if IP is a Tor exit node\",\"properties\":{\"name\":{\"description\":\"Tor node name\",\"type\":\"string\"},\"node_id\":{\"description\":\"Tor node identifier\",\"type\":\"string\"},\"version\":{\"description\":\"Tor software version\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"trust_score\":{\"description\":\"Trust rating from 0-10, where 10 is most trustworthy. Scores 9-10 represent actual human users, 6-8 automated/infrastructure, 0-5 low trust/suspicious actors.\",\"example\":8,\"maximum\":10,\"minimum\":0,\"type\":\"integer\"}},\"required\":[\"ip\",\"trust_score\",\"is\",\"country_code\",\"country_name\",\"asn_id\",\"asn_handle\"],\"type\":\"object\"}}},\"description\":\"Successful response with IP intelligence data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid IP address format\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"error\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - rate limit exceeded\"}},\"security\":[{},{\"ApiKeyAuth\":[]},{\"ApiKeyQuery\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key authentication via header (recommended method). API keys start with 'zone_' and are 32 characters long.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"},\"ApiKeyQuery\":{\"description\":\"API key authentication via query parameter (alternative method).\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/{ip}", "rename": { "param": { "ip": "id" } }, "segments": [{ "lit": "api" }, { "var": "id" }], "select": { "exist": ["api_key", "id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api", "name__orig": "api", "Name": "Api", "name_": "api", "name-": "api", "NAME": "API", "index$": 0 }, { "active": true, "entity": "api", "key$": "BasicApiFlow", "kind": "basic", "name": "BasicApiFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "api_ref01", "srcdatavar": "api_ref01_data", "suffix": "_dt0" }, "match": { "id": "api01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_ref01" } }], "index$": 0 }] }, 'Api');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_ref01_data = Object.values(setup.data.existing.api)[0];
        // LOAD
        const api_ref01_ent = client.Api();
        const api_ref01_match_dt0 = {};
        api_ref01_match_dt0.id = api_ref01_data.id;
        const api_ref01_data_dt0 = (await api_ref01_ent.load(api_ref01_match_dt0)).data();
        (0, node_assert_1.default)(api_ref01_data_dt0.id === api_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api/ApiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpIntelligenceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api01', 'api02', 'api03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_INTELLIGENCE_TEST_API_ENTID': idmap,
        'IP_INTELLIGENCE_TEST_LIVE': 'FALSE',
        'IP_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
        'IP_INTELLIGENCE_APIKEY': '',
    });
    idmap = env['IP_INTELLIGENCE_TEST_API_ENTID'];
    const live = 'TRUE' === env.IP_INTELLIGENCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_INTELLIGENCE_TEST_API_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IpIntelligenceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ApiEntity.test.js.map