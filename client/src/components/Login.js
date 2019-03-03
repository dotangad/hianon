import React from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
  height: calc(100% - 5rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  max-width: 400px;
  width: 80%;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  color: #491e97;
  background: white;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  justify-self: flex-start;
  margin: 10px 0;
  &:focus {
    outline: none;
  }
`

const Error = styled.div`
  color: #ff4343;
  margin: 10px 0;
`

export default class Login extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }

  handleChange = e => this.setState({ [e.target.id]: e.target.value })

  login = () => {
    const { username, password } = this.state
    if (!username || !password) {
      this.setState({ error: 'No empty fields please!' })
      return
    }

    // Fetch token
    fetch('/api/auth/login', {
      method: 'POST',
      cors: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          localStorage.setItem('dotangad.hianon.token', res.token)
          this.props.onAuthOver(res.token)
          return
        }

        this.setState({ error: 'lol nice try' })
        return
      })
      .catch(err => {
        console.log(err)
        this.setState({ error: `An error ocurred (code ${err.code}).` })
      })
  }

  render() {
    return (
      <LoginContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Input
            id="username"
            onChange={this.handleChange}
            type="text"
            placeholder="Username"
          />
          <Input
            id="password"
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
          <Button onClick={this.login}>Login</Button>
          {this.state.error ? <Error>{this.state.error}</Error> : ''}
        </div>
      </LoginContainer>
    )
  }
}
