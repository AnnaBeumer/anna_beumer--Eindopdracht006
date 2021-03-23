const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn, {})).toBe(30);
  });

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

// Eigen tests
describe("getCostsForCrop", () => {
  const corn = {
    numCrops: 30,
    costPerCrop: 0.5,
  };
  const pumpkin = {
    numCrops: 30,
    costPerCrop: 1.5,
  };

  test("Get cost for crop with number of crops with no environment factors", () => {
    expect(getCostsForCrop(corn)).toBe(15);
    expect(getCostsForCrop(pumpkin)).toBe(45);
  });
});

describe("getRevenueForCrop", () => {
  const corn = {
    yield: 30,
    saleprice: 2,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: -60,
        medium: -30,
        high: 0,
      },
    },
  };
  const pumpkin = {
    yield: 30,
    saleprice: 1.5,
    factors: {
      sun: {
        low: -40,
        medium: 0,
        high: 60,
      },
      wind: {
        low: 0,
        medium: 0,
        high: 0,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "medium",
  };

  test("Get revenue for corn with no environment factors", () => {
    expect(getRevenueForCrop(corn, {})).toBe(60);
  });
  test("Get revenue for pumpkin with no environment factors", () => {
    expect(getRevenueForCrop(pumpkin, {})).toBe(45);
  });

  test("Get revenue for corn with environment factors", () => {
    expect(getRevenueForCrop(corn, environmentFactors)).toBe(63);
  });
  test("Get revenue for pumpkin with environment factors", () => {
    expect(getRevenueForCrop(pumpkin, environmentFactors)).toBe(72);
  });
});

describe("getProfitForCrop", () => {
  const corn = {
    revenue: 30,
    costs: 5,
  };
  test("Get profit for crop with no environment factors", () => {
    expect(getProfitForCrop(corn)).toBe(25);
  });
});

describe("getTotalProfit", () => {
  const profits = [30, 10, 40];

  test("Get total profit with no environment factors", () => {
    expect(getTotalProfit(profits)).toBe(80);
  });
});
