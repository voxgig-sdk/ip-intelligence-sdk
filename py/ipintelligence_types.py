# Typed models for the IpIntelligence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ApiRequired(TypedDict):
    asn_handle: str
    asn_id: int
    country_code: str
    country_name: str
    ip: str
    trust_score: int


class Api(ApiRequired, total=False):
    malicious: dict
    metadata: dict


class ApiLoadMatch(TypedDict):
    id: str


class Usage(TypedDict):
    account_level: str
    current_usage: int
    monthly_limit: int
    next_reset: str
    remaining_request: int
    usage_percentage: float


class UsageLoadMatch(TypedDict, total=False):
    account_level: str
    current_usage: int
    monthly_limit: int
    next_reset: str
    remaining_request: int
    usage_percentage: float
