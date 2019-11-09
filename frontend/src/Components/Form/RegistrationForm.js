import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Right from '@material-ui/icons/Done';
import Wrong from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    mainContainer: {
        borderStyle: 'solid',
        borderColor: "#979797",
        borderWidth: 2,
        borderRadius: 40,
        width: '35vw',
        marginTop: '12vh',
        marginBottom: '10vh',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        boxShadow: "0 6px 8px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.24)",
        minWidth: 350,
    },
    button: {
        width: '40%',
        marginTop: '5%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonMobile: {
        width: '60%',
        marginTop: '5%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    signin: {
        color: '#3f51b5',
        fontWeight: 630
    },
    textfieldContainer: {
        minWidth: 200,
        display: 'inline-block',
        textAlign: 'center'
    },
    title: {
        width: 250,
        margin: '5vh 0',
        display: 'inline-block',
        color: '#3f51b5'
    },
    p: {
        marginTop: '8%',
        marginBottom: '8%',
    },
    error: {
        margin: 0,
        color: "#AC101D",
        fontSize: 14,
        marginTop: 15,
    },
});

const onMouseOut = event => {
    const el = event.target;
    el.style.color = '#3f51b5';
}

const onMouseOver = event => {
    const el = event.target;
    el.style.color = "#081769"
}

class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            firstError: false,
            lastError: false,
            email: '',
            password: '',
            confirmPassword: '',
            emailError: false,
            passwordError: false,
            confirmError: false,
            entered: false,
            emailDuplicateError: false,
            registering: false,
        }
        this.handleEvent = this.handleEvent.bind(this)
        this.handleClickForm = this.handleClickForm.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleEvent = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleKeyPress = e => {
        this.handleClickForm()
    }

    handleClickForm() {

        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        var isEmailCorrect = this.state.email.match(re);
        var isPasswordCorrect = this.state.password.length >= 8;
        var isConfirmPasswordCorrect = this.state.password === this.state.confirmPassword;
        var isFirstNameEmpty = this.state.firstName === '';
        var isLastNameEmpty = this.state.lastName === '';

        if (!isEmailCorrect || !isPasswordCorrect || !isConfirmPasswordCorrect || isFirstNameEmpty || isLastNameEmpty) {
            this.setState({
                emailError: !isEmailCorrect,
                passwordError: !isPasswordCorrect,
                confirmError: !isConfirmPasswordCorrect,
                emailDuplicateError: false,
                firstError: isFirstNameEmpty,
                lastError: isLastNameEmpty,
            });
        } else {
            this.setState({
                emailError: !isEmailCorrect,
                passwordError: !isPasswordCorrect,
                confirmError: !isConfirmPasswordCorrect,
                registering: true,
                firstError: isFirstNameEmpty,
                lastError: isLastNameEmpty,
            });
            this.sendRegisterForm()
        }
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleChangeConfirm(event) {
        this.setState({ confirmPassword: event.target.value })
    }

    isPasswordInputCorrect() {
        return (this.state.password === this.state.confirmPassword)
    }

    isPasswordInputEmpty() {
        return this.state.password === '' || this.state.confirmPassword === ''
    }

    componentDidMount() {
        document.title = "TutorGang | Register"
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContainer}>
                <form noValidate>
                    <h1 className={classes.title}>
                        Registration
                        </h1>
                    <div
                        className={classes.textfieldContainer}
                        style={{ width: '60%' }}
                    >
                        {this.state.firstError ?

                            <p className={classes.error}>
                                A first name is required
                                </p> : null}
                        <TextField
                            label={"First Name*"}
                            name="firstName"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={this.state.firstError}
                            value={this.state.firstName}
                            onChange={e => this.handleEvent(e)}
                            onKeyPress={e => this.handleKeyPress(e)}
                            errorStyle={{ color: 'primary' }}
                        />
                        {this.state.lastError ?
                            <p className={classes.error}>
                                A last name is required
                                </p> : null}
                        <TextField
                            label={"Last Name*"}
                            name="lastName"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={this.state.lastError}
                            value={this.state.lastName}
                            onChange={e => this.handleEvent(e)}
                            onKeyPress={e => this.handleKeyPress(e)}
                        />
                        {this.state.emailDuplicateError ?
                            <p className={classes.error}>
                                The email is already in use
                                </p> : null}
                        {this.state.emailError ?
                            <p className={classes.error}>
                                A valid email is required
                                </p> : null}
                        <TextField
                            label={"Email Address*"}
                            name="email"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={this.state.emailError || this.state.emailDuplicateError}
                            value={this.state.email}
                            onChange={e => this.handleEvent(e)}
                            onKeyPress={e => this.handleKeyPress(e)}
                        />
                        {this.state.passwordError ?
                            <p className={classes.error}>
                                A valid password is required
                                    </p> : null}
                        <TextField
                            id="outlined-password-input"
                            label={"Password"}
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={this.state.passwordError}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            onKeyPress={e => this.handleKeyPress(e)}
                            InputProps={!this.isPasswordInputEmpty() ? (this.isPasswordInputCorrect() ?
                                {
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Right />
                                        </InputAdornment>
                                    ),
                                } :
                                {
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Wrong color="error" />
                                        </InputAdornment>
                                    )
                                }) : null}
                        />
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <p
                                style={{
                                    textAlign: 'left',
                                    margin: 0,
                                    padding: 0,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    fontSize: 13,
                                    color: '#9E9E9E'
                                }}>
                                Minimum length of 8 characters
                                    </p>
                        </div>
                        <TextField
                            id="outlined-confirmPassword-input"
                            label={"Confirm Password"}
                            type="password"
                            name="confirmPassword"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={this.state.confirmError}
                            value={this.state.confirmPassword}
                            onChange={this.handleChangeConfirm}
                            onKeyPress={e => this.handleKeyPress(e)}
                            InputProps={!this.isPasswordInputEmpty() ? (this.isPasswordInputCorrect() ?
                                {
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Right />
                                        </InputAdornment>
                                    ),
                                } :
                                {
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <Wrong color="error" />
                                        </InputAdornment>
                                    )
                                }) : null}
                        />
                    </div>
                    <Fab
                        variant="extended"
                        size="large"
                        color="primary"
                        aria-label="Add"
                        className={classes.button}
                        onClick={this.handleClickForm}
                        style={this.state.registering ? { opacity: 0.7 } : null}
                    >
                        Submit
                            </Fab>
                    <div className={classes.p}>
                        <p>
                            Already have an account?
                            &nbsp;
                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                <p
                                    className={classes.signin}
                                    onMouseEnter={event => onMouseOver(event)}
                                    onMouseOut={event => onMouseOut(event)}
                                >
                                    Login
                                    </p>
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(RegistrationForm);