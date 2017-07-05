import React, {Component} from 'react'
import {LinearGradient} from 'expo'

const LinearGradient = props => {
  return (
    <LinearGradient
      colors={['#304352', '#d7d2cc']}
      style={{
        flex: 1,
        padding: 15,
      }}
    >
      {props.children}
    </LinearGradient>
  )
}

export default LinearGradient
