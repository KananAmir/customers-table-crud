import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavoritesAction,
  removeFromFavoritesAction,
} from "../../redux/action/favorites.actions";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Button, Input, Space } from "antd";
import {
  deletCustomerAction,
  getAllCustomersAction,
} from "../../redux/action/customers.actions";
import Loading from "../../components/loading";
import { message, Popconfirm } from "antd";

const CustomerList = () => {
  const favorites = useSelector((state) => state.favoritesReducer);
  // const customers = useSelector((state) => state.customersReducer.data);
  const customersData = useSelector((state) => state.customersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomersAction());
  }, []);

  const handleAddToFavorites = (customer) => {
    if (!favorites.find((q) => q.id === customer.id)) {
      dispatch(addToFavoritesAction(customer));
    } else {
      window.alert("Already Favorited");
    }
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleDeleteCustomer = (id) => {
    dispatch(deletCustomerAction(id));
    dispatch(removeFromFavoritesAction(id));
    // dispatch(getAllCustomersAction());
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const confirm = (id) => {
    handleDeleteCustomer(id);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "CompanyName",
      dataIndex: "companyName",
      sorter: (a, b) => (a.companyName > b.companyName ? 1 : -1),
    },
    {
      title: "Contact Title",
      dataIndex: "contactTitle",
      ...getColumnSearchProps("contactTitle"),
    },
    {
      title: "Adress",
      dataIndex: "address",
      render: (el) => `${el.city}, ${el.country}`,
    },
    {
      title: "DELETE",
      render: (element) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => confirm(element.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
    {
      title: "Add To Favorites",
      render: (obj) => (
        <Button
          type={!favorites.find((q) => q.id === obj.id) ? "ghost " : "primary"}
          onClick={() => handleAddToFavorites(obj)}
        >
          {!favorites.find((q) => q.id === obj.id)
            ? "Add to Favorites"
            : "Favorited Already"}
        </Button>
      ),
    },
  ];

  return (
    <>
      {customersData.loading ? (
        <Loading />
      ) : (
        <Table
          columns={columns}
          dataSource={customersData.data}
          rowKey={"id"}
        />
      )}
    </>
  );
};

export default CustomerList;
