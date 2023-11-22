"use client";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import ColumnChart from "@/components/chart/ColumnChart";

import { sendRequestWithToken } from "@/service/request";

import { Space, Modal, Tag } from "antd";
import { useEffect, useState } from "react";

function Statistics() {
  const [statisticStatus, setStatisticStatus] = useState([]);
  const [statisticStaff, setStatisticStaff] = useState([]);
  const [statisticOption, setStatisticOption] = useState({
    status: 1,
    staff: 1,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1]
          : "none";

        const response = await sendRequestWithToken(
          `https://tenten-server.adaptable.app/statistic/status?month=${
            statisticOption?.status ?? 1
          }`,
          "GET",
          null,
          token
        );

        if (response) {
          //   console.log("fetchStatus", response);
          setStatisticStatus(response);
        } else {
          console.log("Failed to fetch information");
        }
      } catch (error) {
        console.error("Error while fetching information:", error);
      }
    };

    fetchStatus();
  }, [statisticOption?.status]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = document.cookie
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              .split("=")[1]
          : "none";

        const response = await sendRequestWithToken(
          `https://tenten-server.adaptable.app/statistic/dayoff?month=${
            statisticOption?.staff ?? 1
          }`,
          "GET",
          null,
          token
        );
        if (response) {
          //   console.log("fetchStaff", response);
          setStatisticStaff(response);
        } else {
          console.log("Failed to fetch information");
        }
      } catch (error) {
        console.error("Error while fetching information:", error);
      }
    };

    fetchStaff();
  }, [statisticOption?.staff]);

  const formatedStatus = [
    {
      label: "Pending",
      count:
        statisticStatus.find((element) => element.status === "PENDING")
          ?.count ?? 0,
      color: "warning",
    },
    {
      label: "Approved",
      count:
        statisticStatus.find((element) => element.status === "ACCEPT")?.count ??
        0,
      color: "normal",
    },
    {
      label: "Rejected",
      count:
        statisticStatus.find((element) => element.status === "REJECT")?.count ??
        0,
      color: "danger",
    },
  ];
  //   console.log(formatedStatus);

  const formatedStaff = statisticStaff.reduce((prevArr, item) => [...prevArr, {
    label: `${item.name !== "" ? `${item.name}` : ''} ${item.id ? `id: ${item.id}` : ""}`,
    count: item.dayoff,
    color: item.dayoff <= 12*statisticOption.staff ? "staff" : 'danger'
  }], []);

  return (
    <>
      <Header status={1} />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-row flex-wrap p-4 mx-auto mt-14 gap-10 min-w-[840px] w-10/12">
          <div className=" border rounded flex-1 min-w-[400px] p-8">
            <ColumnChart
              optionList={[
                {
                  value: 1,
                  label: "Last month",
                },
                {
                  value: 3,
                  label: "Within 3 months",
                },
              ]}
              data={formatedStatus}
              chartName="Application Status"
              onOptionChange={(newData) => {
                setStatisticOption((prevOption) => ({
                  ...prevOption,
                  status: newData,
                }));
              }}
            />
          </div>

          <div className=" border rounded flex-1 min-w-[400px] p-8">
            <ColumnChart
              optionList={[
                {
                  value: 1,
                  label: "Last month",
                },
                {
                  value: 3,
                  label: "Within 3 months",
                },
              ]}
              data={formatedStaff}
              chartName="Number of Application"
              onOptionChange={(newData) => {
                setStatisticOption((prevOption) => ({
                  ...prevOption,
                  staff: newData,
                }));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
