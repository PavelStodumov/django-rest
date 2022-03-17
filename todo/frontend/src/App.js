import React from 'react';
import axios from 'axios'
import './App.css';
import UserList from './components/user.js';
import Footer from './components/footer';
import Menu from './components/menu';
import Header from './components/header';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'menuList': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      const users = response.data.results
      this.setState(
        { 'users': users }
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
      <div class="container">
        <Header />
        <div class="content">
          <Menu menuList={this.state.menuList} />
          <UserList users={this.state.users} />
        </div>
        <Footer />
      </div>
    )
  }
}


export default App;

