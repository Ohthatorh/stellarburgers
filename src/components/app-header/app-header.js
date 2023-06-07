import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderNavigation from "./header-navigation/header-navigation";
import HeaderActions from "./header-actions/header-actions";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation();
  const headerClassNames = classNames(`${styles.header} pt-4 pb-4`);
  return (
    <header className="container">
      <div className={headerClassNames}>
        <HeaderNavigation pathname={location.pathname} />
        <Logo />
        <HeaderActions pathname={location.pathname} />
      </div>
    </header>
  );
}

export default AppHeader;
