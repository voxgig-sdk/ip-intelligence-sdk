<?php
declare(strict_types=1);

// IpIntelligence SDK utility: prepare_body

class IpIntelligencePrepareBody
{
    public static function call(IpIntelligenceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
