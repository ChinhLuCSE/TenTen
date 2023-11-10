"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

import styles from "./styles.module.css";
import { DatePicker } from "antd";

const LeaveRegistration = () => {
  const onChangeStartDate = () => {};

  const onChangeEndDate = () => {};

  return (
    <div className="leave-regis-container">
      <Header status={1} />
      <Sidebar />
      <div
        className="flex flex-col items-center justify-center"
        style={{ marginLeft: "256px" }}
      >
        <div className="flex w-full flex-col items-center p-2 mt-14">
          <span className="font-bold">Application for leave</span>
        </div>
        <form className={styles["form-container"]}>
          <div
            className={styles["input-wrap"]}
            style={{ paddingBottom: "10px" }}
          >
            <div className={styles["input-title"]}>Remaining days off</div>
            <div style={{ color: "#6F737D" }}>20</div>
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>Start date</div>
            <DatePicker
              onChange={onChangeStartDate}
              style={{ width: "80%", padding: "15px" }}
            />
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>End date</div>
            <DatePicker
              onChange={onChangeEndDate}
              style={{ width: "80%", padding: "15px" }}
            />
          </div>
          <div className={styles["input-wrap"]}>
            <div className={styles["input-title"]}>Reason</div>
            <input
              type="text"
              defaultValue={"Input your reason here"}
              className={styles["input-box"]}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRegistration;
