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
  const [phoneNumberModal, setPhoneNumberModal] = useState("");
  const [otpNumberModal, setOtpNumberModal] = useState("");
  const [newPasswordRetype, setNewPasswordRetype] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModalWarning, setShowModalWarning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSignIn = () => {
    if (policyAccepted1) {
      if (phoneNumber === "09123456" && password === "admin123") {
        return;
      }
    } else {
      setShowWarning(true);
    }
  };

  const handleSubmitFormModal = () => {
    if (phoneNumberModal === "09123456") {
      setIsModalOpen(false);
    } else {
      setShowModalWarning(true);
    }
  };

  return (
    <>
      <Header />
      <div
        className={styles["body"]}
        style={{ marginTop: "30px", marginInline: "200px" }}
      >
        <div style={{ fontSize: "32px", fontWeight: "600" }}>
          <span>Welcome to</span>{" "}
          <span style={{ color: "#032A94" }}>LeaveTrack</span>{" "}
        </div>

        <div className={styles["login-wrap"]} style={{ marginTop: "30px" }}>
          <div className={styles["left"]} style={{ width: "45%" }}>
            <form>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="phoneNumber" className={styles["label"]}>
                  Phone number
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
                  Password
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
                    <span style={{ paddingLeft: "10px" }}>
                      I agree with the{" "}
                      <span style={{ color: "#293393", cursor: "pointer" }}>
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span style={{ color: "#293393", cursor: "pointer" }}>
                        privacy policy
                      </span>{" "}
                      of LeaveTrack.
                    </span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={policyAccepted2}
                      onChange={() => setPolicyAccepted2(!policyAccepted2)}
                    />
                    <span style={{ paddingLeft: "10px" }}>
                      I agree to receive news from LeaveTrack.
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="button"
                className={styles["sign-in-button"]}
                onClick={handleSignIn}
                style={{ marginTop: "30px" }}
              >
                Login
              </button>
              <div style={{ color: "red", textAlign: "center" }}>
                {showWarning
                  ? "Account does not exist! Please re-enter!"
                  : ""}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div style={{ cursor: "not-allowed" }}>Change password</div>
                <div
                  style={{ color: "#293393", cursor: "pointer" }}
                  onClick={showModal}
                >
                  Forgot password?
                </div>
              </div>
            </form>
          </div>
          <div className={styles["right"]} style={{ width: "37%" }}>
            <Image src={loginImage} alt="loginImage" />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            margin: "30px 30px",
          }}
        >
          <p style={{ fontSize: "32px" }}>Recover password</p>
          <p style={{ color: "rgba(0, 0, 0, 0.50)" }}>
            Enter information by template
          </p>
          <form style={{ marginTop: "40px", marginInline: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="phoneNumber" className={styles["label"]}>
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumberModal"
                className={styles["input-box-2"]}
                value={phoneNumberModal}
                onChange={(e) => setPhoneNumberModal(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="phoneNumber" className={styles["label"]}>
                OTP code
              </label>
              <input
                type="tel"
                id="otpNumberModal"
                className={styles["input-box-2"]}
                value={otpNumberModal}
                onChange={(e) => setOtpNumberModal(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="phoneNumber" className={styles["label"]}>
                New Password
              </label>
              <input
                type="tel"
                id="newPassword"
                className={styles["input-box-2"]}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="phoneNumber" className={styles["label"]}>
                Re-enter new password
              </label>
              <input
                type="tel"
                id="newPasswordRetype"
                className={styles["input-box-2"]}
                value={newPasswordRetype}
                onChange={(e) => setNewPasswordRetype(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={styles["sign-in-button"]}
              onClick={handleSubmitFormModal}
              style={{ marginTop: "40px" }}
            >
              Continue
            </button>
            <div style={{ color: "red", textAlign: "center" }}>
              {showModalWarning
                ? "Phone number does not exist! Please re-enter!"
                : ""}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignInPage;
