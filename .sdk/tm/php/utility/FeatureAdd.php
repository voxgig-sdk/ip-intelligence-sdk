<?php
declare(strict_types=1);

// IpIntelligence SDK utility: feature_add

class IpIntelligenceFeatureAdd
{
    public static function call(IpIntelligenceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
