import React from 'react'

function IF (props) {
  return (
    <>
      { props.what ? props.children : null }
    </>
  )
}

export default IF;