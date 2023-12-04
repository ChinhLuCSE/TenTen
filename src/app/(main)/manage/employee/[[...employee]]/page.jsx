"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UserTable from "@/components/table/usertable";
import Image from "next/image";
import { sendRequest, sendRequestWithToken } from "@/service/request";

import UserImage from "@/assets/images/image_user.png";

import { Space, Modal, Spin, message, Typography } from "antd";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";

const { Text } = Typography;

const EmployeeManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };

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
    // {
    //   title: "Number of Leaves",
    //   dataIndex: "leaves",
    //   key: "leaves",
    // },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (date) => {
        const formattedDate = formatDate(date);
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            className="items-center text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => showRemoveModal(record.id)}
          >
            Remove
          </button>
          <button
            type="button"
            className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 inline-flex text-center "
            onClick={() => showUpdateModal(record.id)}
          >
            Update
          </button>
        </Space>
      ),
    },
  ];
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [originSelectedEmployee, setOriginSelectedEmployee] = useState({});
  const [employee, setEmployee] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [warning, setWarning] = useState("false");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1]
          : "none";
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/staffs/getAll",
          "GET",
          null,
          token
        );

        if (response) {
          setEmployee(response);
        } else {
          console.log("Failed to fetch information");
        }
      } catch (error) {
        console.error("Error while fetching information:", error);
      }
    };

    fetchEmployee();
  }, []);

  const showUpdateModal = (id) => {
    setSelectedEmployee(employee.find((employee) => employee.id === id));
    setOriginSelectedEmployee(employee.find((employee) => employee.id === id));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setLoading(false);
    setWarning("false");
    setIsModalOpen(false);
  };

  const showRemoveModal = (id) => {
    setSelectedEmployee(employee.find((employee) => employee.id === id));
    setIsRemoveModalOpen(true);
  };

  const handleCancelRemove = () => {
    setIsRemoveModalOpen(false);
  };

  const handleSubmit = async () => {
    const token = document.cookie
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1]
      : "none";
    if (
      !selectedEmployee.name ||
      !selectedEmployee.gender ||
      !selectedEmployee.birthday ||
      !selectedEmployee.address
    ) {
      setWarning("true");
    } else {
      setLoading(true);
      setWarning("false");

      const modifiedFields = { id: selectedEmployee.id };

      if (selectedEmployee.name !== originSelectedEmployee.name) {
        modifiedFields.name = selectedEmployee.name;
      }
      if (selectedEmployee.gender !== originSelectedEmployee.gender) {
        modifiedFields.gender = selectedEmployee.gender;
      }
      if (selectedEmployee.birthday !== originSelectedEmployee.birthday) {
        modifiedFields.birthday = selectedEmployee.birthday;
      }
      if (selectedEmployee.address !== originSelectedEmployee.address) {
        modifiedFields.address = selectedEmployee.address;
      }
      const response = await sendRequestWithToken(
        "https://tenten-server.adaptable.app/staffs/update",
        "POST",
        modifiedFields,
        token
      );
      if (response) {
        const updatedEmployee = employee.map((item) =>
          item.id === selectedEmployee.id
            ? { ...item, ...modifiedFields }
            : item
        );
        setLoading(false);
        setEmployee(updatedEmployee);
        setIsModalOpen(false);
        messageApi.open({
          type: "success",
          content: "Update successfully",
          duration: 3,
        });
      } else {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "Error",
          duration: 3,
        });
      }
    }
  };

  const handleDelete = async () => {
    const token = document.cookie
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1]
      : "none";

    const response = await sendRequestWithToken(
      `https://tenten-server.adaptable.app/staffs/delete-staff?id=${selectedEmployee.id}`,
      "POST",
      null,
      token
    );
    if (response.message === "SUCCESS") {
      const updatedEmployee = employee.filter(
        (item) => item.id !== selectedEmployee.id
      );
      setEmployee(updatedEmployee);
      setIsRemoveModalOpen(false);
      messageApi.open({
        type: "success",
        content: "Success",
        duration: 3,
      });
    } else {
      console.log(response);
      messageApi.open({
        type: "error",
        content: "Error",
        duration: 3,
      });
    }
  };

  return (
    <div className="PI-container">
      {contextHolder}
      <Header status={1}></Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex mt-14 mx-auto rounded-lg p-6 shadow-lg items-center">
          {employee.length !== 0 ? (
            <UserTable columns={columns} data={employee} />
          ) : (
            <Spin size="large"></Spin>
          )}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1128}
        centered
      >
        <div className="flex flex-col px-9 pb-9 items-center justify-center">
          <div className="flex w-full flex-col items-center p-2 mt-8">
            <Image
              className="rounded-full"
              src={UserImage}
              width={128}
              height={32}
              alt="avatar"
            ></Image>
            <span className="font-bold ">
              {selectedEmployee ? selectedEmployee.name : ""}
            </span>
            <span className="font-semibold text-gray-600">
              {selectedEmployee ? selectedEmployee.department : ""}
            </span>
            <span className="text-gray-600">
              ID: {selectedEmployee ? selectedEmployee.id : ""}
            </span>
          </div>
          <div className="mt-6 w-full items-center pt-6 pb-8 px-16 shadow-2xl rounded-md">
            <h1 className="text-2xl my-4 font-medium">Information</h1>
            <div className="pt-5">
              <form>
                <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                  <label className="inline-block w-1/4 text-left text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                    value={selectedEmployee ? selectedEmployee.name : ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                  <label className="inline-block w-1/4 text-left text-gray-600">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    placeholder="Enter your gender"
                    className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                    value={selectedEmployee ? selectedEmployee.gender : ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        gender: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                  <label className="inline-block w-1/4 text-left text-gray-600">
                    Birth of Date
                  </label>
                  <input
                    type="text"
                    id="birthDate"
                    name="birthDate"
                    placeholder="Enter your birth date"
                    className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                    value={
                      selectedEmployee
                        ? formatDate(selectedEmployee.birthday)
                        : ""
                    }
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        birthday: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                  <label className="inline-block w-1/4 text-left text-gray-600">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                    value={selectedEmployee ? selectedEmployee.address : ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="relative z-0 w-full mb-3 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                  <label className="inline-block w-1/4 text-left text-gray-600">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="Enter your role"
                    className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                    value={selectedEmployee ? selectedEmployee.role : ""}
                    disabled={true}
                  />
                </div>
                <div className="flex flex-row mb-3 items-center justify-left">
                  {warning === "true" ? (
                    <Text type="danger">
                      Some fields are empty, please fill them in
                    </Text>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-row items-center justify-center">
                  <button
                    type="button"
                    className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center "
                    onClick={handleCancel}
                  >
                    <Image
                      className="mr-2"
                      src="/cancel.svg"
                      width={20}
                      height={20}
                      alt="Logo"
                    />
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center "
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <LoadingOutlined
                        style={{
                          fontSize: "24px",
                          color: "white",
                          marginRight: "8px",
                        }}
                        spin
                      />
                    ) : (
                      <SendOutlined
                        style={{
                          fontSize: "24px",
                          color: "white",
                          marginRight: "8px",
                        }}
                      />
                    )}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={isRemoveModalOpen}
        onCancel={handleCancelRemove}
        footer={null}
        centered
      >
        <div className="flex flex-col items-center justify-center">
          <Image src="/warn.svg" width={80} height={80} alt="Logo" />
          <h1 className="text-xl my-4 font-medium">
            You have decided to delete this employee?
          </h1>
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
              onClick={handleDelete}
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
