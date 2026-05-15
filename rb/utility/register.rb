# IpIntelligence SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpIntelligenceUtility.registrar = ->(u) {
  u.clean = IpIntelligenceUtilities::Clean
  u.done = IpIntelligenceUtilities::Done
  u.make_error = IpIntelligenceUtilities::MakeError
  u.feature_add = IpIntelligenceUtilities::FeatureAdd
  u.feature_hook = IpIntelligenceUtilities::FeatureHook
  u.feature_init = IpIntelligenceUtilities::FeatureInit
  u.fetcher = IpIntelligenceUtilities::Fetcher
  u.make_fetch_def = IpIntelligenceUtilities::MakeFetchDef
  u.make_context = IpIntelligenceUtilities::MakeContext
  u.make_options = IpIntelligenceUtilities::MakeOptions
  u.make_request = IpIntelligenceUtilities::MakeRequest
  u.make_response = IpIntelligenceUtilities::MakeResponse
  u.make_result = IpIntelligenceUtilities::MakeResult
  u.make_point = IpIntelligenceUtilities::MakePoint
  u.make_spec = IpIntelligenceUtilities::MakeSpec
  u.make_url = IpIntelligenceUtilities::MakeUrl
  u.param = IpIntelligenceUtilities::Param
  u.prepare_auth = IpIntelligenceUtilities::PrepareAuth
  u.prepare_body = IpIntelligenceUtilities::PrepareBody
  u.prepare_headers = IpIntelligenceUtilities::PrepareHeaders
  u.prepare_method = IpIntelligenceUtilities::PrepareMethod
  u.prepare_params = IpIntelligenceUtilities::PrepareParams
  u.prepare_path = IpIntelligenceUtilities::PreparePath
  u.prepare_query = IpIntelligenceUtilities::PrepareQuery
  u.result_basic = IpIntelligenceUtilities::ResultBasic
  u.result_body = IpIntelligenceUtilities::ResultBody
  u.result_headers = IpIntelligenceUtilities::ResultHeaders
  u.transform_request = IpIntelligenceUtilities::TransformRequest
  u.transform_response = IpIntelligenceUtilities::TransformResponse
}
