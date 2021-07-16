import React, { createContext, useContext, useState, useEffect } from 'react';
import useStatsContext from './StatsContext';

export const HeroContext = createContext([]);

const useHeroContext = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const [selectedHero, setSelectedHero] = useState([]);
  const [heroContador, setHeroContador] = useState(0);
  const [villianCounter, setVillianCounter] = useState(0);
  const [heroCounter, setHeroCounter] = useState(0);
  const { handleStats, deleteStats, handleAverage } = useStatsContext()
  const [ isLoading, setIsLoading ] = useState(false)

  /**************** MANIPULANDO DOM *****************/
  useEffect(() => {
    if (localStorage.getItem('mi-equipo')) {
      let fullTeam = localStorage.getItem('mi-equipo');
      fullTeam = JSON.parse(fullTeam);
      setSelectedHero(fullTeam);

      let heroBadStorage = localStorage.getItem('villians');
      heroBadStorage = JSON.parse(heroBadStorage);
      setVillianCounter(heroBadStorage);

      let heroGoodStorage = localStorage.getItem('heros');
      heroGoodStorage = JSON.parse(heroGoodStorage);
      setHeroCounter(heroGoodStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mi-equipo', JSON.stringify(selectedHero));
    localStorage.setItem('villians', JSON.stringify(villianCounter));
    localStorage.setItem('heros', JSON.stringify(heroCounter));
  }, [selectedHero, villianCounter, heroCounter]);

  useEffect(() => {
    selectedHero.length >= 0 && handleAverage(selectedHero)
  },[selectedHero, handleAverage])

  /**************** AGREGANDO HEROES *****************/
  const addGood = (hero) => {
    if (heroCounter === 3) {
      alert('maximo de 3 héroes con orientacion buena alcanzado');
    } else if (!searchHeroId(hero.id)){
      alert('ya tienes ese héroe')
    }
      else {
      const heroGood = heroCounter + 1;
      setHeroCounter(heroGood);
      heroAdded(hero);
    }
  };

  const addBad = (hero) => {
    if (villianCounter === 3) {
      alert('maximo de 3 héroes con orientacion buena alcanzado');
    } else if (!searchHeroId(hero.id)){
      alert('ya tienes ese héroe')
    }
      else {
      const heroBad = villianCounter + 1;
      setVillianCounter(heroBad);
      heroAdded(hero);
    }
  };

  const heroAdded = (data) => {
    let hero = {
      id: data.id,
      name: data.name,
      stats: data.powerstats,
      image: data.image.url,
      alignment: data.biography.alignment,
      weight: data.appearance.weight,
      height: data.appearance.height,
    };
      setSelectedHero([...selectedHero, hero]);
      handleStats(hero.stats)
  };

  const searchHeroId = (heroId) => {
    // devuelve el primer valor que coincida con el heroId o undefined
    let duplicated = selectedHero.find((hero) => hero.id === heroId);
    if (duplicated === undefined) {
      return true;
    } else {
      return false;
    }
  };

  /**************** ELIMINANDO HEROES *****************/
  const deleteGood = (hero) => {
    setHeroCounter(heroCounter - 1);
    deleteHero(hero)
    deleteStats(hero)
  };

  const deleteBad = (hero) => {
    setVillianCounter(villianCounter - 1);
    deleteHero(hero)
    deleteStats(hero)
  };

  const deleteHero = (hero) => {
    // crea un nuevo array con todos menos el buscado
    const filtered = selectedHero.filter(
      (filterHeros) => filterHeros.id !== hero.id
    );
    setSelectedHero(filtered)
  };

  return (
    <HeroContext.Provider
      value={{
        selectedHero,
        setSelectedHero,
        heroContador,
        setHeroContador,
        heroAdded,
        addBad,
        addGood,
        deleteGood,
        deleteBad,
        setIsLoading,
        isLoading
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export default useHeroContext;
