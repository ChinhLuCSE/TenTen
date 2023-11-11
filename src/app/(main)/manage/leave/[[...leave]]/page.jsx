"use client";

import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";
import Image from "next/image";

import { sendRequestWithToken } from "@/service/request";

import { Space, Modal, Tag } from "antd";


const LeaveManagement = () => {
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
      title: "Full name",
      dataIndex: "name",
      key: "name",
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
      render: (date) => {
        const formattedDate = formatDate(date);
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "End date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => {
        const formattedDate = formatDate(date);
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {record.status !== "REJECT" && (
            <Space size="middle">
              <button
                type="button"
                className="items-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => {
                  if (record.status === "ACCEPT") {
                    showModal({ id: record.id, status: "PENDING" });
                  } else if (record.status === "PENDING") {
                    showModal({ id: record.id, status: "REJECT" });
                  }
                }}
              >
                Reject
              </button>
              {record.status !== "ACCEPT" && (
                <button
                  type="button"
                  className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center "
                  onClick={() => showModal({ id: record.id, status: "ACCEPT" })}
                >
                  Approve
                </button>
              )}
            </Space>
          )}
        </>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leave, setLeave] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState({});

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const token = document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1]
        : "none";
        console.log(token);
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/request/getAllRequest",
          "GET",
          null,
          token
        );

        if (response) {
          console.log(response);
          setLeave(response);
        } else {
          console.log("Failed to fetch information");
        }
      } catch (error) {
        console.error("Error while fetching information:", error);
      }
    };

    fetchLeave();
  }, []);

  const showModal = (leave) => {
    console.log(leave);
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    const token = document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1]
        : "none";
    const response = await sendRequestWithToken(
      "https://tenten-server.adaptable.app/request/update-status",
      "POST",
      selectedLeave,
      token
    );

    if (response) {
      const updatedLeave = leave.map((item) =>
      item.id === selectedLeave.id
        ? { ...item, status: selectedLeave.status }
        : item
    );
    setLeave(updatedLeave);
      setIsModalOpen(false);
      console.log("success");
    } else {
      console.log("Error");
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Loading...";
    }

    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col mx-auto justify-center text-center">
          <h1 className="mt-10 text-2xl font-medium">Leave application is pending approval</h1>
          <div className="mx-auto flex rounded-lg p-6 shadow-lg items-center">
            <UserTable columns={columns} data={leave.filter((item) => item.status !== "ACCEPT")} />
          </div>
          <h1 className="mt-12 mb-6 text-2xl font-medium">Leave application approved</h1>
          <div className="mx-auto flex rounded-lg p-6 shadow-lg items-center">
            <UserTable columns={columns} data={leave.filter((item) => item.status === "ACCEPT")} />
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <div className="flex flex-col items-center justify-center">
          <Image src="/warn.svg" width={80} height={80} alt="Logo" />
          <h1 className="text-xl my-4 font-medium">Are you sure?</h1>
          <div className="flex w-full flex-row items-center justify-center">
            <button
              type="button"
              className="mx-4 border-solid border-2 items-center bg-white-900 hover:text-white hover:bg-red-700 hover:border-transparent focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2 inline-flex text-center "
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="mx-4 border-2 border-transparent items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2 inline-flex text-center "
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveManagement;
