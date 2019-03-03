import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  height: 90%;
  width: 100%;
  background: #491e97;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Footer = styled.div`
  height: 10%;
  width: 100%;
  background: #491e97;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
`

const HeadingContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Heading = styled.div`
  font-size: 3rem;
  color: white;
  width: 80%;
  font-weight: 800;
`

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`

const FormContainer = styled.div`
  width: 50%;
`

const MessageTextArea = styled.textarea`
  width: 100%;
  height: 7rem;
  border: none;
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`

const AddNickname = styled.div`
  width: 100%;
  text-align: left;
  color: #3ba9d6;
  margin: 20px 0;
  margin-bottom: 0;
  cursor: pointer;
`

const SendButton = styled.button`
  width: auto;
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
  margin: 30px 0;
  &:focus {
    outline: none;
  }
`

const NicknameInput = styled.input`
  width: 100%;
  border: none;
  background: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  transition: 0.3s height ease;
  font-size: 1rem;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`

const Error = styled.div`
  color: #ff4343;
`

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      showNickname: false,
      nickname: '',
      message: '',
      error: '',
      sending: false,
      sent: false,
      response: ''
    }
  }

  handleChange = e =>
    this.setState({ [e.target.id]: e.target.value, error: '' })

  submitMessage = () => {
    if (!this.state.message) {
      this.setState({ error: 'You need to write a message' })
      return
    }

    this.setState({ sending: true })

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.state.showNickname
        ? JSON.stringify({
            message: this.state.message,
            nickname: this.state.nickname
          })
        : JSON.stringify({ message: this.state.message })
    })
      .then(res => res.json())
      .then(res =>
        res.success
          ? this.setState({ sent: true, response: 'Message sent' })
          : this.setState({
              sent: true,
              response: `An error occured (${res.message}).`
            })
      )
      .catch(err =>
        this.setState({
          sent: true,
          response: `An error occured (code: ${err.code}).`
        })
      )
  }

  render() {
    return (
      <FormDiv className="form">
        <FormContainer className="form-container">
          {!(this.state.sending || this.state.sent) ? (
            <>
              <MessageTextArea
                onChange={this.handleChange}
                id="message"
                placeholder="Message"
              />
              <AddNickname
                onClick={() =>
                  this.setState(({ showNickname }) => ({
                    showNickname: !showNickname
                  }))
                }
              >
                {this.state.showNickname ? 'Remove' : 'Add'} nickname
              </AddNickname>
              {this.state.showNickname ? (
                <NicknameInput
                  onChange={this.handleChange}
                  id="nickname"
                  placeholder="Nickname"
                />
              ) : (
                ''
              )}
              <SendButton onClick={this.submitMessage}>Send</SendButton>
            </>
          ) : this.state.sent ? (
            <div style={{ fontSize: '1.5rem', color: 'white' }}>
              {this.state.response}
            </div>
          ) : (
            <div className="loader" />
          )}
          {this.state.error ? <Error>{this.state.error}</Error> : ''}
        </FormContainer>
      </FormDiv>
    )
  }
}

export default () => (
  <>
    <Content className="content">
      <HeadingContainer className="heading-container">
        <Heading>Tell Angad how much you hate him!</Heading>
      </HeadingContainer>
      <Form />
    </Content>
    <Footer>
      <div>
        Made with <span style={{ color: 'red' }}>&lt;3</span> and JavaScript by{' '}
        <a href="https://angadsingh.co">dotangad</a>
      </div>
    </Footer>
  </>
)
