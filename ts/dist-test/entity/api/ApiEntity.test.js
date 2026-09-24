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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "asn_handle": { "a": true, "h": "Asn Handle", "n": "asn_handle", "r": true, "sh": "Network operator name/handle", "t": "`$STRING`", "key$": "asn_handle", "index$": 0 }, "asn_id": { "a": true, "h": "Asn Id", "n": "asn_id", "r": true, "sh": "Autonomous System Number of the network operator", "t": "`$INTEGER`", "key$": "asn_id", "index$": 1 }, "country_code": { "a": true, "h": "Country Code", "n": "country_code", "r": true, "sh": "Two-letter ISO country code", "t": "`$STRING`", "key$": "country_code", "index$": 2 }, "country_name": { "a": true, "h": "Country Name", "n": "country_name", "r": true, "sh": "Full country name", "t": "`$STRING`", "key$": "country_name", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "ip": { "a": true, "fo": "ipv4", "h": "Ip", "n": "ip", "r": true, "sh": "The IP address that was analyzed", "t": "`$STRING`", "key$": "ip", "index$": 5 }, "is": { "a": true, "h": "Is", "n": "is", "r": true, "sh": "Array of classifications for this IP.", "t": "`$ARRAY`", "key$": "is", "index$": 6 }, "malicious": { "a": true, "h": "Malicious", "n": "malicious", "r": false, "sh": "Information about malicious activity if IP is flagged", "t": "`$OBJECT`", "key$": "malicious", "index$": 7 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": false, "sh": "Additional contextual information about the IP, structure varies based on classifications", "t": "`$OBJECT`", "key$": "metadata", "index$": 8 }, "trust_score": { "a": true, "h": "Trust Score", "n": "trust_score", "r": true, "sh": "Trust rating from 0-10, where 10 is most trustworthy.", "t": "`$INTEGER`", "key$": "trust_score", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "api", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/{ip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "1.1.1.1", "k": "param", "n": "id", "or": "ip", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "zone_your_api_key_here", "k": "query", "n": "api_key", "or": "api_key", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/{ip}", "q": { "exist": ["api_key", "id"] }, "r": { "param": { "ip": "id" } }, "s": [{ "lit": "api" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "api", "name__orig": "api", "Name": "Api", "name_": "api", "name-": "api", "NAME": "API", "index$": 0 }, { "active": true, "entity": "api", "key$": "BasicApiFlow", "kind": "basic", "name": "BasicApiFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_ref01", "srcdatavar": "api_ref01_data", "suffix": "_dt0" }, "m": { "id": "api01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-api_ref01" } }], "index$": 0 }] }, 'Api', { "GET /api/{ip}": { "protocol": "http", "operationId": "getIpIntelligence", "responses": { "200": { "description": "Successful response with IP intelligence data", "content": { "application/json": { "schema": { "type": "object", "required": ["ip", "trust_score", "is", "country_code", "country_name", "asn_id", "asn_handle"], "properties": { "ip": { "type": "string", "format": "ipv4", "description": "The IP address that was analyzed", "example": "1.1.1.1", "key$": "ip" }, "trust_score": { "type": "integer", "minimum": 0, "maximum": 10, "description": "Trust rating from 0-10, where 10 is most trustworthy. Scores 9-10 represent actual human users, 6-8 automated/infrastructure, 0-5 low trust/suspicious actors.", "example": 8, "key$": "trust_score" }, "is": { "type": "array", "description": "Array of classifications for this IP. Possible values: datacenter, mobile, residential, vpn, proxy, tor, malicious, crawler, education, research, cloud, nsp, scanner, monitoring, etc. Multiple classifications are possible.", "items": { "type": "string", "enum": ["datacenter", "mobile", "residential", "vpn", "proxy", "tor", "malicious", "crawler", "education", "research", "cloud", "nsp", "scanner", "monitoring"] }, "example": ["datacenter"], "key$": "is" }, "country_code": { "type": "string", "minLength": 2, "maxLength": 2, "description": "Two-letter ISO country code", "example": "US", "key$": "country_code" }, "country_name": { "type": "string", "description": "Full country name", "example": "United States", "key$": "country_name" }, "asn_id": { "type": "integer", "description": "Autonomous System Number of the network operator", "example": 13335, "key$": "asn_id" }, "asn_handle": { "type": "string", "description": "Network operator name/handle", "example": "CLOUDFLARENET", "key$": "asn_handle" }, "metadata": { "type": "object", "description": "Additional contextual information about the IP, structure varies based on classifications", "additionalProperties": true, "properties": { "datacenter": { "type": "string", "description": "Datacenter or hosting provider name" }, "tor": { "type": "object", "description": "Tor node information if IP is a Tor exit node", "properties": { "node_id": { "type": "string", "description": "Tor node identifier" }, "version": { "type": "string", "description": "Tor software version" }, "name": { "type": "string", "description": "Tor node name" } } } }, "key$": "metadata" }, "malicious": { "type": "object", "description": "Information about malicious activity if IP is flagged", "properties": { "ipsum_blacklists": { "type": "integer", "description": "Number of blacklists the IP appears on" }, "sources": { "type": "array", "description": "Sources reporting this IP as malicious", "items": { "type": "string" } } }, "key$": "malicious" } }, "x-ref": "#/components/schemas/IpIntelligenceResponse", "index$": 0 }, "examples": { "datacenter": { "summary": "Datacenter IP (Cloudflare)", "value": { "ip": "1.1.1.1", "trust_score": 8, "is": ["datacenter"], "country_code": "US", "country_name": "United States", "asn_id": 13335, "asn_handle": "CLOUDFLARENET", "metadata": { "datacenter": "CLOUDFLARENET" } } }, "mobile": { "summary": "Mobile network (Vodafone UK)", "value": { "ip": "42.113.0.1", "trust_score": 9, "is": ["mobile"], "country_code": "GB", "country_name": "United Kingdom", "asn_id": 15440, "asn_handle": "VODAFONE-UK" } }, "tor_exit": { "summary": "Tor exit node", "value": { "ip": "80.67.167.81", "trust_score": 0, "is": ["malicious", "tor", "datacenter"], "country_code": "FR", "country_name": "France", "asn_id": 2027, "asn_handle": "MilkyWan", "metadata": { "tor": { "node_id": "0DC16FEAA5A5E27A9740....", "version": "0.4.8.17", "name": "arecoque5" }, "datacenter": "MilkyWan" }, "malicious": { "ipsum_blacklists": 4, "sources": ["abuseipdb", "ipsum"] } } } } } } }, "400": { "description": "Bad request - invalid IP address format", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "401": { "description": "Unauthorized - invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "429": { "description": "Too many requests - rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "ip", "in": "path", "required": true, "description": "The IP address to analyze (e.g., 1.1.1.1)", "schema": { "type": "string", "format": "ipv4", "example": "1.1.1.1" }, "index$": 0 }, { "name": "api_key", "in": "query", "required": false, "description": "API key for authentication (alternative to X-API-Key header). API keys start with 'zone_' and are 32 characters long.", "schema": { "type": "string", "pattern": "^zone_.{28}$", "example": "zone_your_api_key_here" }, "index$": 1 }], "security": [{}, { "ApiKeyAuth": [] }, { "ApiKeyQuery": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key authentication via header (recommended method). API keys start with 'zone_' and are 32 characters long." }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key authentication via query parameter (alternative method)." } } } });
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