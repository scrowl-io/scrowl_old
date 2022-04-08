import React from 'react'

export const Route = '/'
export const Name = 'Home'

export const Element = () => {
  return (
    <div>
      <h1>{Name} Page</h1>
    </div>
  )
}

export default {
  Name,
  Route,
  Element,
}
