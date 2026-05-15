<?php
declare(strict_types=1);

// IpIntelligence SDK utility: result_body

class IpIntelligenceResultBody
{
    public static function call(IpIntelligenceContext $ctx): ?IpIntelligenceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
