"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";
import Image from "next/image";

import { sendRequest, sendRequestWithToken } from "@/service/request";

import { Space, Modal } from "antd";

const data = [
  {
    id: "SS 2313da212321",
    status: "Approved",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 23132a1d2321",
    status: "Approved",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 231321d2321",
    status: "Pending",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 23d13212321",
    status: "Canceled",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
];

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
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Remaining days off",
      dataIndex: "remaining_day",
      key: "remaining_day",
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
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
          {record.status !== "Canceled" && (
            <Space size="middle">
              <button
                type="button"
                className="items-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => {
                  if (record.status === "Approved") {
                    showModal({ id: record.id, status: "Pending" });
                  } else if (record.status === "Pending") {
                    showModal({ id: record.id, status: "Canceled" });
                  }
                }}
              >
                Remove
              </button>
              {record.status !== "Approved" && (
                <button
                  type="button"
                  className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center "
                  onClick={() => showModal({ id: record.id, status: "Approved" })}
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
        const token = document.cookie.split("=")[1];
        console.log(token);
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/request/getAll",
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
    const token = document.cookie.split("=")[1];
    const response = await sendRequest(
      "https://tenten-server.adaptable.app/request/updateStatus",
      "POST",
      selectedLeave,
      token
    );

    if (response) {
      setIsModalOpen(false);
      console.log("success");
    } else {
      console.log("Error");
    }
  };

  const sortedData = data.sort((a, b) => {
    if (a.status === "Canceled" && b.status !== "Canceled") {
      return 1;
    } else if (a.status !== "Canceled" && b.status === "Canceled") {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col mx-auto justify-center text-center">
          <h1 className="mt-10 text-2xl font-medium">Leave application is pending approval</h1>
          <div className="flex rounded-lg p-6 shadow-lg items-center">
            <UserTable columns={columns} data={sortedData.filter((item) => item.status !== "Approved")} />
          </div>
          <h1 className="mt-12 mb-6 text-2xl font-medium">Leave application approved</h1>
          <div className="flex rounded-lg p-6 shadow-lg items-center">
            <UserTable columns={columns} data={sortedData.filter((item) => item.status === "Approved")} />
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
