import React from "react"
import PropTypes from 'prop-types'
export default function LoginForm({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) {
    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
      }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <br />
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    placeholder="Password"
                   onChange={handlePasswordChange}
                />
            </div>
            <br />
            <button type="submit">login</button>
        </form>
    )

}