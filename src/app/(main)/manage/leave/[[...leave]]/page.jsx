"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";

import { Space, Modal } from "antd";

const data = [
  {
    id: "SS 2313212321",
    status: "Approved",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 2313212321",
    status: "Approved",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 2313212321",
    status: "Pending",
    name: "Vo Cong Thanh",
    remaining_day: "10",
    start_date: "23/02/2000",
    end_date: "23/02/2000",
    reason: "toi benh",
  },
  {
    id: "SS 2313212321",
    status: "Pending",
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
      render: (id, record, index) => { ++index; return index; },
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
        <Space size="middle">
          <button
            type="button"
            className="items-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Remove
          </button>
          {record.status === "Approved" && (
          <button
            type="button"
            className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center "
          >
            Approve
          </button>
        )}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col mx-auto justify-center text-center">
        <h1 className="mt-10 text-2xl font-medium">Leave application is pending approval</h1>
        <div className="flex rounded-lg p-6 shadow-lg items-center">
          <UserTable columns={columns} data={data.filter(item => item.status === "Approved")} />
        </div>
        <h1 className="mt-12 mb-6 text-2xl font-medium">Leave application approved</h1>
        <div className="flex rounded-lg p-6 shadow-lg items-center">
          <UserTable columns={columns} data={data.filter(item => item.status === "Pending")} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
