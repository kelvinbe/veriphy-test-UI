import React, {useState, useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {signUp, signIn} from './Auth'


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const  initalState = {firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''} 

    const [FormData, setFormData] = useState(initalState)
    const [isSignUp, setIsSignUp] = useState(false)
    const [FormErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmit(true)
        setFormErrors(validate(FormData))


        if(isSignUp){

            const data = await signUp(FormData)

            setIsSubmit(true)
            dispatch({type: "GET_USER_AUTH", data})
            setIsSignUp(false)
        }else{
            const data = await signIn(FormData)
            setFormErrors(validate(FormData))

            dispatch({type: "GET_USER_AUTH", data})
            navigate('/dashboard')
        }
        console.log(FormData)
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!values.firstName){
           errors.firstName = "First Name is required!"
        }
        if(!values.lastName){
            errors.lastName = "Last Name is required!"
        }
        if(!values.password){
            errors.password = "Password is required!"
        }else if(values.password.length < 4){
            errors.password = "Password must be more than 4 characters!"

        }
        if(!values.email){
            errors.email = "Email is required!"
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid Email!"

        }
        if(!values.phone){
            errors.phone = "Phone Number is required!"
        }
        if(!values.confirmPassword){
            errors.confirmPassword = "Confrirm Password is required!"
        }else if(
            values.confirmPassword !== values.password
        ){
            errors.confirmPassword = "Password do not match!"
        }
        return errors
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }


    const handleChange = (e) => {

        const name = e.target.name
        setFormData({ ...FormData,[name]: e.target.value })
    }

    const switchMode = () => [
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    ]

    useEffect(() => {
        console.log(FormErrors)
        if(Object.keys(FormErrors).length === 0 && isSubmit){
            console.log(FormData)
        }
    }, [FormErrors])


    const paperStyle = {padding: '30px 20px', width: 300, margin: "20px auto"}
    const headerStyle = {margin:0}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>

                    </Avatar>
                <h2 style={headerStyle}>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <Typography gutterBottom variant='caption'>
              { isSignUp ? 'Please fill this form to create an account' : 'Please Sign In'}
                </Typography>

                </Grid>
               

               
                <form onSubmit={handleSubmit}>
                {isSignUp && (
                    <>
                    <TextField type='text' name='firstName' fullWidth label='First Name' variant='standard' placeholder='Enter your name' onChange={handleChange}/>
                    <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.firstName}</p>
                    <TextField type='text' name='lastName' fullWidth label='Last Name' variant='standard' placeholder='Enter your name' onChange={handleChange}/>
                    <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.lastName}</p>

                    <TextField type='text' name='phone' fullWidth label='Phone Number' variant='standard' placeholder='Enter your phone number' onChange={handleChange}/>
                    <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.phone}</p>

                    </>
                    )}
                    <TextField type='email' name='email' fullWidth label='Email' variant='standard' placeholder='Enter your email' onChange={handleChange}/>
                    <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.email}</p>

                    <TextField type='password' name='password' fullWidth label='Password' variant='standard' placeholder='Enter your password' onChange={handleChange}/>
                    <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.password}</p>

                  { isSignUp && <TextField type='password' name='confirmPassword' fullWidth label='Confirm Passoword' variant='standard' placeholder='Confirm your password' onChange={handleChange}/>

                  }
                    {isSignUp && <p style={{textAlign: 'initial', color: 'red', fontSize: 12}}>{FormErrors.confirmPassword}</p> }
                   
                    <Button style={{marginTop: 20 }} type='submit' variant='contained' color='primary'>
                       {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container justify='flex-end'>
                        <Grid item>
                    <Button onClick={switchMode}>
                        {isSignUp ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                    </Button>
                    </Grid>
                    </Grid>

                </form>

            </Paper>
        </Grid>
    )


}



export default SignUp