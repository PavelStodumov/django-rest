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

const NotFound404 = () => {
  let location = useLocation()
  return (
    <div className='notfound404'>
      <h1>Page<p>{location.pathname}</p>not found</h1>
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
    }
  }

  is_authenticated() {
    return this.state.token != ''
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', { "username": username, "password": password }).then(response => this.set_token(response.data['token'])).catch(error => alert('Неверный логин или пароль'))

  }

  get_headers() {
    let headers = { 'Content-Type': 'application/json' }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', { headers }).then(response => this.setState({ 'users': response.data.results })).catch(error => {
      console.log(error)
      this.setState({ 'users': [] })
    })
    axios.get('http://127.0.0.1:8000/api/projects/', { headers }).then(response => this.setState({ 'projects': response.data.results })).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/todos/', { headers }).then(response => this.setState({ 'todos': response.data.results })).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/', { headers }).then(response => this.setState({ 'menuList': response.data })).catch(error => console.log(error))
  }
  componentDidMount() {
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
              <Route path='/users/:id' element={<User users={this.state.users} projects={this.state.projects} />} />
              <Route path='/projects' element={<ProjectList items={this.state.projects} />} />
              <Route path='/todos' element={<TodosList items={this.state.todos} />} />
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

