import React from "react";
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component'
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }

    }

    handleSubmit = async event => {
        event.preventDefault()

       const { email, password} = this.state;

      try {
        await auth.signInWithEmailAndPassword(email, password)
        this.setState({email: '', password: ''})
        
      }catch (error) {
          console.log(error)
      }

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    handleGoogleLogIn = async () => {
      const userInfo = await signInWithGoogle()
      if(userInfo){
        this.props.setCurrentUser(userInfo)
      }
    }

    render() {
        return (
          <div className="sign-in">
            <h2>I already have a account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
              <FormInput
                name="email"
                value={this.state.email}
                label='email'
                handleChange={this.handleChange}
                required
              />
              <FormInput
                name="password"
                type="password"
                value={this.state.password}
                label='password'
                handleChange={this.handleChange}
                required
              />
              <CustomButton type="submit"> SIGN IN </CustomButton>
              <CustomButton onClick={this.handleGoogleLogIn} > SIGN IN WITH GOOGLE </CustomButton>
            </form>
          </div>
        );
    }

};

function mapStateToProps(state) {
  return {
    user: state.user.currentUser
  }
}

export default connect(mapStateToProps, {setCurrentUser})(SignIn);