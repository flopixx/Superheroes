import { useEffect } from "react";
import { Jumbotron, Table, Col } from "react-bootstrap";
import useStatsContext from "../../context/StatsContext";

import intelligence from "../../images/intelligence.png";
import height from "../../images/altura.png";
import combat from "../../images/combat.png";
import durability from "../../images/durability.png";
import weight from "../../images/peso.png";
import power from "../../images/power.png";
import speed from "../../images/speed.png";
import strength from "../../images/strength.png";

const GeneralStats = () => {
  const { totalStats, altura, peso, maxStats } = useStatsContext();

  useEffect(() => {
    maxStats(totalStats);
  }, [maxStats, totalStats]);

  return (
    <Col md={8} lg={9} className="mx-auto py-2">
      <Jumbotron>
        <Table striped bordered hover variant="dark">
          <tbody className="">
            <tr className="">
              <td className="">
                <div className="d-flex justify-content-around">
                  <span className="">
                    intelligence {totalStats.intelligence}
                  </span>
                  <img src={intelligence} alt="intelligence" />
                </div>
              </td>
              <td className="">
                <div className="d-flex justify-content-around">
                  <span className="">Strength {totalStats.strength}</span>
                  <img src={strength} alt="strength" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Speed {totalStats.speed}</span>
                  <img src={speed} alt="speed" />
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Power {totalStats.power}</span>
                  <img src={power} alt="power" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Durability {totalStats.durability}</span>
                  <img src={durability} alt="durability" />
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Combat {totalStats.combat}</span>
                  <img src={combat} alt="combat" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Weight {peso} kg</span>
                  <img src={weight} alt="peso" />
                </div>
              </td>
              <td>
                <div className="d-flex justify-content-around">
                  <span>Height {altura} cm</span>
                  <img src={height} alt="altura" />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <div className="d-flex justify-content-center">
                  <p>
                    <strong>Categoria principal:</strong> {maxStats(totalStats)}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Jumbotron>
    </Col>
  );
};

export default GeneralStats;
