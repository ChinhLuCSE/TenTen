"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";
import { Space } from "antd";

const columns = [
  {
    title: "#",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Full name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Number of Leaves",
    dataIndex: "leaves",
    key: "leaves",
  },
  {
    title: "Starting date",
    dataIndex: "starting_date",
    key: "starting_date",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
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
        <button
          type="button"
          className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </Space>
    ),
  },
];
const data = [
  {
    stt: "1",
    id: "SS 2313212321",
    name: "Vo Cong Thanh",
    department: "Human resource",
    leaves: "10",
    starting_date: "23/02/2000",
    address: "23 Ly Thuong Kiet",
    phone: "0231592314",
  },
  {
    stt: "2",
    id: "SS 2313222321",
    name: "Vo Cong Thanh",
    department: "Human resource",
    leaves: "10",
    starting_date: "23/02/2000",
    address: "23 Ly Thuong Kiet",
    phone: "0231592314",
  },
  {
    stt: "3",
    id: "SS 2313211321",
    name: "Vo Cong Thanh",
    department: "Human resource",
    leaves: "10",
    starting_date: "23/02/2000",
    address: "23 Ly Thuong Kiet",
    phone: "0231592314",
  },
];

const EmployeeManagement = () => {
  return (
    <div className="PI-container">
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex mt-14 mx-auto rounded-lg p-6 shadow-lg items-center">
          <UserTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
