import React from "react";
import Swal from "sweetalert2";
import Button from "../button/button";
import Icon from "../icon/icon"
const Login = ({name, inputs, callback, button, selects }) => {
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = validateInfo();
    if (user != null) callback(user);
  };

  const validateInfo = () => {
    let data = [];
    let allInputs = document.getElementsByClassName("form__input");
    let allSelects = document.getElementsByClassName("form__select");
    for (let input of allInputs) {
      if (input.type === "email") {
        if (!validateEmail(input.value)) {
          Swal.fire({
            title: "Error!",
            text: "Please enter a valid email.",
            icon: "error",
            customClass: "swal-wide",
            confirmButtonText: "Ok",
          });
          return null;
        } else {
          data.push(input.value)
        }
      } else if (input.type === "password" || input.type === "text" || input.type === "email"  ) {
        if (input.value === "") {
          Swal.fire({
            title: "Error!",
            text: "Please fill in all the fields.",
            icon: "error",
            customClass: "swal-wide",
            confirmButtonText: "Ok",
          });
          return null;
        } else {
          data.push(input.value)
        }
      }
    }

    for (let select of allSelects) {
        if (select.value === "") {
          Swal.fire({
            title: "Error!",
            text: "Please select an option.",
            icon: "error",
            customClass: "swal-wide",
            confirmButtonText: "Ok",
          });
          return null;
        } else {
          data.push(select.value)
        }
      
     
    }


    return data;
  };
  return (
    <form className={name} onSubmit={handleSubmit} autoComplete="off">
      {inputs.map((input, index) => ( 
        <label className="form__label" key={index}>
          <Icon icon={input.icon}/>
          {input.label}
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            className="form__input"
          ></input>
        </label>  
      ))}
      {selects &&
        selects.map((select, i) => (
          <div key={i}>
            <Icon icon={select.icon} />
            <select key={i} id={select.id} className="form__select">
              <option value="">-----{select.name} -----</option>
              {select.options.map((option, o) => (
                  <option key={o} value={option.name}>{option.name}</option>
              ))}
            
            </select>
          </div>
        )) 
        
    }
      <Button name={button.name} type={button.type} text={button.text} />
    </form>
  );
};

export default Login;
