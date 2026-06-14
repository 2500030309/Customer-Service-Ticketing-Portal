from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    phoneNumber: str
    role: int

class SigninSchema(BaseModel):
    email: EmailStr
    password: str

class TicketSchema(BaseModel):
    ticketNumber: int
    username: str
    title: str
    description: str
    status: str | None = None

class CommentSchema(BaseModel):
    ticketNumber: int
    comment: str
    commentBy: str
    status: str | None = None

class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    phoneNumber: str
    role: int
