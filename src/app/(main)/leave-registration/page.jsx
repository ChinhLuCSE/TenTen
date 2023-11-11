"use client";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

import styles from "./leave.module.css";
import { Button, DatePicker, Modal, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { sendRequestWithToken } from "@/service/request";
import UserTable from "@/components/table/usertable";

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const inputDateString = "2023-11-12T02:57:42.561Z";
const formattedDate = formatDate(inputDateString);
console.log(formattedDate);

const LeaveRegistration = () => {
  const [user, setUser] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);
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

          try {
            const response1 = await sendRequestWithToken(
              `https://tenten-server.adaptable.app/request/getPersonal?id=${response.id}`,
              "GET",
              null,
              token
            );

            if (response1) {
              setLeaves(response1);
              console.log(response1);
            } else {
              console.error("Failed to fetch leaves data");
            }
          } catch (error) {
            console.error("Error while fetching leaves data:", error);
          }
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
    console.log("date:", date);
    setStartDate(date);
  };

  const onChangeEndDate = (date, dateString) => {
    setEndDate(date);
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
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        reason: reason,
      },
      token
    );
    if (response) {
      const response1 = await sendRequestWithToken(
        `https://tenten-server.adaptable.app/request/getPersonal?id=${user.id}`,
        "GET",
        null,
        token
      );
      if (response1) {
        setLeaves(response1);
        setIsModalOpen(false);
      }
      console.log("leave-submit", response);
    }
  };

  const handleRemoveRegistration = () => {};

  const columns = [
    {
      title: "#",
      dataIndex: "rowKey",
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, record) => {
        let color, icon;
        switch (value) {
          case "ACCEPT":
            color = "success";
            icon = <CheckCircleOutlined />;
            break;
          case "PENDING":
            color = "processing";
            icon = <SyncOutlined spin />;
            break;
          case "REJECT":
            color = "error";
            icon = <ExclamationCircleOutlined />;
            break;
          default:
            color = "error";
            icon = <ExclamationCircleOutlined />;
            break;
        }
        return (
          <Tag icon={icon} color={color}>
            {value ? value : "NO STATUS"}
          </Tag>
        );
      },
    },
    {
      title: "Remaining days off",
      dataIndex: "numLeaveDays",
      key: "numLeaveDays",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
      render: (record) => {
        console.log("record:", record);
        return formatDate(record);
      },
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
      render: (record) => {
        return formatDate(record);
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
  ];

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
          <UserTable columns={columns} data={leaves} />
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
