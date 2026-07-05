-- Typed models for the IpIntelligence SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Api
---@field asn_handle string
---@field asn_id number
---@field country_code string
---@field country_name string
---@field ip string
---@field is table
---@field malicious? table
---@field metadata? table
---@field trust_score number

---@class ApiLoadMatch
---@field id string

---@class Usage
---@field account_level string
---@field current_usage number
---@field monthly_limit number
---@field next_reset string
---@field remaining_request number
---@field usage_percentage number

---@class UsageLoadMatch
---@field account_level? string
---@field current_usage? number
---@field monthly_limit? number
---@field next_reset? string
---@field remaining_request? number
---@field usage_percentage? number

local M = {}

return M
