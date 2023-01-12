import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import {
  removeAllFavoritesAction,
  removeFromFavoritesAction,
} from "../../redux/action/favorites.actions";

const FavoriteCustomers = () => {
  const favorites = useSelector((state) => state.favoritesReducer);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromFavoritesAction(id));
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "CompanyName",
      dataIndex: "companyName",
    },
    {
      title: "Contact Title",
      dataIndex: "contactTitle",
    },
    {
      title: "Adress",
      dataIndex: "address",
      render: (el) => `${el.city}, ${el.country}`,
    },
    {
      title: "Add To Favorites",
      render: (obj) => (
        <Button danger onClick={() => handleRemove(obj.id)}>
          Remove
        </Button>
      ),
    },
  ];
  return (
    <>
      <Button
        danger
        type="primary"
        onClick={() => dispatch(removeAllFavoritesAction())}
      >
        Remove All
      </Button>
      <Table columns={columns} dataSource={favorites} rowKey={"id"} />
    </>
  );
};

export default FavoriteCustomers;
