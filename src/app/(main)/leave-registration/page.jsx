"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

import styles from "./leave.module.css";
import { Button, DatePicker, Modal } from "antd";
import { useEffect, useState } from "react";
import { sendRequestWithToken } from "@/service/request";

const LeaveRegistration = () => {
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenForm = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    const fetchUserInfo = async () => {
      try {
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/account/info",
          "GET",
          null,
          token
        );

        if (response) {
          setUser(response);
          console.log(response);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error while fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const onChangeStartDate = (date, dateString) => {
    setStartDate(dateString);
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleSubmit = async () => {
    console.log("check:", {
      id: user.id,
      startdate: startDate,
      enddate: endDate,
      reason: reason,
    });
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    const response = await sendRequestWithToken(
      "https://tenten-server.adaptable.app/request/create",
      "POST",
      {
        id: user.id,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
      },
      token
    );
    if (response) console.log("leave-submit", response);
  };

  return (
    <div className="leave-regis-container">
      <Header status={1} />
      <Sidebar />
      <div
        style={{
          marginLeft: "256px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles["table-container"]}>

        </div>
        <Button
          type="primary"
          style={{ backgroundColor: "#293393" }}
          onClick={handleOpenForm}
        >
          + Add leave
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            padding: "2px",
            marginTop: "50px",
          }}
        >
          <span style={{ fontWeight: 600 }}>Application for leave</span>
        </div>
        <form className={styles["form-container"]}>
          <div
            className={styles["input-wrap"]}
            style={{ paddingBottom: "10px" }}
          >
            <div className={styles["input-title"]}>Remaining days off</div>
            <div style={{ color: "#6F737D", paddingLeft: "20px" }}>
              {user.numLeaveDays || "Loading..."}
            </div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>Start date</div>
            <DatePicker
              onChange={onChangeStartDate}
              style={{ marginLeft: "40px", width: "80%", padding: "15px" }}
            />
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>End date</div>
            <DatePicker
              onChange={onChangeEndDate}
              style={{ marginLeft: "40px", width: "80%", padding: "15px" }}
            />
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>Reason</div>
            <input
              type="text"
              placeholder={"Input your reason here"}
              className={styles["input-box"]}
              onChange={(e) => {
                setReason(e.target.value);
              }}
            />
          </div>
          <div className={styles["buttons-container"]}>
            <Button
              type="primary"
              style={{ backgroundColor: "#293393" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LeaveRegistration;
