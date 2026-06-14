from fastapi import APIRouter
import httpx
from httpx import RequestError

from models.schemas import TicketSchema

router = APIRouter(prefix="/tickets", tags=["Tickets"])

SPRING_URL = "http://localhost:8002"


def _json_or_text(response: httpx.Response):
    try:
        return {"status": response.status_code, "data": response.json()}
    except ValueError:
        return {"status": response.status_code, "message": response.text}


# CREATE TICKET
@router.post("/create")
async def create_ticket(data: TicketSchema):
    payload = data.model_dump()

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{SPRING_URL}/tickets/create",
                json=payload,
                timeout=10.0,
            )

    except RequestError as exc:
        return {"status": 503, "message": f"Upstream service error: {exc}"}

    return _json_or_text(response)


# GET ALL
@router.get("/all")
async def get_all_tickets():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{SPRING_URL}/tickets/all", timeout=10.0)

    except RequestError as exc:
        return {"status": 503, "message": f"Upstream service error: {exc}"}

    return _json_or_text(response)


@router.get("")
async def get_tickets():
    return await get_all_tickets()


# UPDATE 
@router.put("/update")
async def update_ticket(data: TicketSchema):
    payload = data.model_dump()

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{SPRING_URL}/tickets/update",
                json=payload,
                timeout=10.0,
            )

    except RequestError as exc:
        return {"status": 503, "message": f"Upstream service error: {exc}"}

    return _json_or_text(response)


@router.put("/{ticketNumber}")
async def update_ticket_by_number(ticketNumber: int, data: dict):
    payload = data.copy()
    payload["ticketNumber"] = payload.get("ticketNumber", ticketNumber)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.put(
                f"{SPRING_URL}/tickets/update",
                json=payload,
                timeout=10.0,
            )

    except RequestError as exc:
        return {"status": 503, "message": f"Upstream service error: {exc}"}

    return _json_or_text(response)


# DELETE 
@router.delete("/delete/{ticketNumber}")
async def delete_ticket(ticketNumber: int):

    try:
        async with httpx.AsyncClient() as client:

            response = await client.delete(
                f"{SPRING_URL}/tickets/delete",
                params={"ticketNumber": ticketNumber},
                timeout=10.0
            )

    except RequestError as exc:
        return {
            "status": 503,
            "message": f"Upstream service error: {exc}"
        }

    return _json_or_text(response)

@router.put("/status/{ticketNumber}")
async def update_ticket_status(
        ticketNumber: int,
        status: str):

    try:
        async with httpx.AsyncClient() as client:

            response = await client.put(
                f"{SPRING_URL}/tickets/status",
                params={
                    "ticketNumber": ticketNumber,
                    "status": status
                }
            )

        return _json_or_text(response)

    except RequestError as exc:

        return {
            "status":503,
            "message":str(exc)
        }