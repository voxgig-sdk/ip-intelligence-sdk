# IpIntelligence SDK utility: make_context

from projectname_sdk.core.context import IpIntelligenceContext


def make_context_util(ctxmap, basectx):
    return IpIntelligenceContext(ctxmap, basectx)
