import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component'
import { setCurrentUser } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import './sign-in.styles.scss';

function SignIn() {

  const dispatch = useDispatch()
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

   const { email, password} = state;

  try {
    await auth.signInWithEmailAndPassword(email, password)
    setState({email: '', password: ''})
    
  }catch (error) {
      console.log(error)
  }

}

const handleChange = event => {
    const {value, name} = event.target;
    setState({[name]: value})
}

const handleGoogleLogIn = async () => {
  const userInfo = await signInWithGoogle()
  if(userInfo){
    dispatch(setCurrentUser(userInfo))
    history.push('/shop')
  }
}

return (
  <div className="sign-in">
    <h2>I already have an account</h2>
    <span>Sign in with your email and password</span>

    <form onSubmit={handleSubmit}>
      <FormInput
        name="email"
        value={state.email}
        label='email'
        handleChange={handleChange}
        required
      />
      <FormInput
        name="password"
        type="password"
        value={state.password}
        label='password'
        handleChange={handleChange}
        required
      />
      <CustomButton type="submit"> SIGN IN </CustomButton>
      <CustomButton onClick={handleGoogleLogIn} > SIGN IN WITH GOOGLE </CustomButton>
    </form>
  </div>
);
}

export default SignIn;