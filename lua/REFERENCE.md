# IpIntelligence Lua SDK Reference

Complete API reference for the IpIntelligence Lua SDK.


## IpIntelligenceSDK

### Constructor

```lua
local sdk = require("ip-intelligence_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Api(data)`

Create a new `Api` entity instance. Pass `nil` for no initial data.

#### `Usage(data)`

Create a new `Usage` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ApiEntity

```lua
local api = client:api(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn_handle` | ``$STRING`` | Yes |  |
| `asn_id` | ``$INTEGER`` | Yes |  |
| `country_code` | ``$STRING`` | Yes |  |
| `country_name` | ``$STRING`` | Yes |  |
| `ip` | ``$STRING`` | Yes |  |
| `is` | ``$ARRAY`` | Yes |  |
| `malicious` | ``$OBJECT`` | No |  |
| `metadata` | ``$OBJECT`` | No |  |
| `trust_score` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:api():load({ id = "api_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UsageEntity

```lua
local usage = client:usage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_level` | ``$STRING`` | Yes |  |
| `current_usage` | ``$INTEGER`` | Yes |  |
| `monthly_limit` | ``$INTEGER`` | Yes |  |
| `next_reset` | ``$STRING`` | Yes |  |
| `remaining_request` | ``$INTEGER`` | Yes |  |
| `usage_percentage` | ``$NUMBER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:usage():load({ id = "usage_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

