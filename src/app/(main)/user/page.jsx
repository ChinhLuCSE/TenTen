"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar";

const UserInformation = () => {
  const [editable, setEditable] = useState(true);
  const handleEditable = () => {
    setEditable(false);
  };

  return (
    <div className="PI-container">
      <Header status={1}></Header>
      <Sidebar />
      <div className="flex item-center justify-center">
        <div className="mt-8 item-center w-1/2 pt-6 pb-12 px-16 shadow-lg rounded-md">
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
                  value="Vo Cong Thanh"
                  disabled={editable}
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
                  value="Male"
                  disabled={editable}
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
                  value="29/2/2002"
                  disabled={editable}
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
                  value="23 Ly Thuong Kiet street, Thu Duc district, Ho Chi Minh city"
                  disabled={editable}
                />
              </div>

              <div className="relative z-0 w-full mb-6 group border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
                <label className="inline-block w-1/4 text-left text-gray-600">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Enter your role"
                  className="flex-1 py-2 outline-none w-3/4 font-semibold text-gray-500"
                  value="Admin"
                  disabled={editable}
                />
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 pt-3 pb-2.5 inline-flex text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleEditable}
                >
                  <Image className="mr-2" src="/edit.svg" width={16} height={16} alt="Logo" />
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
