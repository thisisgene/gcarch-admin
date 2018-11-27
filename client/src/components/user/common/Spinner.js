import React from 'react'
import spinner from './spinner.gif'

export default function Spinner() {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: '0px auto', display: 'block' }}
      />
    </div>
  )
}
