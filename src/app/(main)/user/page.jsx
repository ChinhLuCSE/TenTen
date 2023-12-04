"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar";
import UserImage from "@/assets/images/image_user.png";
import { sendRequestWithToken } from "@/service/request";

import { Typography, message } from "antd";
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';

const { Text } = Typography;

const UserInformation = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState({});
  const [originalUser, setOriginalUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState("false");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1]
          : "none";
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/account/info",
          "GET",
          null,
          token
        );

        if (response) {
          setUser(response);
          setOriginalUser(response);
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
  
  const handleSubmit = async () => {
    const token = document.cookie
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1]
      : "none";
    if (!user.name || !user.gender || !user.birthday || !user.address) {
      setWarning("true");
    } else {
    setWarning("false");
    setLoading(true);
    const modifiedFields = { id: user.id };

    if (user.name !== originalUser.name) {
      modifiedFields.name = user.name;
    }
    if (user.gender !== originalUser.gender) {
      modifiedFields.gender = user.gender;
    }
    if (user.birthday !== originalUser.birthday) {
      const modifiedBirthday = new Date(user.birthday);
      modifiedFields.birthday = modifiedBirthday;
    }
    if (user.address !== originalUser.address) {
      modifiedFields.address = user.address;
    }

    const response = await sendRequestWithToken(
      "https://tenten-server.adaptable.app/staffs/update",
      "POST",
      modifiedFields,
      token
    );

    if (response.message === "SUCCESS") {
      setEditable(!editable);
      setOriginalUser(user);
      setLoading(false);
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

  const handleEditable = () => {
    setLoading(false);
    setUser(originalUser);
    setEditable(!editable);
    setWarning("false");
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Loading...";
    }

    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  return (
    <div className="PI-container">
      {contextHolder}
      <Header status={1}></Header>
      <Sidebar />
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center p-2 mt-14">
          <Image className="rounded-full" src={UserImage} width={128} height={32} alt="avatar"></Image>
          <span className="font-bold ">{JSON.stringify(user) !== "{}" ? user.name : "Loading..."}</span>
          <span className="font-semibold text-gray-600">{user.department}</span>
          <span className="text-gray-600">ID: {user.id}</span>
        </div>
        <div className="mt-6 items-center w-1/2 pt-6 pb-8 px-16 shadow-2xl rounded-md">
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
                  value={JSON.stringify(user) !== "{}" ? user.name : "Loading..."}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  disabled={!editable}
                  required
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
                  value={JSON.stringify(user) !== "{}" ? user.gender : "Loading..."}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  disabled={!editable}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Birth of Date</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Enter your birth date"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={formatDate(user.birthday)}
                  onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                  disabled={!editable}
                  required
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
                  value={JSON.stringify(user) !== "{}" ? user.address : "Loading..."}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  disabled={!editable}
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-3 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter your role"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value={user.role || "Loading..."}
                  disabled={true}
                />
              </div>
              <div className="flex flex-row mb-3 items-center justify-left">
                {warning === "true" ?  <Text type="danger">Some fields are empty, please fill them in</Text> : ""}
              </div> 
              <div className="flex flex-row items-center justify-center">
                {!editable ? (
                  <>
                    <button
                      type="button"
                      className="items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleEditable}
                    >
                      <Image className="mr-2" src="/edit.svg" width={26} height={26} alt="Logo" />
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleEditable}
                    >
                      <Image className="mr-2" src="/cancel.svg" width={26} height={26} alt="Logo" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mx-2 items-center text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleSubmit}
                      disable={warning}
                    >
                      {loading ? <LoadingOutlined style={{ fontSize: '24px', color: 'white', marginRight: '8px' }} spin /> : <SendOutlined style={{ fontSize: '24px', color: 'white', marginRight: '8px' }} />}

                      Submit
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
