"use client";

import { useState } from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";
import Image from "next/image";

import UserImage from "@/assets/images/image_user.png";

import { Space, Modal } from "antd";


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
            onClick={showRemoveModal}
          >
            Remove
          </button>
          <button
            type="button"
            className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center "
            onClick={showModal}
          >
            Update
          </button>
        </Space>
      ),
    },
  ];

  const [name, setName] = useState("Vo Cong Thanh");
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("29/2/2002");
  const [address, setAddress] = useState("23 Ly Thuong Kiet street, Thu Duc district, Ho Chi Minh city");
  const [role, setRole] = useState("Admin");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const handleCancelRemove = () => {
    setIsRemoveModalOpen(false);
  };

  return (
    <div className="PI-container">
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex mt-14 mx-auto rounded-lg p-6 shadow-lg items-center">
          <UserTable columns={columns} data={data} />
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} width={1128} centered>
        <div className="flex flex-col px-9 pb-9 items-center justify-center">
        <div className="flex w-full flex-col items-center p-2 mt-8">
          <Image className="rounded-full" src={UserImage} width={128} height={32} alt="avatar"></Image>
          <span className="font-bold ">{name}</span>
          <span className="font-semibold text-gray-600">Human resources department</span>
          <span className="text-gray-600">ID: 1234567890</span>
        </div>
        <div className="mt-6 w-full items-center pt-6 pb-8 px-16 shadow-2xl rounded-md">
          <h1 className="text-2xl my-4 font-medium">Information</h1>
          <div className="pt-5">
            <form>
            <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Gender</label>
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Enter your gender"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Birth of Date</label>
                <input
                  type="text"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Enter your birth date"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  
                />
              </div>
              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter your role"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center justify-center">
                <button
                  type="button"
                  className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center "
                  onClick={handleCancel}
                >
                  <Image className="mr-2" src="/cancel.svg" width={20} height={20} alt="Logo" />
                  Cancel
                </button>
                <button
                  type="button"
                  className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center "
                  onClick={handleCancel}
                >
                  <Image className="mr-2" src="/submit.svg" width={20} height={20} alt="Logo" />
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </Modal>
      <Modal open={isRemoveModalOpen} onCancel={handleCancelRemove} footer={null} centered>
        <div className="flex flex-col items-center justify-center">
          <Image src="/warn.svg" width={80} height={80} alt="Logo" />
          <h1 className="text-xl my-4 font-medium">You have decided to delete this employee?</h1>
          <div className="flex w-full flex-row items-center justify-center">
                <button
                  type="button"
                  className="mx-4 border-solid border-2 items-center bg-white-900 hover:text-white hover:bg-red-700 hover:border-transparent focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2 inline-flex text-center "
                  onClick={handleCancelRemove}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mx-4 border-2 border-transparent items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-2 inline-flex text-center "
                  onClick={handleCancelRemove}
                >
                  Submit
                </button>
              </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
