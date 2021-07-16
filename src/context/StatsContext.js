import React, { createContext, useContext, useState, useEffect } from 'react';

export const StatsContext = createContext([]);
const useStatsContext = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const [totalStats, setTotalStats] = useState([]);
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('total-stats')) {
      let total = localStorage.getItem('total-stats');
      total = JSON.parse(total);
      setTotalStats(total);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('total-stats', JSON.stringify(totalStats));
  }, [totalStats]);

  const handleStats = (heroStats) => {
    if (Object.keys(totalStats).length === 0) {
      setTotalStats(heroStats);
    } else {
      const handleCombat =
        parseInt(totalStats.combat) + parseInt(heroStats.combat);
      const handleDurability =
        parseInt(totalStats.durability) + parseInt(heroStats.durability);
      const handleIntelligence =
        parseInt(totalStats.intelligence) + parseInt(heroStats.intelligence);
      const handlePower = parseInt(totalStats.power) + parseInt(heroStats.power);
      const handleSpeed = parseInt(totalStats.speed) + parseInt(heroStats.speed);
      const handleStrength =
        parseInt(totalStats.strength) + parseInt(heroStats.strength);
      const newStats = {
        combat: handleCombat.toString(),
        durability: handleDurability.toString(),
        intelligence: handleIntelligence.toString(),
        power: handlePower.toString(),
        speed: handleSpeed.toString(),
        strength: handleStrength.toString(),
      };
      setTotalStats(newStats);
    }
  };

  const deleteStats = (heroStats) => {
    const newCombat =
      parseInt(totalStats.combat) - parseInt(heroStats.stats.combat);
    const newDurability =
      parseInt(totalStats.durability) - parseInt(heroStats.stats.durability);
    const newIntelligence =
      parseInt(totalStats.intelligence) -
      parseInt(heroStats.stats.intelligence);
    const newPower =
      parseInt(totalStats.power) - parseInt(heroStats.stats.power);
    const newSpeed =
      parseInt(totalStats.speed) - parseInt(heroStats.stats.speed);
    const newStrength =
      parseInt(totalStats.strength) - parseInt(heroStats.stats.strength);
    const newStats = {
      combat: newCombat.toString(),
      durability: newDurability.toString(),
      intelligence: newIntelligence.toString(),
      power: newPower.toString(),
      speed: newSpeed.toString(),
      strength: newStrength.toString(),
    };
    setTotalStats(newStats);
  };

  const handleAverage = (selectedHero) => {
    let pesoTotal = 0;
    let altTotal = 0;
    const separador = ' ';
    if (selectedHero.length === 0) {
      setPeso(0);
      setAltura(0);
    } else {
      const promedioPeso = selectedHero.map((hero) => {
        const peso = hero.weight[1].split(separador)[0];
        pesoTotal = pesoTotal + parseInt(peso);
        return pesoTotal;
      });
      const promedioAlt = selectedHero.map((hero) => {
        const alt = hero.height[1].split(separador)[0];
        altTotal = altTotal + parseInt(alt);
        return altTotal;
      });
      const resPeso = Math.trunc(
        promedioPeso.find((peso) => peso === pesoTotal) / selectedHero.length
      );
      const resAlt = Math.trunc(
        promedioAlt.find((alt) => alt === altTotal) / selectedHero.length
      );
      const promedios = [resPeso.toString(), resAlt.toString()];
      setPeso(promedios[0]);
      setAltura(promedios[1]);
    }
  };

  const maxStats = (totalStats) => {
    let mainCategory = 0;
    let categoryName = [];
    let maxPower = [];

    if (totalStats.length === 0) {
      return 'Selecciona tu equipo para saber sus estadísticas!';
    } else if (totalStats.combat === '0') {
      return 'Ninguna categoría ha sido declarada aún';
    } else {
      maxPower = Object.entries(totalStats).filter((entry) => {
        if (parseInt(entry[1]) > mainCategory) {
          mainCategory = parseInt(entry[1]);
        }
        return entry;
      });
      categoryName = maxPower.find(
        (power) => parseInt(power[1]) === mainCategory
      );
      return categoryName[0];
    }
  };

  return (
    <StatsContext.Provider
      value={{
        handleStats,
        handleAverage,
        deleteStats,
        maxStats,
        totalStats,
        altura,
        peso,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export default useStatsContext;
