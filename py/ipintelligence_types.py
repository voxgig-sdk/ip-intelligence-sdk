# Typed models for the IpIntelligence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Api:
    asn_handle: str
    asn_id: int
    country_code: str
    country_name: str
    ip: str
    trust_score: int
    malicious: Optional[dict] = None
    metadata: Optional[dict] = None


@dataclass
class ApiLoadMatch:
    id: str


@dataclass
class Usage:
    account_level: str
    current_usage: int
    monthly_limit: int
    next_reset: str
    remaining_request: int
    usage_percentage: float


@dataclass
class UsageLoadMatch:
    account_level: Optional[str] = None
    current_usage: Optional[int] = None
    monthly_limit: Optional[int] = None
    next_reset: Optional[str] = None
    remaining_request: Optional[int] = None
    usage_percentage: Optional[float] = None

