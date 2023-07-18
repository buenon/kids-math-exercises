import { FC } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className={styles.Header}>Math Exercise Generator</div>
);

export default Header;
