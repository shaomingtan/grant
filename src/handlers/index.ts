import getHouseHold from './getHouseHold';

const init = (db) => {
  return {
    getHouseHold: getHouseHold(db),
  };
};

export default {init}