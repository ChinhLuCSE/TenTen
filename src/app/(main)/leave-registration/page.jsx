"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

import styles from "./leave.module.css";
import { Button, DatePicker } from "antd";

const LeaveRegistration = () => {
  const onChangeStartDate = () => {};

  const onChangeEndDate = () => {};

  return (
    <div className="leave-regis-container">
      <Header status={1} />
      <Sidebar />
      <div
        style={{ marginLeft: "256px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', padding: '2px', marginTop: '50px' }}>
          <span style={{ fontWeight: 600 }}>Application for leave</span>
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
          <div className={styles['buttons-container']}>
            <Button type="primary" style={{ backgroundColor: '#293393' }}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRegistration;
