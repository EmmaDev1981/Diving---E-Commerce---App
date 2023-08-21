import React from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import {auth} from '../../firebase/firebase.utils'
import './header.styles.scss'

import { ReactComponent as Logo} from '../../assets/crown.svg'

const Header = () => {
    const currentUser = useSelector((state) => state.user.currentUser)
    console.log(currentUser)
    const dispatch = useDispatch()

    const handleSignOut = async () => {
        await auth.signOut()
        dispatch(setCurrentUser(null))
    }


    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            {
                currentUser ? (<h4>Welcome, {currentUser?.user?.displayName}</h4>) : (null)
            }
            <div className="options">
                <Link className="option" to='/shop'>
                    SHOP
                </Link>
                <Link className="option" to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ?
                    <div className="option" onClick={handleSignOut}>SIGN OUT</div>
                    :
                    <Link className="option" to='/signin' >SIGN IN</Link>
                }
            </div>
        </div>
    )
}

export default Header;