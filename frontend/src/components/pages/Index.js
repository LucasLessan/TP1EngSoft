import { Outlet } from "react-router-dom";

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import styles from './Index.module.css';

export default function Index() {
  return (
    <div className={`${styles.app_div}`}>
      <Navbar />
      <div className={`container-fluid`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
