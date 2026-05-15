# IpIntelligence SDK utility: make_error

from __future__ import annotations
from core.operation import IpIntelligenceOperation
from core.result import IpIntelligenceResult
from core.control import IpIntelligenceControl
from core.error import IpIntelligenceError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import IpIntelligenceContext
        ctx = IpIntelligenceContext({}, None)

    op = ctx.op
    if op is None:
        op = IpIntelligenceOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = IpIntelligenceResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, IpIntelligenceError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "IpIntelligenceSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = IpIntelligenceError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, IpIntelligenceError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata, None

    return None, sdk_err
