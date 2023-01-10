import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <>
      <Main />
      <Row
        rowId="row1"
        title="Andrei Tarkovsky"
        fetchURL={requests.andreiTarkovsky}
      />
      <Row
        rowId="row2"
        title="Frederico Fellini"
        fetchURL={requests.fredericoFellini}
      />
      <Row
        rowId="row3"
        title="Ingmar Bergman"
        fetchURL={requests.ingmarBergman}
      />
      <Row
        rowId="row5"
        title="Michelangelo Antonioni"
        fetchURL={requests.michelangeloAntonioni}
      />
      <Row
        rowId="row5"
        title="Robert Bresson"
        fetchURL={requests.robertBresson}
      />
      <Row
        rowId="row6"
        title="Alain Resnais"
        fetchURL={requests.alainResnais}
      />
    </>
  );
};

export default Home;
