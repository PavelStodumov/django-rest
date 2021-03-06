import React from 'react';
import axios from 'axios'
import './App.css';
import UserList from './components/users.js';
import Footer from './components/footer';
import Menu from './components/menu';
import Header from './components/header';
import ProjectList from './components/projects';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import TodosList from './components/todos';
import User from './components/user';
import LoginForm from './components/auth';
import Cookies from 'universal-cookie';
import TodoForm from './components/TodoForm';


const NotFound404 = () => {
  let location = useLocation()
  return (
    <span className='notfound404'>
      <h1>Page<p>{location.pathname}</p>not found</h1>
    </span>
  )
}

const UnAthorized401 = () => {
  return (
    <div>
      <h1>Эту страницу могут просматривать только авторизованные пользователи</h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'menuList': [],
      'token': '',
      'accesstoken': '',
      'refreshtoken': '',
      'username': '',
    }
  }

  is_authenticated() {
    return this.state.accesstoken != ''
  }


  set_token(accesstoken, refreshtoken, username) {
    this.setState({ 'username': username })
    const cookies = new Cookies()
    cookies.set('username', username)
    cookies.set('refreshtoken', refreshtoken)
    this.setState({ 'refreshtoken': refreshtoken })
    cookies.set('accesstoken', accesstoken)
    this.setState({ 'accesstoken': accesstoken }, () => this.load_data())
  }

  logout() {
    this.set_token('', '', '')
  }


  get_token_from_storage() {
    const cookies = new Cookies()
    const accesstoken = cookies.get('accesstoken')
    const username = cookies.get('username')
    this.setState({ 'username': username })
    this.setState({ 'accesstoken': accesstoken }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api/jwt_token/', { "username": username, "password": password }).then(response => this.set_token(
      response.data['access'],
      response.data['refresh'],
      response.data['firstName']
    )).catch(error => alert('Неверный логин или пароль'))
  }

  refresh_token() {
    let cookies = new Cookies()
    let refresh_token = cookies.get('refreshtoken')
    axios.post('http://127.0.0.1:8000/api/jwt_token/refresh/', { "refresh": refresh_token }).then(response => this.set_token(
      response.data['access'],
      response.data['refresh'],
      this.state.username
    )).catch(error => console.log(error))
  }

  get_headers() {
    let headers = { 'Content-Type': 'application/json' }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Bearer ' + this.state.accesstoken
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/0.1/users/', { headers }).then(response => this.setState({ 'users': response.data.results })).catch(error => {
      console.log(error)
      this.setState({ 'users': [] })
    })
    axios.get('http://127.0.0.1:8000/api/0.1/projects/', { headers }).then(response => this.setState({ 'projects': response.data.results })).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/0.1/todos/', { headers }).then(response => this.setState({ 'todos': response.data.results })).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/0.1/').then(response => this.setState({ 'menuList': response.data })).catch(error => console.log(error))
  }

  createTodo(project, text, user) {
    this.refresh_token()
    const headers = this.get_headers()
    const data = { 'project': project, 'text': text, 'user': user }
    axios.post('http://127.0.0.1:8000/api/0.1/todos/', data, { headers }).then(response => {
      let new_todo = response.data
      const project = this.state.projects.filter((item) => item.id == new_todo.project)[0]
      const user = this.state.users.filter((item) => item.id == new_todo.user)[0]
      new_todo.project = project
      new_todo.user = user
      this.setState({ 'todos': [...this.state.todos, new_todo] })
    }).catch(error => console.log(error))
  }

  deleteTodo(id) {
    this.refresh_token()
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/0.1/todos/${id}/`, { headers }).then(response => {
      this.setState({ 'todos': this.state.todos.filter((item) => item.id != id) })
    }).catch(error => console.log(error))
  }
  componentDidMount() {
    this.refresh_token()
    this.get_token_from_storage()
  }

  render() {
    return (
      <div className="container">
        <Header />

        <div className="content">

          <BrowserRouter>
            <nav className="menu">
              <ul>
                {
                  this.is_authenticated() ? <li>{this.state.username}</li> : <li>Гость</li>
                }
                <li>
                  {
                    this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to="/login">Login</Link>
                  }
                </li>
                <Menu menuList={this.state.menuList} />
              </ul>
            </nav>
            <Routes>
              <Route path='/users' element={<UserList users={this.state.users} />} />
              <Route path='/users/:id' element={
                this.is_authenticated() ? <User users={this.state.users} projects={this.state.projects} /> :
                  <UnAthorized401 />} />
              <Route path='/projects' element={<ProjectList items={this.state.projects} />} />
              <Route path='/todos' element={<TodosList items={this.state.todos}
                deleteTodo={(id) => this.deleteTodo(id)} />} />
              <Route path='/todos/create' element={< TodoForm users={this.state.users} projects={this.state.projects} createTodo={(project, text, user) => this.createTodo(project, text, user)} />} />
              <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
              <Route path='*' element={<NotFound404 />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    )
  }
}


export default App;

