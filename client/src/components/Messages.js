import React from 'react'
import styled from 'styled-components'

const MessageContent = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin: 10px 0;
`

const Message = styled.div`
  margin: 100px 30px;
`

const MessageAuthor = styled.div`
  text-align: right;
  color: #ddd;
  font-size: 0.9rem;
`

const Messages = ({ messages }) =>
  messages.map((message, i) => (
    <Message key={i}>
      <MessageContent>{message.message}</MessageContent>
      {message.nickname ? (
        <MessageAuthor>{message.nickname}</MessageAuthor>
      ) : (
        ''
      )}
    </Message>
  ))

class MessagesContainer extends React.Component {
  constructor() {
    super()
    this.state = { messages: [], loading: true }
  }

  componentDidMount() {
    fetch('/api/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('dotangad.hianon.token')}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          this.props.onAuthFail()
          return
        }
        this.setState({ messages: res.messages, loading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return this.state.loading ? (
      <div className="loading" />
    ) : (
      <Messages messages={this.state.messages} />
    )
  }
}

export default MessagesContainer
