import React from "react";
import "./HomePage.css";
import Layout from "../../components/Layout/Layout";
import HeaderNav from "../../components/header_nav/HeaderNav";
import BlockTitle from "../../components/BlockTitle/BlockTitle";
import ListCard from "../../components/ListCard/ListCard";

const HomePage = () => {
  return (
    <Layout>
      <HeaderNav />
      <BlockTitle title={"PC"} />
      <ListCard />
      <BlockTitle title={"MÀN HÌNH"} />
      <ListCard />
      <BlockTitle title={"CHUỘT"} />
      <ListCard />
      <BlockTitle title={"BÀN PHÍM"} />
      <ListCard />
    </Layout>
  );
};

export default HomePage;
