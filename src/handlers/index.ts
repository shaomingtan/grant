import getHouseHold from './getHouseHold';

const init = (repo) => {
  return {
    getHouseHold: getHouseHold(repo),
  };
};

export default {init}