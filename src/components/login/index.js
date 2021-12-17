import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../icon/padlock.png";
import * as style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const dataRemember = localStorage.getItem("rememberMe");
  const [check, setCheck] = useState(false);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [passDirty, setPassDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [errorPassMessage, setErrorPassMessage] = useState(
    "Поле не может быть пустым"
  );
  const [errorEmailMessage, setErrorEmailMessage] = useState(
    "Поле не может быть пустым"
  );
  const [fieldBorderColor, setFieldBorderColor] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (errorPassMessage || errorEmailMessage) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorPassMessage, errorEmailMessage]);

  useEffect(() => {
    if (!!dataRemember) {
      setEmail(user.email);
      setPass(user.pass);
      setFormValid(true);
      setCheck(true);
      setErrorPassMessage("");
      setErrorEmailMessage("");
    }
  }, [dataRemember, user.email, user.pass]);

  const validShema = {
    email: `[a-z0-9]+@[a-z]+\.[a-z]{2,3}`, //eslint-disable-line
    pass: "(?:[A-zА-я1-9][- ]?){8}",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(formObject.rememberMe);

    if (formObject.rememberMe) {
      localStorage.setItem("rememberMe", JSON.stringify("on"));
    }
    if (!check) {
      localStorage.removeItem("rememberMe");
    }

    if (user.email !== formObject.email) {
      setErrorEmailMessage("Не корректный Email");
      setFieldBorderColor({ email: "red" });
      setFormValid(false);
    } else if (user.pass !== formObject.pass) {
      setErrorEmailMessage("Не корректный пароль");
      setFieldBorderColor({ pass: "red" });
      setFormValid(false);
    } else {
      alert("succes");
      navigate("/");
    }
    setPass("");
    setEmail("");
  };

  const handleBlur = (event) => {
    // eslint-disable-next-line default-case
    switch (event.target.name) {
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

        <h3 className={style.pageFormTitle}>Sign in</h3>
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
          value="sign in"
          disabled={!formValid}
        />

        <div className={style.rememberMe}>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            onChange={() => setCheck(!check)}
            checked={check}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <div className={style.links}>
          <a className={style.linkForgot} href="/">
            Forgot password
          </a>
          <Link className={style.link} to="/register">
            Don't have an account? Sign Up
          </Link>
        </div>

        <p className={style.pageCopy}>© 2021 Stack Exchange Inc</p>
      </form>
    </div>
  );
}
