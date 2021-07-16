import { AddHeroButton } from "../index";

import useHeroContext from "../../context/HeroContext";
import "./Cardresponse.css";

const CardResponse = ({ dataResponse }) => {
  const { addGood, addBad, selectedHero, isLoading } = useHeroContext();

  const handleTeam = (result) => {
    return selectedHero.length === 6 ? (
      <label className="btn-light btn w-100 fw-bold">Máximo alcanzado</label>
    ) : (
      <AddHeroButton
        id={result.id}
        addGood={() => addGood(result)}
        addBad={() => addBad(result)}
        alignment={result.biography.alignment}
        stats={result.powerstats}
      />
    );
  };

  return (
    <>
      {!isLoading
        ? dataResponse.results.map((result) => {
            return (
              <div className=" col-lg-4 col-md-6 ">
                <div className="card  card-container  " key={result.id}>
                  <img
                    src={result && result.image.url}
                    className="card-img-top image-width"
                  />
                  <div className="card-body">
                    <h5 className="card-title title-bold text-center">
                      {result && result.name}
                    </h5>
                    {handleTeam(result)}
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default CardResponse;
