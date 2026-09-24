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
(0, node_test_1.describe)('UsageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IP_INTELLIGENCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IP_INTELLIGENCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpIntelligenceSDK.test();
        const ent = testsdk.Usage();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IP_INTELLIGENCE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'usage.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "account_level": { "a": true, "h": "Account Level", "n": "account_level", "r": true, "sh": "Account tier level", "t": "`$STRING`", "key$": "account_level", "index$": 0 }, "current_usage": { "a": true, "h": "Current Usage", "n": "current_usage", "r": true, "sh": "Number of API requests used in the current billing period", "t": "`$INTEGER`", "key$": "current_usage", "index$": 1 }, "monthly_limit": { "a": true, "h": "Monthly Limit", "n": "monthly_limit", "r": true, "sh": "Total monthly request limit for this account", "t": "`$INTEGER`", "key$": "monthly_limit", "index$": 2 }, "next_reset": { "a": true, "fo": "date-time", "h": "Next Reset", "n": "next_reset", "r": true, "sh": "ISO 8601 timestamp when the usage counter resets", "t": "`$STRING`", "key$": "next_reset", "index$": 3 }, "remaining_requests": { "a": true, "h": "Remaining Requests", "n": "remaining_requests", "r": true, "sh": "Number of requests remaining in the current billing period", "t": "`$INTEGER`", "key$": "remaining_requests", "index$": 4 }, "usage_percentage": { "a": true, "fo": "float", "h": "Usage Percentage", "n": "usage_percentage", "r": true, "sh": "Percentage of monthly limit used", "t": "`$NUMBER`", "key$": "usage_percentage", "index$": 5 } }, "name": "usage", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/usage", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/usage", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "usage" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "usage", "name__orig": "usage", "Name": "Usage", "name_": "usage", "name-": "usage", "NAME": "USAGE", "index$": 1 }, { "active": true, "entity": "usage", "key$": "BasicUsageFlow", "kind": "basic", "name": "BasicUsageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "usage_ref01", "srcdatavar": "usage_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-usage_ref01" } }], "index$": 0 }] }, 'Usage', { "GET /api/usage": { "protocol": "http", "operationId": "getUsageStats", "responses": { "200": { "description": "Successful response with usage statistics", "content": { "application/json": { "schema": { "type": "object", "required": ["account_level", "current_usage", "monthly_limit", "usage_percentage", "remaining_requests", "next_reset"], "properties": { "account_level": { "description": "Account tier level", "example": "developer", "key$": "account_level", "type": "string" }, "current_usage": { "description": "Number of API requests used in the current billing period", "example": 5000, "key$": "current_usage", "type": "integer" }, "monthly_limit": { "description": "Total monthly request limit for this account", "example": 100000, "key$": "monthly_limit", "type": "integer" }, "usage_percentage": { "description": "Percentage of monthly limit used", "example": 5, "format": "float", "key$": "usage_percentage", "type": "number" }, "remaining_requests": { "description": "Number of requests remaining in the current billing period", "example": 95000, "key$": "remaining_requests", "type": "integer" }, "next_reset": { "description": "ISO 8601 timestamp when the usage counter resets", "example": "2025-02-01T00:00:00Z", "format": "date-time", "key$": "next_reset", "type": "string" } }, "x-ref": "#/components/schemas/UsageResponse", "index$": 0 }, "example": { "account_level": "developer", "current_usage": 5000, "monthly_limit": 100000, "usage_percentage": 5, "remaining_requests": 95000, "next_reset": "2025-02-01T00:00:00Z" } } } }, "401": { "description": "Unauthorized - API key required", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key authentication via header (recommended method). API keys start with 'zone_' and are 32 characters long." }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key authentication via query parameter (alternative method)." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let usage_ref01_data = Object.values(setup.data.existing.usage)[0];
        // LOAD
        const usage_ref01_ent = client.Usage();
        const usage_ref01_match_dt0 = {};
        const usage_ref01_data_dt0 = (await usage_ref01_ent.load(usage_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != usage_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/usage/UsageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpIntelligenceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['usage01', 'usage02', 'usage03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IP_INTELLIGENCE_TEST_USAGE_ENTID': idmap,
        'IP_INTELLIGENCE_TEST_LIVE': 'FALSE',
        'IP_INTELLIGENCE_TEST_EXPLAIN': 'FALSE',
        'IP_INTELLIGENCE_APIKEY': '',
    });
    idmap = env['IP_INTELLIGENCE_TEST_USAGE_ENTID'];
    const live = 'TRUE' === env.IP_INTELLIGENCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IP_INTELLIGENCE_TEST_USAGE_ENTID'];
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
//# sourceMappingURL=UsageEntity.test.js.map