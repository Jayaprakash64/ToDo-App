from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models import ToDoCreateRequest, ToDoCreateResponse, ToDoTable, ToDoUpdateRequest, ToDoUpdateResponse
from app.db_connection import get_session

router = APIRouter()

@router.post("/todos/", response_model=ToDoCreateResponse, status_code=201)
async def create_todo( todo_data: ToDoCreateRequest, session: Session = Depends(get_session)):
   new_todo = ToDoTable(activity=todo_data.activity)
   session.add(new_todo)
   session.commit()
   session.refresh(new_todo)
   return new_todo

@router.get("/todos/", response_model=list[ToDoCreateResponse])
async def read_todos( session: Session = Depends(get_session)):
    todos = session.exec(select(ToDoTable)).all()
    return todos

@router.patch("/todos/{todo_id}", response_model=ToDoUpdateResponse)
async def update_todo(todo_id: int, todo_update: ToDoUpdateRequest, session: Session = Depends(get_session)):
    todo = session.get(ToDoTable, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    todo.completed = todo_update.completed
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

@router.delete("/todos/{todo_id}", status_code=204)
async def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(ToDoTable, todo_id)  
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(todo)
    session.commit()