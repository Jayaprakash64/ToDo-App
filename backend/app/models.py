from sqlmodel import SQLModel, Field
from typing import Optional

class ToDoTable(SQLModel, table=True):
    __tablename__ = "todos"
    id : Optional[int] = Field(default=None, primary_key=True)
    activity: str = Field( max_length=50)
    completed: bool = Field(default=False)

class ToDoCreateRequest(SQLModel):
    activity: str = Field(..., min_length = 1, max_length=30)

class ToDoCreateResponse(SQLModel):
    id: int
    activity: str
    completed: bool

class ToDoUpdateRequest(SQLModel):
    completed: bool

class ToDoUpdateResponse(SQLModel):
    id: int
    completed: bool


    