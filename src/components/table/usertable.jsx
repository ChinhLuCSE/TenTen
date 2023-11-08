import { Table } from "antd";
import "./usertable.css";

const UserTable = ({ columns, data, isLoading }) => {
  return <Table rowKey={(data) => data.id} dataSource={data} columns={columns} size="large" loading={isLoading} />;
};

export default UserTable;
