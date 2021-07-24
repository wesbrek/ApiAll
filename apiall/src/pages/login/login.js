import React, { useState } from "react";
import Cookies from 'universal-cookie';
import Form from '../../components/form/form'
import Swal from "sweetalert2";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from 'react-router'
const cookies = new Cookies();
const Login = () => {
  const [user, setUser] = useState("");
  const history = useHistory();
    
  const getUser = async (email, password) => {
    let url = new URL("https://bootcamp-users.herokuapp.com/"),
      params = { email: email, password: password }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    fetch(url)
      .then(resp => resp.json())
      .then(res => {
        if (res.status === 200) {
          setUser(res.user);
          cookies.set('name', res.user.name, { path: '/' });
          cookies.set('token', res.user.token, { path: '/' });
          history.go(0)
        } else {
          Swal.fire({
            title: "Error!",
            text: "Incorrect email or password.",
            icon: "error",
            customClass: "swal-wide",
            confirmButtonText: "Ok",
          });
        }
             
      }).catch(ex => {
        console.error(ex);
      })
  }
     
  const validateUser = async (user) => {
    const info = await getUser(user[0], user[1])
    console.log(info);
  }
    
  return user ? (
 
    <Redirect to="/home" />
  ) : (
    <section className="login">
    <h1>Log In</h1>
      <Form
        callback={validateUser}
        inputs={[
          { label: "", type: "email", placeholder: "Email", icon: "far fa-user" },
          { label: "", type: "password", placeholder: "Password", icon: "fas fa-lock" },
          ]}
          button ={ {name: 'form', type: 'Submit', text: 'Login'} }
      />
    </section>
  );
};

export default Login;
