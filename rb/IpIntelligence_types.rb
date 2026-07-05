# frozen_string_literal: true

# Typed models for the IpIntelligence SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Api entity data model.
#
# @!attribute [rw] asn_handle
#   @return [String]
#
# @!attribute [rw] asn_id
#   @return [Integer]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] country_name
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] is
#   @return [Array]
#
# @!attribute [rw] malicious
#   @return [Hash, nil]
#
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] trust_score
#   @return [Integer]
Api = Struct.new(
  :asn_handle,
  :asn_id,
  :country_code,
  :country_name,
  :ip,
  :is,
  :malicious,
  :metadata,
  :trust_score,
  keyword_init: true
)

# Request payload for Api#load.
#
# @!attribute [rw] id
#   @return [String]
ApiLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Usage entity data model.
#
# @!attribute [rw] account_level
#   @return [String]
#
# @!attribute [rw] current_usage
#   @return [Integer]
#
# @!attribute [rw] monthly_limit
#   @return [Integer]
#
# @!attribute [rw] next_reset
#   @return [String]
#
# @!attribute [rw] remaining_request
#   @return [Integer]
#
# @!attribute [rw] usage_percentage
#   @return [Float]
Usage = Struct.new(
  :account_level,
  :current_usage,
  :monthly_limit,
  :next_reset,
  :remaining_request,
  :usage_percentage,
  keyword_init: true
)

# Request payload for Usage#load.
#
# @!attribute [rw] account_level
#   @return [String, nil]
#
# @!attribute [rw] current_usage
#   @return [Integer, nil]
#
# @!attribute [rw] monthly_limit
#   @return [Integer, nil]
#
# @!attribute [rw] next_reset
#   @return [String, nil]
#
# @!attribute [rw] remaining_request
#   @return [Integer, nil]
#
# @!attribute [rw] usage_percentage
#   @return [Float, nil]
UsageLoadMatch = Struct.new(
  :account_level,
  :current_usage,
  :monthly_limit,
  :next_reset,
  :remaining_request,
  :usage_percentage,
  keyword_init: true
)

