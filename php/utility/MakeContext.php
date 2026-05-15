<?php
declare(strict_types=1);

// IpIntelligence SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpIntelligenceMakeContext
{
    public static function call(array $ctxmap, ?IpIntelligenceContext $basectx): IpIntelligenceContext
    {
        return new IpIntelligenceContext($ctxmap, $basectx);
    }
}
