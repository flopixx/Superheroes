import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import useHeroContext from '../../context/HeroContext';

const AddHeroButton = (props) => {
  const { selectedHero } = useHeroContext();
  const [count, setCount] = useState(0);
  const [isAdded, setAdded] = useState(false);
  
  const handleDuplicate = (id) => {
    const existId = selectedHero.find((hero) => hero.id === id);
    if (existId !== undefined) {
      setAdded(true);
    } else {
      setAdded(false);
    }
  };
  
  const countPower = (stats) => {
    let totalCount = 0;
    Object.entries(stats).map((entry) => totalCount = totalCount + parseInt(entry[1]));
    setCount(totalCount);
  };
  
    useEffect(() => {
      countPower(props.stats);
    });
  
  const whichButton = (alignment) => {
    if (isAdded === true) {
      return (
        <Button
          disable
          className="btn btn-secondary col-12"
          style={{ boxShadow: '2px 1px' }}
        >
          agregado
        </Button>
      );
    } else if (alignment === 'good' || alignment === 'neutral') {
      return (
        <Button
          className="btn btn-success col-12"
          style={{ boxShadow: '2px 1px' }}
          onClick={() => props.addGood()}
        >
          Añadir
        </Button>
      );
    } else {
      return (
        <Button
          className="btn btn-danger w-100"
          style={{ boxShadow: '2px 1px' }}
          onClick={() => props.addBad()}
        >
          Añadir
        </Button>
      );
    }
  };

  useEffect(() => {
    handleDuplicate(props.id);
  });

  return (
    <div>
      {isNaN(count) ? (
        <Button
          className="btn btn-dark w-100"
          style={{ cursor: 'default', boxShadow: '2px 1px' }}
        >
          No disponible
        </Button>
      ) : (
        whichButton(props.alignment)
      )}
    </div>
  );
};

export default AddHeroButton;
