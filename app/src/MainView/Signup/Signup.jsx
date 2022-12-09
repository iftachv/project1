import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const URl = "http://localhost:3002";
function Signup() {
  const navigate = useNavigate();
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openNotifcation, setOpenNotifcation] = useState(false);
  const [notification, setNotifcation] = useState("");
  const [error, setError] = useState("");

  const onSumbitHandler = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: fName + ' ' + lName,
        })
        const db = getDatabase();
        await set(ref(db, 'users/' + user.uid),
          {
            fName: fName,
            lName: lName,
            email: email,
            accountType: "standard"
          });
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="login">
      <div className="login__header">
        <img className="login__logo" src={logo} alt="logo" />
        <Snackbar open={openNotifcation} autoHideDuration={6000}>
          <Alert severity={error} sx={{ width: "100%" }}>
            {notification}
          </Alert>
        </Snackbar>
        <Typography className="login__header_text" variant="h6" gutterBottom>
          Sign Up
        </Typography>
      </div>
      <TextField
        id="firstname"
        label="First Name"
        variant="standard"
        onChange={(e) => {
          setFname(e.target.value);
        }}
      />
      <TextField
        id="lastname"
        label="Last Name"
        variant="standard"
        onChange={(e) => {
          setLname(e.target.value);
        }}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        disabled={!fName || !lName || !password || !email}
        type="submit"
        className={
          !fName || !lName || !password || !email
            ? "not_work_login"
            : "login__button"
        }
        value="Sign Up"
        onClick={onSumbitHandler}
      />
      <Typography variant="subtitle1" gutterBottom>
        already have an account? <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
}

export default Signup;
