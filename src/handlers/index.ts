import getHouseHolds from './getHouseHolds';

const init = (repo) => {
  return {
    getHouseHolds: getHouseHolds(repo),
  };
};

export default {init}