import { CardContainer, StatsContainer } from "../index";
import "./homecontainer.css";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import useHeroContext from "../../context/HeroContext";

const HomeContainer = () => {
  const { selectedHero } = useHeroContext();

  return (
    <div className="home-container ">
      <Row className="home__text__row fs-1 text-uppercase text-center text-light">
        <h1>Estos son tus heroes</h1>
      </Row>
      {selectedHero.length === 0 ? (
        <Row className="d-flex justify-content-center ">
          <span className="text-center home-container-no-hero">
            ¡No tienes héroes aun!
          </span>
          <Link className="col-4 col-sm-2 my-2 text-center" to="/search">
            <Button variant="primary">Click aqui &rarr;</Button>
          </Link>
        </Row>
      ) : (
        <Row className=" d-flex   p-4 bd-highlight justify-content-evenly align-items-center ">
          <CardContainer />
        </Row>
      )}
      <div className=" fs-1 text-uppercase text-center text-light ">
        <h2>Estadisticas</h2>
      </div>
      <div className="container">
        <StatsContainer />
      </div>
    </div>
  );
};

export default HomeContainer;
