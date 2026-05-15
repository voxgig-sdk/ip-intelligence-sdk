<?php
declare(strict_types=1);

// IpIntelligence SDK utility: result_headers

class IpIntelligenceResultHeaders
{
    public static function call(IpIntelligenceContext $ctx): ?IpIntelligenceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
