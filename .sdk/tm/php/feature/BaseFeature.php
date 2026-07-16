<?php
declare(strict_types=1);

// IpIntelligence SDK base feature

class IpIntelligenceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpIntelligenceContext $ctx, array $options): void {}
    public function PostConstruct(IpIntelligenceContext $ctx): void {}
    public function PostConstructEntity(IpIntelligenceContext $ctx): void {}
    public function SetData(IpIntelligenceContext $ctx): void {}
    public function GetData(IpIntelligenceContext $ctx): void {}
    public function GetMatch(IpIntelligenceContext $ctx): void {}
    public function SetMatch(IpIntelligenceContext $ctx): void {}
    public function PrePoint(IpIntelligenceContext $ctx): void {}
    public function PreSpec(IpIntelligenceContext $ctx): void {}
    public function PreRequest(IpIntelligenceContext $ctx): void {}
    public function PreResponse(IpIntelligenceContext $ctx): void {}
    public function PreResult(IpIntelligenceContext $ctx): void {}
    public function PreDone(IpIntelligenceContext $ctx): void {}
    public function PreUnexpected(IpIntelligenceContext $ctx): void {}
}
