import React from 'react'

export default ({ id, name, title }) => (
  <div key={id} className="novel">
    {`${title} by ${name}`}
  </div>
)
