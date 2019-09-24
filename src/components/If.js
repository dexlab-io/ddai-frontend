import React from 'react'

function IF (props) {
  return (
    <div>
      { props.what ? props.children : null }
    </div>
  )
}

export default IF;