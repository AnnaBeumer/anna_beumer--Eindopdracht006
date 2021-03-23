const getYieldForPlant = (obj, env) => {
  const yieldForPlant = obj.yield;
  let factor = 1;
  if (env.hasOwnProperty("sun")) {
    const environmentFactors = env.sun;
    factor = (100 + obj.factors.sun[environmentFactors]) / 100;
  }
  return yieldForPlant * factor;
};

const getYieldForCrop = (obj) => {
  const getYield = obj.crop.yield;
  const getNumCrops = obj.numCrops;
  return getYield * getNumCrops;
};

const getTotalYield = (obj) => {
  const cropArr = obj.crops;

  const reducer = (accumulator, currentValue) => {
    const numCrops = currentValue.numCrops;
    const cropObject = currentValue.crop;
    const cropYield = cropObject.yield;
    return accumulator + cropYield * numCrops;
  };

  return cropArr.reduce(reducer, 0);
};

const getCostsForCrop = (obj) => {
  const numCrops = obj.numCrops;
  const costPerCrop = obj.costPerCrop;
  return numCrops * costPerCrop;
};

const getRevenueForCrop = (obj, env) => {
  const sales = obj.yield;
  const saleprice = obj.saleprice;
  let factorSun = 1;
  let factorWind = 1;
  if (env.hasOwnProperty("sun")) {
    const environmentFactors = env.sun;
    factorSun = (100 + obj.factors.sun[environmentFactors]) / 100;
  }
  if (env.hasOwnProperty("wind")) {
    const environmentFactors = env.wind;
    factorWind = (100 + obj.factors.wind[environmentFactors]) / 100;
  }
  return Math.ceil(saleprice * (sales * factorSun * factorWind));
};

const getProfitForCrop = (obj) => {
  const revenue = obj.revenue;
  const costs = obj.costs;
  return revenue - costs;
};

const getTotalProfit = (arr) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };

  return arr.reduce(reducer, 0);
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
