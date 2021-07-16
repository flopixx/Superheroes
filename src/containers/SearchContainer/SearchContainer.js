import { useState } from "react";
import "./searchcontainer.css";
import { InputSearch, CardResponse } from "../../components";
import { Row, Col, Spinner } from "react-bootstrap";
import useHeroContext from "../../context/HeroContext";
import Error from "../../context/Error";

const SearchContainer = () => {
  const [dataResponse, setDataResponse] = useState([]);
  const { isLoading } = useHeroContext();
  const [error, Seterror] = useState(false);

  return (
    <div className="search__container">
      <Row className="home__text__row fs-1 text-uppercase text-center text-light">
        <h1 className="search__title"> Encuentra tu héroe </h1>
      </Row>
      <Row className="search__row search__row-input">
        <Col className="col-10 col-md-8 col-lg-6">
          <InputSearch searchResponse={setDataResponse} Seterror={Seterror} />{" "}
        </Col>
      </Row>
      <Row className="search__row">
        <Col className="col-10 col-md-8">
          <p className="search__text">
            Recuerda que tu equipo debe estar conformado por{" "}
            <strong>máximo</strong> 3 villanos y 3 héroes
          </p>
        </Col>
      </Row>
      <div className=" container d-flex p-5 bd-highlight justify-content-evenly align-items-center  flex-wrap ">
        {dataResponse.response === "success" ? (
          <CardResponse dataResponse={dataResponse} />
        ) : isLoading ? (
          <Spinner
            animation="grow"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          />
        ) : error ? (
          <Error mensaje="No hay resultados " />
        ) : null}
      </div>
    </div>
  );
};

export default SearchContainer;
