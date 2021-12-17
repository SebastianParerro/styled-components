import { Link } from "react-router-dom";
import * as style from "./style.module.css";

export default function NavBar() {
  return (
    <div className={style.navbar}>

      <Link className={style.menuItem} to="/register">
        Регистрация
      </Link>
      <Link className={style.menuItem} to="/login">
        Войти
      </Link>
    </div>
  );
}
