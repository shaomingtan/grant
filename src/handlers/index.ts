import getHouseHolds from './houseHoldHandler';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
  };
};

export default {init}