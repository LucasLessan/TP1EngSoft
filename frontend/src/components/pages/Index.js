import { Outlet } from "react-router-dom";

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

import styles from './Index.module.css';

export default function Index() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
