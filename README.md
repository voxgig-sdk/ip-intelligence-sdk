# IpIntelligence SDK

Classify any IP address by network type, including mobile, datacenter, VPN, and proxy detection

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About IP Intelligence API

[addr.zone](https://addr.zone) is an IP intelligence service that analyzes visitor origins and returns information about the network behind a given IP address. The API focuses on practical classification signals such as whether an address belongs to a mobile carrier, a datacenter, a VPN provider, or a proxy.

What you get from the API:

- IP classification and network metadata for any IPv4/IPv6 address
- Network type identification (mobile, datacenter, VPN, proxy)
- Simple JSON responses suited to embedding in lightweight clients

Requests follow a path-style pattern such as `GET https://addr.zone/api/1.1.1.1`. The catalogue listing on Free Public APIs notes generous daily usage limits and a JSON response format; CORS is disabled, so calls are best made from a server-side runtime.

## Try it

**TypeScript**
```bash
npm install ip-intelligence
```

**Python**
```bash
pip install ip-intelligence-sdk
```

**PHP**
```bash
composer require voxgig/ip-intelligence-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ip-intelligence-sdk/go
```

**Ruby**
```bash
gem install ip-intelligence-sdk
```

**Lua**
```bash
luarocks install ip-intelligence-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { IpIntelligenceSDK } from 'ip-intelligence'

const client = new IpIntelligenceSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ip-intelligence-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ip-intelligence": {
      "command": "/abs/path/to/ip-intelligence-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Api** | Catch-all grouping for the IP lookup operation exposed at `/api/{ip}`, which returns network and classification data for a single address. | `/api/{ip}` |
| **Usage** | Operational metadata around the lookup endpoint, such as request accounting against the service's daily usage limits. | `/api/usage` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ipintelligence_sdk import IpIntelligenceSDK

client = IpIntelligenceSDK({})


# Load a specific api
api, err = client.Api(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'ipintelligence_sdk.php';

$client = new IpIntelligenceSDK([]);


// Load a specific api
[$api, $err] = $client->Api(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ip-intelligence-sdk/go"

client := sdk.NewIpIntelligenceSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "IpIntelligence_sdk"

client = IpIntelligenceSDK.new({})


# Load a specific api
api, err = client.Api(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ip-intelligence_sdk")

local client = sdk.new({})


-- Load a specific api
local api, err = client:Api(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IpIntelligenceSDK.test()
const result = await client.Api().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IpIntelligenceSDK.test(None, None)
result, err = client.Api(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IpIntelligenceSDK::test(null, null);
[$result, $err] = $client->Api(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Api(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IpIntelligenceSDK.test(nil, nil)
result, err = client.Api(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Api(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the IP Intelligence API

- Upstream: [https://addr.zone](https://addr.zone)
- API docs: [https://addr.zone/docs](https://addr.zone/docs)

---

Generated from the IP Intelligence API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
