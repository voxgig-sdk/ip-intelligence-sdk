# IpIntelligence SDK utility: make_context

from core.context import IpIntelligenceContext


def make_context_util(ctxmap, basectx):
    return IpIntelligenceContext(ctxmap, basectx)
