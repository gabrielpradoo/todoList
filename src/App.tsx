import { useEffect, useState } from 'react'
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import './App.css';

interface TodoProps {
  todoTitulo: string;
  todoCorpo: string;
  todoImportancia: string;
  todoData: string;
}

function App() {
  /* ------------------- CADASTRO ------------------------ */
  const [todos, setTodos] = useState<TodoProps[]>(JSON.parse(localStorage.getItem('todos') || '')) //
  const [todoTitulo, setTodoTitulo] = useState('')
  const [todoCorpo, setTodoCorpo] = useState('')
  const [todoImportancia, setTodoImportancia] = useState('')
  const [todoData, setTodoData] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTodos(todos => [...todos, { todoTitulo, todoCorpo, todoImportancia, todoData }])

    setTodoTitulo('')
    setTodoCorpo('')
    setTodoImportancia('')
    setTodoData('')
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <h3>Anote aqui suas tarefas</h3>
      <div className='content'>
        <div className="formulario">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
            <TextField
              label="Título do To Do"
              type="text"
              required
              value={todoTitulo}
              onChange={(e) => setTodoTitulo(e.target.value)}
            />

            <TextField
              label="Descrição do To do"
              type="text"
              required
              value={todoCorpo}
              onChange={(e) => setTodoCorpo(e.target.value)}
            />

            <FormControl >
              <InputLabel id="demo-simple-select-helper-label">Importância</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={todoImportancia}
                label="Importância"
                required
                onChange={(e) => setTodoImportancia(e.target.value)}
              >
                <MenuItem value={"Pouco Importante"}>Pouco Importante</MenuItem>
                <MenuItem value={"Importante"}>Importante</MenuItem>
                <MenuItem value={"Muito Importante"}>Muito Importante</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Data de término"
              type="text"
              value={todoData}
              onChange={(e) => setTodoData(e.target.value)}
            />

            <Button variant="contained" type="submit">
              + ADICIONAR NOTA
            </Button>
          </form>
        </div>
        <div className="cards">
          <Grid
            container spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch">
            {todos.map((todo) => (
              <Grid key={todo.todoTitulo} item xs="auto">
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography variant='h5' color="text.secondary" gutterBottom style={{ fontWeight: 'bold' }}>
                      {todo.todoTitulo}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {todo.todoCorpo}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ fontWeight: 'bold' }}>
                      {todo.todoImportancia}
                    </Typography>
                    <Typography variant="body1" component="div" style={{ fontWeight: 'bold' }}>
                      {todo.todoData}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default App
