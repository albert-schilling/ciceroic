import React from 'react'
import { AuthConsumer } from '../Auth/AuthContext'
import PageLayout from '../PageLayout/PageLayout'

class UserForm extends React.Component {
  emailInput = React.createRef()
  passwordInput = React.createRef()

  render() {
    return (
      <AuthConsumer>
        {({ signUp, logIn, user }) => (
          <React.Fragment>
            <PageLayout title="Login SignUp">
              <div className="signup-wrapper">
                <h2>Create Account</h2>
                <form className="signup-form">
                  <div>
                    <input
                      ref={this.emailInput}
                      type="email"
                      name="email"
                      placeholder="Enter your E-Mail"
                    />
                  </div>
                  <div>
                    <input
                      ref={this.passwordInput}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <button
                      onClick={e =>
                        logIn(
                          this.emailInput.current.value,
                          this.passwordInput.current.value,
                          e
                        )
                      }
                    >
                      Login
                    </button>
                    <button
                      onClick={e =>
                        signUp(
                          this.emailInput.current.value,
                          this.passwordInput.current.value,
                          e
                        )
                      }
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </PageLayout>
          </React.Fragment>
        )}
      </AuthConsumer>
    )
  }
}

export default UserForm
