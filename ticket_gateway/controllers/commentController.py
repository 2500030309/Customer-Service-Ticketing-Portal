from fastapi import APIRouter
from fastapi.responses import JSONResponse
import httpx
from httpx import RequestError

from models.schemas import CommentSchema

router = APIRouter(prefix="/comments", tags=["Comments"])

NODE_COMMENTS_URL = "http://localhost:9000"


def _json_or_text(response: httpx.Response):
    try:
        return response.json()
    except ValueError:
        return response.text


def _message_from_payload(payload):
    if isinstance(payload, dict):
        return payload.get("message") or payload.get("error") or payload.get("detail")

    if isinstance(payload, str) and payload.strip():
        return payload

    return "Request failed"


@router.get("/health")
async def comments_health():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{NODE_COMMENTS_URL}/health", timeout=10.0)
    except RequestError as exc:
        return JSONResponse(
            status_code=503,
            content={
                "status": 503,
                "message": f"Comment service error: {exc}",
            },
        )

    payload = _json_or_text(response)

    if response.is_success:
        return payload

    return JSONResponse(
        status_code=response.status_code,
        content={
            "status": response.status_code,
            "message": _message_from_payload(payload),
            "data": payload,
        },
    )


@router.post("/add")
async def add_comment(data: CommentSchema):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{NODE_COMMENTS_URL}/comments/add",
                json=data.model_dump(),
                timeout=10.0,
            )
    except RequestError as exc:
        return JSONResponse(
            status_code=503,
            content={
                "status": 503,
                "message": f"Comment service error: {exc}",
            },
        )

    payload = _json_or_text(response)

    if response.is_success:
        return JSONResponse(status_code=response.status_code, content=payload)

    return JSONResponse(
        status_code=response.status_code,
        content={
            "status": response.status_code,
            "message": _message_from_payload(payload),
            "data": payload,
        },
    )


@router.get("/{ticketNumber}")
async def get_comments(ticketNumber: int):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{NODE_COMMENTS_URL}/comments/{ticketNumber}",
                timeout=10.0,
            )
    except RequestError as exc:
        return JSONResponse(
            status_code=503,
            content={
                "status": 503,
                "message": f"Comment service error: {exc}",
            },
        )

    payload = _json_or_text(response)

    if response.is_success:
        return payload

    return JSONResponse(
        status_code=response.status_code,
        content={
            "status": response.status_code,
            "message": _message_from_payload(payload),
            "data": payload,
        },
    )
