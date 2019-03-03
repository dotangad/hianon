import React from 'react'
import styled from 'styled-components'

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

export default () => (
  <Footer>
    <div>
      Made with <span style={{ color: 'red' }}>&lt;3</span> and JavaScript by{' '}
      <a href="https://angadsingh.co">dotangad</a>
    </div>
  </Footer>
)
