from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os
import httpx
from httpx import RequestError

from models.schemas import SigninSchema, SignupSchema

router = APIRouter(prefix="/auth", tags=["Authentication"])

SPRING_URL = os.getenv("SPRING_URL", "http://localhost:8002")


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


async def _request_spring(
    client: httpx.AsyncClient,
    method: str,
    paths: list[str],
    payload: dict | None,
):
    for path in paths:
        response = await client.request(
            method,
            f"{SPRING_URL}{path}",
            json=payload,
            timeout=10.0,
        )

        if response.status_code != 404:
            return response

    return response


async def _proxy_with_fallback(method: str, paths: list[str], payload: dict | None = None):
    try:
        async with httpx.AsyncClient() as client:
            response = await _request_spring(client, method, paths, payload)

    except RequestError as exc:
        return JSONResponse(
            status_code=503,
            content={
                "status": 503,
                "message": f"Upstream service error: {exc}",
            },
        )

    data = _json_or_text(response)

    if response.is_success:
        return {
            "status": response.status_code,
            "data": data,
        }

    return JSONResponse(
        status_code=response.status_code,
        content={
            "status": response.status_code,
            "message": _message_from_payload(data),
            "data": data,
        },
    )


@router.post("/signup")
async def signup(data: SignupSchema):
    return await _proxy_with_fallback(
        "POST",
        ["/users/signup", "/auth/signup", "/signup"],
        data.model_dump(),
    )


@router.post("/signin")
async def signin(data: SigninSchema):
    return await _proxy_with_fallback(
        "POST",
        ["/users/signin", "/auth/signin", "/signin"],
        data.model_dump(),
    )


@router.get("/users/all")
async def get_all_users():
    return await _proxy_with_fallback(
        "GET",
        ["/auth/users/all", "/users/all"],
    )

from models.schemas import (
    SignupSchema,
    SigninSchema,
    UserSchema
)

@router.post("/saveuser")
async def save_user(data: UserSchema):

    async with httpx.AsyncClient() as client:

        response = await client.post(
            f"{SPRING_URL}/users/saveuser",
            json=data.model_dump()
        )

    return response.json()


@router.get("/getuser/{id}")
async def get_user(id: int):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            f"{SPRING_URL}/users/getuser/{id}"
        )

    return response.json()


@router.put("/updateuser/{id}")
async def update_user(
        id: int,
        data: UserSchema):

    async with httpx.AsyncClient() as client:

        response = await client.put(
            f"{SPRING_URL}/users/updateuser/{id}",
            json=data.model_dump()
        )

    return response.json()


@router.delete("/deleteuser/{id}")
async def delete_user(id: int):

    async with httpx.AsyncClient() as client:

        response = await client.delete(
            f"{SPRING_URL}/users/deleteuser/{id}"
        )

    return response.json()
