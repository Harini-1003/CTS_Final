"""Runs a request end to end: score, decide, explain, route, audit."""
import time
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from ..models import AuditEvent, AuthRequest
from . import explain, ml, necessity_engine, routing
<<<<<<< HEAD
=======
from .hospital_predictor import predict_hospital_pa

from ml.feature_schema import derive_features
>>>>>>> origin/HARINI


def log(db: Session, action: str, *, request_id=None, actor=None, detail=None):
    db.add(AuditEvent(
        request_id=request_id,
        actor_id=getattr(actor, "id", None),
        actor_email=getattr(actor, "email", None),
        action=action,
        detail=detail or {},
    ))


def adjudicate(db: Session, req: AuthRequest, actor) -> AuthRequest:
    started = time.perf_counter()
    features = req.features

<<<<<<< HEAD
    policy_fit = ml.predict_policy_fit(features)
    verdict = necessity_engine.evaluate(features, policy_fit)
    attribution = explain.explain_policy_fit(features)
    appeal = ml.predict_appeal(
        features, policy_fit, features.get("clinical_evidence_score")
    )

    from feature_schema import derive_features
=======
    # -----------------------------------------------------------------
    # 1. Score + evaluate, branching on document type
    # -----------------------------------------------------------------
    if features.get("document_type") == "HOSPITAL_PA":
        verdict = predict_hospital_pa(features)
        policy_fit = verdict["policy_fit_score"]

        attribution = {
            "base_score": policy_fit,
            "method": "Hospital PA evidence scoring",
            "contributions": [
                {
                    "feature": c["code"],
                    "label": c["label"],
                    "value": c["observed"],
                    "contribution": c["weight"] if c["passed"] else -c["weight"],
                    "direction": "supports" if c["passed"] else "weakens",
                }
                for c in verdict["criteria"]
            ],
        }

        appeal = {
            "top_class": "NOT_CALCULATED",
            "top_label": "Appeal prediction unavailable for hospital surgical format",
            "top_probability": 0,
            "any_appeal_probability": 0,
            "distribution": [],
        }

    else:
        policy_fit = ml.predict_policy_fit(features)
        verdict = necessity_engine.evaluate(features, policy_fit)
        attribution = explain.explain_policy_fit(features)
        appeal = ml.predict_appeal(
            features,
            policy_fit,
            features.get("clinical_evidence_score"),
        )

    # -----------------------------------------------------------------
    # 2. Persist scores/decision to the request (common to both paths)
    # -----------------------------------------------------------------
>>>>>>> origin/HARINI
    derived = derive_features(features)

    req.policy_fit_score = round(policy_fit, 4)
    req.documentation_score = derived["documentation_score"]
    req.necessity_score = verdict["necessity_score"]
    req.confidence = verdict["confidence"]
    req.criteria = {
        "criteria": verdict["criteria"],
        "rationale": verdict["rationale"],
    }
    req.explanation = attribution
    req.appeal_prediction = appeal
    req.status = verdict["status"]
    req.decision = verdict["decision"]
    req.decision_source = "ENGINE" if verdict["decision"] else None
    req.urgency_score = necessity_engine.urgency_score(
        features, verdict["necessity_score"]
    )

<<<<<<< HEAD
=======
    # -----------------------------------------------------------------
    # 3. Auto-decide or route to a human reviewer
    # -----------------------------------------------------------------
>>>>>>> origin/HARINI
    if verdict["decision"]:
        req.decision_at = datetime.now(timezone.utc)
    else:
        result = routing.assign(db, features)
        req.assigned_reviewer_id = result["reviewer_id"]
        req.assignment_reason = result["reason"]
        req.assignment_was_reassigned = result["reassigned"]
        log(db, "REVIEWER_ASSIGNED", request_id=req.id, actor=actor,
<<<<<<< HEAD
            detail={"reason": result["reason"],
                    "reassigned": result["reassigned"],
                    "candidates": result["candidates"]})

    req.processing_ms = round((time.perf_counter() - started) * 1000, 2)

=======
            detail={
                "reason": result["reason"],
                "reassigned": result["reassigned"],
                "candidates": result["candidates"],
            })

    req.processing_ms = round((time.perf_counter() - started) * 1000, 2)

    # -----------------------------------------------------------------
    # 4. Audit log (always written, both paths)
    # -----------------------------------------------------------------
>>>>>>> origin/HARINI
    log(db, "DECISION_COMPUTED", request_id=req.id, actor=actor, detail={
        "status": req.status,
        "decision": req.decision,
        "policy_fit_score": req.policy_fit_score,
        "necessity_score": req.necessity_score,
        "confidence": req.confidence,
        "processing_ms": req.processing_ms,
        "rationale": verdict["rationale"],
        "failed_criteria": [c["code"] for c in verdict["criteria"] if not c["passed"]],
    })
<<<<<<< HEAD
=======

>>>>>>> origin/HARINI
    return req