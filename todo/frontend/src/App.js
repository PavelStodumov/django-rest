import React from 'react';
import axios from 'axios'
import './App.css';
import UserList from './components/users.js';
import Footer from './components/footer';
import Menu from './components/menu';
import Header from './components/header';
import ProjectList from './components/projects';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TodosList from './components/todos';
import User from './components/user';


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
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      const users = response.data.results
      this.setState(
        { 'users': users }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
      const projects = response.data.results
      this.setState(
        { 'projects': projects }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
      const todos = response.data.results
      this.setState(
        { 'todos': todos }
      )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/').then(response => {
      const menuList = response.data
      this.setState(
        { 'menuList': menuList }
      )
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="content">

          <BrowserRouter>
            <Menu menuList={this.state.menuList} />
            <Routes>
              <Route path='/users' element={<UserList users={this.state.users} />} />
              <Route path='/users/:id' element={<User users={this.state.users} projects={this.state.projects} />} />
              <Route path='/projects' element={<ProjectList items={this.state.projects} />} />
              <Route path='/todos' element={<TodosList items={this.state.todos} />} />

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

