import React from 'react'
import styled from 'styled-components'

import Login from '../components/Login'
import Messages from '../components/Messages'

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #491e97;
`

const Content = styled.div`
  max-width: 600px;
  height: 100%;
  padding: 20px;
  color: white;
  margin: 0 auto;
`

const Heading = styled.div`
  text-align: center;
  font-size: 2rem;
  line-height: 5rem;
  font-weight: 800;
`

const Logout = styled.div`
  margin: 10px 0;
  text-align: center;
  color: #3ba9d6;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
`

export default class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      token: localStorage.getItem('dotangad.hianon.token')
    }
  }

  logout = () => {
    localStorage.removeItem('dotangad.hianon.token')
    this.setState({ token: '' })
  }

  render() {
    return (
      <ContentContainer>
        <Content>
          <Heading>HiAnon Admin</Heading>

          {!this.state.token ? (
            <Login onAuthOver={token => this.setState({ token })} />
          ) : (
            <>
              <Logout onClick={this.logout}>Logout</Logout>
              <Messages onAuthFail={() => this.setState({ token: '' })} />
            </>
          )}
        </Content>
      </ContentContainer>
    )
  }
}
