<?php
declare(strict_types=1);

// Typed models for the IpIntelligence SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Api entity data model. */
class Api
{
    public string $asn_handle;
    public int $asn_id;
    public string $country_code;
    public string $country_name;
    public string $ip;
    public array $is;
    public ?array $malicious = null;
    public ?array $metadata = null;
    public int $trust_score;
}

/** Request payload for Api#load. */
class ApiLoadMatch
{
    public string $id;
}

/** Usage entity data model. */
class Usage
{
    public string $account_level;
    public int $current_usage;
    public int $monthly_limit;
    public string $next_reset;
    public int $remaining_request;
    public float $usage_percentage;
}

/** Request payload for Usage#load. */
class UsageLoadMatch
{
    public ?string $account_level = null;
    public ?int $current_usage = null;
    public ?int $monthly_limit = null;
    public ?string $next_reset = null;
    public ?int $remaining_request = null;
    public ?float $usage_percentage = null;
}

