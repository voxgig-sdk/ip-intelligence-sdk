<?php
declare(strict_types=1);

// IpIntelligence SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IpIntelligenceUtility::setRegistrar(function (IpIntelligenceUtility $u): void {
    $u->clean = [IpIntelligenceClean::class, 'call'];
    $u->done = [IpIntelligenceDone::class, 'call'];
    $u->make_error = [IpIntelligenceMakeError::class, 'call'];
    $u->feature_add = [IpIntelligenceFeatureAdd::class, 'call'];
    $u->feature_hook = [IpIntelligenceFeatureHook::class, 'call'];
    $u->feature_init = [IpIntelligenceFeatureInit::class, 'call'];
    $u->fetcher = [IpIntelligenceFetcher::class, 'call'];
    $u->make_fetch_def = [IpIntelligenceMakeFetchDef::class, 'call'];
    $u->make_context = [IpIntelligenceMakeContext::class, 'call'];
    $u->make_options = [IpIntelligenceMakeOptions::class, 'call'];
    $u->make_request = [IpIntelligenceMakeRequest::class, 'call'];
    $u->make_response = [IpIntelligenceMakeResponse::class, 'call'];
    $u->make_result = [IpIntelligenceMakeResult::class, 'call'];
    $u->make_point = [IpIntelligenceMakePoint::class, 'call'];
    $u->make_spec = [IpIntelligenceMakeSpec::class, 'call'];
    $u->make_url = [IpIntelligenceMakeUrl::class, 'call'];
    $u->param = [IpIntelligenceParam::class, 'call'];
    $u->prepare_auth = [IpIntelligencePrepareAuth::class, 'call'];
    $u->prepare_body = [IpIntelligencePrepareBody::class, 'call'];
    $u->prepare_headers = [IpIntelligencePrepareHeaders::class, 'call'];
    $u->prepare_method = [IpIntelligencePrepareMethod::class, 'call'];
    $u->prepare_params = [IpIntelligencePrepareParams::class, 'call'];
    $u->prepare_path = [IpIntelligencePreparePath::class, 'call'];
    $u->prepare_query = [IpIntelligencePrepareQuery::class, 'call'];
    $u->result_basic = [IpIntelligenceResultBasic::class, 'call'];
    $u->result_body = [IpIntelligenceResultBody::class, 'call'];
    $u->result_headers = [IpIntelligenceResultHeaders::class, 'call'];
    $u->transform_request = [IpIntelligenceTransformRequest::class, 'call'];
    $u->transform_response = [IpIntelligenceTransformResponse::class, 'call'];
});
