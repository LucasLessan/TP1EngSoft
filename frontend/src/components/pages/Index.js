import { Outlet } from "react-router-dom";

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

export default function Index() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
