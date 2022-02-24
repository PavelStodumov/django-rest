import React from 'react';
import axios from 'axios'
import './App.css';
import UserList from './components/user.js';
import Footer from './components/footer';
import Menu from './components/menu';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(response => {
      const users = response.data
      this.setState(
        { 'users': users }
      )
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Menu />
        <UserList users={this.state.users} />
        <Footer />
      </div>
    )
  }
}


export default App;

