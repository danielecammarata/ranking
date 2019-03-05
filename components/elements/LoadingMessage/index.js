import React, { useState, useEffect } from 'react'

const LoadingMessage = ({
  children
}) => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShowLoading(false), 1000)

      // this will clear Timeout when component unmont like in willComponentUnmount
      return () => {
        clearTimeout(timer1)
      }
    },
    [] //useEffect will run only one time
  )

  if (showLoading) {
    return (
      <div
        style={{
          backgroundImage: 'url(/img/scoreza_loading.gif)',
          height: '150px',
          width: '150px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'absolute',
          margin: 'auto',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      />
    )
  } else {
    return <div>{children}</div>
  }
}

export default LoadingMessage
