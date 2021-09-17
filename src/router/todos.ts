import { Router } from 'express';
import { Todo } from '../models/todo';

// type casting your data received
type RequestBody = { text: string; }
type RequestParams = { todoId: string }

let todos: Todo[] = []

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ todos });
});

router.post('/todo', (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  res.status(201).json({ message: 'Added Todo', todo: newTodo })
})

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const todoIndex = todos.findIndex(todo => todo.id === params.todoId);
  const body = req.body as RequestBody;

  if (todoIndex >= 0) {
    todos[todoIndex].text = body.text;
    return res.status(200).json({ message: 'Updated todo', todos })
  }

  res.status(404).json({ message: 'Not found' });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter(todo => todo.id !== params.todoId);

  res.status(200).json({ message: 'Deleted Todo', todos })
});

export default router;