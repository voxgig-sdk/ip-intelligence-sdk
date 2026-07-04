# IpIntelligence Ruby SDK Reference

Complete API reference for the IpIntelligence Ruby SDK.


## IpIntelligenceSDK

### Constructor

```ruby
require_relative 'ip-intelligence_sdk'

client = IpIntelligenceSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpIntelligenceSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IpIntelligenceSDK.test
```


### Instance Methods

#### `Api(data = nil)`

Create a new `Api` entity instance. Pass `nil` for no initial data.

#### `Usage(data = nil)`

Create a new `Usage` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ApiEntity

```ruby
api = client.api
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.api.load({ "id" => "api_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApiEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UsageEntity

```ruby
usage = client.usage
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.usage.load({ "id" => "usage_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UsageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IpIntelligenceSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

