import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }
  )
  
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  
  Togglable.displayName = 'Togglable'

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <br />
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button onClick={toggleVisibility}>{props.Hidelabel}</button>
      </div>
    </div>
  )
})

export default Togglable