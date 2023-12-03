import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import './card.scss';
import io from 'socket.io-client';
import { sendRequestWithToken } from "@/service/request";

const Header = ({ status}) => {
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataNotif, setDataNotif] = useState([]);
  const [numNotif, setNumNotif] = useState(0);
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    const fetchUserInfo = async (done) => {
      try {
        const response = await sendRequestWithToken(
          "https://tenten-server.adaptable.app/account/info",
          // "http://localhost:3000/account/info", // Sang
          "GET",
          null,
          token
        );

        if (response) {
          setUser(response);
          done(response);
        } else {
          console.error("Failed to fetch user information");
        }
      } catch (error) {
        console.error("Error while fetching user information:", error);
      }
    };

    fetchUserInfo((user) => {
      const socket = io('http://localhost:4000');
      socket.on('init', ({data})=> {
        setDataNotif(data.sort((a,b) => (new Date(b.time).getTime() - new Date(a.time).getTime())));
        setNumNotif(data.filter(i=> i.status == '0').length);
      });
      socket.on('create', ({data}) => {
        if(user && user.role == 'ADMIN') {
          setDataNotif(data.filter(i => i.title == 'A new leave request').sort((a,b) => (new Date(b.time).getTime() - new Date(a.time).getTime())));
          setNumNotif(data.filter(i=>i.title == 'A new leave request' && i.status == '0').length);

        }
      });
      socket.on('handle', ({data}) => {
        if(user && user.role != 'ADMIN' && user.id == data.userId) {
          const list = data.list.filter( i => i.staffId == user.id && i.title != 'A new leave request')
          setDataNotif(list.sort((a,b) => (new Date(b.time).getTime() - new Date(a.time).getTime())));
          setNumNotif(list.filter(i => i.status == '0').length);
        }
      })
      return () => {
        socket.disconnect();
      };
    });
  }, []);

  const handleNotifClick = () => {
    const updateStatusNotif = async (list) => {
      try {
        const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    const response = await sendRequestWithToken(
      "https://tenten-server.adaptable.app/notification/updateStatus",
      // "http://localhost:3000/notification/updateStatus", // Sang
      "POST",
      {
        list
      },
      token
    );


      } catch (error) {
        console.error("Error while fetching user information:", error);
      }
    };
    if(dataNotif.filter(i => i.status == '0').length){
      updateStatusNotif(dataNotif);
    };
    setNumNotif(0);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const check = (title) => {
    if(title.includes('new')){
      return 'new';
    }else if(title.includes('reject')){
      return 'reject';
    }else return 'approve'
  } 
  return (

    <div className="header-container sticky top-0 z-30 w-full p-5 bg-white sm:px-7 shadow-lg">
      <div className="flex items-center justify-between max-w-full">
        <Link href="/user">
          <Image src="/logo.png" width={128} height={32} alt="Logo" />
        </Link>
        {status === 1 && (
          <>
            <div className="flex items-center">
              <h1 className="text-2xl font-medium">Employee Leave Management System</h1>
            </div>
            <div className="flex items-center space-x-1">
              <ul className="hidden space-x-2 md:inline-flex">
                <li>
                  <div className="relative mr-4" onClick={handleNotifClick}>
                    <Image className="mt-3" src="/notify.svg" width={24} height={24} alt="Logo" />
                    <span className="-top-2 absolute bg-red-600 text-white text-xs  mr-2 px-1 py-0.5 rounded-full dark:bg-red-900">
                      {numNotif}
                    </span>
                  </div>
                  {isModalVisible && (
                    <>
                      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} style={{
                        display: "flex",
                      }}>
                        <div
                          style={{
                            width: '40vw',
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            flexDirection: "column",
                            margin: "30px 30px",
                          }}
                        >
                          {/* content of list notification */}
                          <div class="container-fluid text-center">
                            {
                              dataNotif.map(i => {
                                let title = '', icon = '', titleIcon = '', icon2 = '';
                                if(check(i.title)=='approve'){
                                  title ='tip-box-success';
                                  icon = "info-tab tip-icon-alert";
                                  titleIcon = 'success';
                                  icon2 = 'new-message-box-success';
                                } else if(check(i.title)=='reject') {
                                  title = 'tip-box-danger';
                                  icon = "info-tab tip-icon-danger";
                                  titleIcon = 'error';
                                  icon2 = 'new-message-box-danger';
                                } else {
                                  title = 'tip-box-alert'
                                  icon = 'info-tab tip-icon-success'
                                  titleIcon = 'error';
                                  icon2 = 'new-message-box-alert';
                                };
                                return <>
                            <div class="row">
                              <div class="col-xs-12 col-sm-6 col-sm-offset-3">
                                
                                <div class="new-message-box">
                                <div class={icon2}>

                                    <div class={icon} title={titleIcon}><i></i></div>
                                    <div class={title}>
                                      <p><strong>{i.title}:</strong> {i.content} .{i.status == '0'?<strong style={{color: 'green'}}>(new)</strong>:''}</p>
                                    </div>
                                </div>
                                </div>
                              </div>
                            </div>
                                </>
                              })
                            }
                          </div>

                        </div>

                      </Modal>
                    </>
                  )}

                </li>
                <li>
                  <div className="relative">
                    <Image className="rounded-full" src="/avatar.svg" width={48} height={48} alt="Logo" />
                    <span className="-bottom-1 left-8 absolute w-3.5 h-3.5 bg-green-400  dark:border-gray-800 rounded-full"></span>
                  </div>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
