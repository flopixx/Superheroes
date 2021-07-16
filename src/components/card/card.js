import { useState } from "react";
import "./card.css";
import { Card, Button, Modal, Row, Table } from "react-bootstrap";
import useHeroContext from "../../context/HeroContext";

const CardItem = ({ hero }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { deleteGood, deleteBad } = useHeroContext();

  return (
    <div
      className={`${
        hero.alignment === "good" ? "card__bt-good" : "card__bt-bad"
      }`}
    >
      <Card className="card  card-container">
        <Card.Body
          className={`${
            hero.alignment === "good" ? "card__bt-good" : "card__bt-bad"
          }`}
        >
          <Card.Title className="card__bt-title">{hero.name}</Card.Title>
          <Card.Img className="card-img-top" src={hero.image} />
          <Card.Text className="card__bt-text">{hero.biography}</Card.Text>

          <div className="modal__detail-container">
            <Modal className="modal__detail" show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>{hero.name}</Modal.Title>
                <Button variant="primary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Header>
              <Modal.Body className="">
                <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <td>intelligence {hero.stats.intelligence} </td>
                      <td>Strength {hero.stats.strength}</td>
                      <td>Speed {hero.stats.speed}</td>
                      <td> {hero.weight}</td>
                    </tr>
                    <tr>
                      <td>Durability {hero.stats.durability}</td>
                      <td>Combat {hero.stats.combat}</td>
                      <td>
                        <strong>Power </strong>
                        {hero.stats.power}
                      </td>
                      <td>{hero.height}</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <div className="d-flex">
                  <p className="px-3">Esta acción no puede revertirse </p>
                  <Button
                    className="card__bt-btn"
                    variant="danger"
                    onClick={
                      hero.alignment === "good"
                        ? () => deleteGood(hero)
                        : () => deleteBad(hero)
                    }
                  >
                    Borrar
                  </Button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

          <Row>
            <Button
              className="card__bt-btn"
              variant="primary"
              onClick={handleShow}
            >
              Stats
            </Button>
            <Button
              className="card__bt-btn"
              variant="danger"
              onClick={
                hero.alignment === "good"
                  ? () => deleteGood(hero)
                  : () => deleteBad(hero)
              }
            >
              Borrar
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItem;
