import React from "react";
import styles from "./Sidebar.module.css"
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} by WorldWise Inc
      </p>
    </footer>
  );
}

export default Footer;
