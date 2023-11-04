"use-client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import styles from "./signin.module.css";

const SignInPage = () => {
  return (
    <>
      <Header />
      <div className={styles["body"]}>
        <div style={{ marginTop: '50px' }}>Chào mừng đến với LeaveTrack</div>

        <div className={styles["login-wrap"]}>
          <div className={styles["right"]}></div>
          <div className={styles["left"]}></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignInPage;
