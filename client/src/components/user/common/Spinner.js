import React from 'react'
import spinner from './spinner_grey.gif'

export default function Spinner() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: '0px auto', display: 'block' }}
      />
    </div>
  )
}
