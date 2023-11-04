"use client";

import { useState } from "react";
import Header from "@/components/layout/header";

import styles from "./signin.module.css";

import loginImage from "@/assets/images/img_login.png";
import Image from "next/image";
import Modal from "antd/es/modal/Modal";

const SignInPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [policyAccepted1, setPolicyAccepted1] = useState(false);
  const [policyAccepted2, setPolicyAccepted2] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    if (policyAccepted1 && policyAccepted2) {
      // You can add your authentication logic here, e.g., API requests to validate the user's credentials.
      console.log("Phone Number:", phoneNumber);
      console.log("Password:", password);
    } else {
      alert("Please accept the policies before signing in.");
    }
  };

  return (
    <>
      <Header />
      <div
        className={styles["body"]}
        style={{ marginTop: "30px", marginInline: "200px" }}
      >
        <div>Chào mừng đến với LeaveTrack</div>

        <div className={styles["login-wrap"]} style={{ marginTop: "30px" }}>
          <div className={styles["left"]} style={{ width: "45%" }}>
            <form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="phoneNumber" className={styles["label"]}>
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className={styles["input-box"]}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "7px",
                }}
              >
                <label htmlFor="password" className={styles["label"]}>
                  Mật Khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className={styles["input-box"]}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "37px",
                }}
              >
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={policyAccepted1}
                      onChange={() => setPolicyAccepted1(!policyAccepted1)}
                    />
                  </label>
                  <span style={{ paddingLeft: "10px" }}>
                    Tôi đã đọc và đồng ý với điều khoản dịch vụ cũng như chính
                    sách quyền riêng tư của LeaveTrack.
                  </span>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={policyAccepted2}
                      onChange={() => setPolicyAccepted2(!policyAccepted2)}
                    />
                  </label>
                  <span style={{ paddingLeft: "10px" }}>
                    Tôi đồng ý nhận thông tin mới từ LeaveTrack
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={styles["sign-in-button"]}
                onClick={handleSignIn}
                style={{ marginTop: "30px" }}
              >
                Đăng nhập
              </button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div>Đổi mật khẩu</div>
                <div
                  style={{ color: "#293393", cursor: "pointer" }}
                  onClick={showModal}
                >
                  Quên mật khẩu
                </div>
              </div>
            </form>
          </div>
          <div className={styles["right"]} style={{ width: "37%" }}>
            <Image src={loginImage} alt="loginImage" />
          </div>
        </div>
      </div>
      <Modal
        title="Phục hồi mật khẩu"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Nhập thông tin theo mẫu</p>
        <form style={{ marginTop: "40px" }}>
          <div>
            <label htmlFor="phoneNumber" className={styles["label"]}>
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={styles["input-box"]}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className={styles["label"]}>
              Mã OTP
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className={styles["input-box"]}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={styles["sign-in-button"]}
            onClick={handleSignIn}
            style={{ marginTop: "30px" }}
          >
            Tiếp tục
          </button>
        </form>
      </Modal>
    </>
  );
};

export default SignInPage;
