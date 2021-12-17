import { useEffect, useState } from "react";
import * as style from "./style.module.css";
import icon from "../icon/padlock.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [passDirty, setPassDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameDirty, setNameDirty] = useState(false);
  const [lastnameDirty, setLastnameDirty] = useState(false);
  const [errorNameMessage, setErrorNameMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorLastnameMessage, setErrorLastnameMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorPassMessage, setErrorPassMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorEmailMessage, setErrorEmailMessage] = useState(
    "Поле не может быть пустым"
  );

  const [formValid, setFormValid] = useState(false);
  const [fieldBorderColor, setFieldBorderColor] = useState(null);

  useEffect(() => {
    if (
      errorNameMessage ||
      errorLastnameMessage ||
      errorPassMessage ||
      errorEmailMessage
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    errorNameMessage,
    errorLastnameMessage,
    errorPassMessage,
    errorEmailMessage,
  ]);

  const validShema = {
    name: "(?:[A-zА-я][- ]?){3}",
    lastname: "(?:[A-zА-я][- ]?){5}",
    email: `[a-z0-9]+@[a-z]+\.[a-z]{2,3}`, //eslint-disable-line
    pass: "(?:[A-zА-я1-9][- ]?){8}",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    localStorage.setItem("user", JSON.stringify(formObject));
    alert("succes");
    navigate("/login");
    setPass("");
    setEmail("");
    setLastname("");
    setName("");
    localStorage.removeItem("rememberMe");
  };

  const nameHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setName(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorNameMessage("Минимум 3 символа");
      setFieldBorderColor({ name: "red" });
    } else {
      setErrorNameMessage("");
      setFieldBorderColor({ name: "green" });
    }
  };

  const usernameHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setLastname(event.target.value);

    if (!regex.test(event.target.value)) {
      setErrorLastnameMessage("Минимум 5 символа");
      setFieldBorderColor({ lastname: "red" });
    } else {
      setErrorLastnameMessage("");
      setFieldBorderColor({ lastname: "green" });
    }
  };

  const passHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setPass(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorPassMessage("Минимум 8 символов");
      setFieldBorderColor({ pass: "red" });
    } else {
      setErrorPassMessage("");
      setFieldBorderColor({ pass: "green" });
    }
  };

  const emailHandler = (event) => {
    var regex = new RegExp(validShema[event.target.name]);
    setEmail(event.target.value);
    if (!regex.test(event.target.value)) {
      setErrorEmailMessage("Не корректный Email");
      setFieldBorderColor({ email: "red" });
    } else {
      setErrorEmailMessage("");
      setFieldBorderColor({ email: "green" });
    }
  };

  const handleBlur = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
      case "name": {
        setNameDirty(true);
        break;
      }
      case "lastname": {
        setLastnameDirty(true);
        break;
      }
      case "pass": {
        setPassDirty(true);
        break;
      }
      case "email": {
        setEmailDirty(true);
        break;
      }
    }
  };

  return (
    <div className={style.page}>
      <form className={style.pageForm} onSubmit={handleSubmit}>
        <div className={style.formLogo}>
          <img className={style.icon} src={icon} alt="icon" />
        </div>
        <h3 className={style.pageFormTitle}>Sign up</h3>
        <div className={style.pageFormFieldsWrap}>
          <div className={style.fieldWrap}>
            {nameDirty && errorNameMessage && (
              <p className={style.errorTop}>{errorNameMessage}</p>
            )}
            <input
              className={style.pageFormField}
              style={{ borderColor: fieldBorderColor && fieldBorderColor.name }}
              type="text"
              placeholder="First name*"
              name="name"
              onChange={(e) => nameHandler(e)}
              onBlur={(e) => handleBlur(e)}
              value={name}
            />
          </div>
          <div className={style.fieldWrap}>
            {lastnameDirty && errorLastnameMessage && (
              <p className={style.errorTop}>{errorLastnameMessage}</p>
            )}
            <input
              className={style.pageFormField}
              style={{
                borderColor: fieldBorderColor && fieldBorderColor.lastname,
              }}
              type="text"
              placeholder="Last name*"
              name="lastname"
              onChange={(e) => usernameHandler(e)}
              onBlur={(e) => handleBlur(e)}
              value={lastname}
            />
          </div>
        </div>
        {emailDirty && errorEmailMessage && (
          <p className={style.error}>{errorEmailMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.email }}
          type="text"
          placeholder="Email *"
          name="email"
          onChange={(e) => emailHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={email}
        />
        {passDirty && errorPassMessage && (
          <p className={style.error}>{errorPassMessage}</p>
        )}
        <input
          className={style.pageFormField}
          style={{ borderColor: fieldBorderColor && fieldBorderColor.pass }}
          type="text"
          placeholder="Password *"
          name="pass"
          onChange={(e) => passHandler(e)}
          onBlur={(e) => handleBlur(e)}
          value={pass}
        />
        <input
          className={style.pageFormField}
          type="submit"
          value="Sign up"
          disabled={!formValid}
        />
        <Link className={style.link} to="/login">
          Already have an account? Sign in
        </Link>
        <p className={style.pageCopy}>© 2021 Stack Exchange Inc</p>
      </form>
    </div>
  );
}
