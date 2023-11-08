"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar";
import UserImage from "@/assets/images/image_user.png";

import { sendRequest } from "@/service/request";

const UserInformation = () => {
  const [name, setName] = useState("Vo Cong Thanh");
  const [gender, setGender] = useState("Male");
  const [birthDate, setBirthDate] = useState("29/2/2002");
  const [address, setAddress] = useState("23 Ly Thuong Kiet street, Thu Duc district, Ho Chi Minh city");
  const [role, setRole] = useState("Admin");

  const [editable, setEditable] = useState(false);

  const handleSubmit = async () => {
    const response = await sendRequest("https://tenten-server.adaptable.app/", "PUT", {
      name,
      gender,
      birthDate,
      address,
      role,
    });
  
    if (response.ok) {
      setEditable(!editable);
      console.log("success");
    } else {
      console.log("Error");
    }
  };
  
  const handleEditable = () => {
    setEditable(!editable);
  };

  return (
    <div className="PI-container">
      <Header status={1}></Header>
      <Sidebar />
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center p-2 mt-14">
          <Image className="rounded-full" src={UserImage} width={128} height={32} alt="avatar"></Image>
          <span className="font-bold ">Vo Cong Thanh</span>
          <span className="font-semibold text-gray-600">Human resources department</span>
          <span className="text-gray-600">ID: 1234567890</span>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
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
                  disabled={!editable}
                />
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
                    >
                      <Image className="mr-2" src="/submit.svg" width={26} height={26} alt="Logo" />
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
