import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { forwardRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Login.css";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const URl = "http://localhost:3002";

function Login({ showLoginINfo, setShowLoginInfo, setIsAdmin }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openNotifcation, setOpenNotifcation] = useState(false);
  const [notification, setNotifcation] = useState("");
  const [error, setError] = useState("");
  const onSumbitHandler = (e) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setShowLoginInfo({ login: true, name: user.displayName })
        get(ref(getDatabase(), "users/" + user.uid + "/accountType")).then(snapshot => {
          if (snapshot.exists())
            if (snapshot.val() === "admin")
              setIsAdmin(true);
        }).then(() => navigate("/"))

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
          Login
        </Typography>
      </div>

      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyDown={e => e.key === "Enter" ? onSumbitHandler() : ""}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="standard"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={e => e.key === "Enter" ? onSumbitHandler() : ""}
      />
      <input
        disabled={!password || !email}
        type="submit"
        className={!password || !email ? "not_work_login" : "login__button"}
        value="Login"
        onClick={onSumbitHandler}
      />
      <Typography variant="subtitle1" gutterBottom>
        have an account? <Link to="/signup">create an account</Link>
      </Typography>
    </div>
  );
}

export default Login;
