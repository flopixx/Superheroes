import { CardItem } from "../../components/";
import { Col } from "react-bootstrap";
import useHeroContext from "../../context/HeroContext";

const CardContainer = () => {
  const { selectedHero } = useHeroContext();
  return (
    <>
      {selectedHero.map((hero) => (
        <div key={hero.id} className="col-lg-4 col-md-6 ">
          <CardItem hero={hero} className="card-item" />
        </div>
      ))}
    </>
  );
};

export default CardContainer;
