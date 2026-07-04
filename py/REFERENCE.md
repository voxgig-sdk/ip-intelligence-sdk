# IpIntelligence Python SDK Reference

Complete API reference for the IpIntelligence Python SDK.


## IpIntelligenceSDK

### Constructor

```python
from ip-intelligence_sdk import IpIntelligenceSDK

client = IpIntelligenceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpIntelligenceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IpIntelligenceSDK.test()
```


### Instance Methods

#### `Api(data=None)`

Create a new `ApiEntity` instance. Pass `None` for no initial data.

#### `Usage(data=None)`

Create a new `UsageEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ApiEntity

```python
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.api.load({"id": "api_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageEntity

```python
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.usage.load({"id": "usage_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IpIntelligenceSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

