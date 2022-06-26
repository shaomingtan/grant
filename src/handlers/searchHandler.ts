import { subYears } from "date-fns";

export const SUPPORTED_PARAMS = {
  AGE: 'age',
  AGE_SIGN: 'age_sign',
  ANNUAL_HOUSEHOLD_INCOME: 'annual_household_income',
  ANNUAL_HOUSEHOLD_INCOME_SIGN: 'annual_household_income_sign',
  MOTHER_IN_HOUSEHOLD: 'mother_in_household',
  FATHER_IN_HOUSEHOLD: 'father_in_household',
}

const translateSign = (signString) => {
  switch (signString) {
    case "less_than": return '<';
    case "more_than": return '>';
    case "less_than_equal": return '<=';
    case "more_than_equal": return '>=';
    case "equal": return '==';
  }
}

// Age sign is reveresed for better ux for user querying
const translateAgeSign = (signString) => {
  switch (signString) {
    case "less_than": return '>';
    case "more_than": return '<';
    case "less_than_equal": return '>=';
    case "more_than_equal": return '<=';
    case "equal": return '==';
  }
}

export const calculateDOB = (age) => subYears(new Date(), parseInt(age))

const search = (repo) => async (query) => {
  console.log("query",query)

  // Validate query params are supported
  const requestQueryParamKeys = Object.keys(query)
  for(let i=0; i<requestQueryParamKeys.length;i++){
    const paramKey = requestQueryParamKeys[i]
    if (!Object.values(SUPPORTED_PARAMS).includes(paramKey)) {
      return {status: 400, message: `${paramKey} not supported.`}
    }
  }

  // TODO Add validation to ensure that complimentary params like age and age_sign are present
  // TODO Add validaiton to ensure similar params are not repeated
  // TODO validate age and annual_household_income have correct data format

  const queryPlan = []
  requestQueryParamKeys.map(paramKey => {
    switch (paramKey) {
      case SUPPORTED_PARAMS.ANNUAL_HOUSEHOLD_INCOME: {
        const sign = translateSign(query[SUPPORTED_PARAMS.ANNUAL_HOUSEHOLD_INCOME_SIGN])
        const value = query[SUPPORTED_PARAMS.ANNUAL_HOUSEHOLD_INCOME]
        queryPlan.push(['annualHouseHoldIncome', sign, value])
      }
      break
      case SUPPORTED_PARAMS.MOTHER_IN_HOUSEHOLD: {
        queryPlan.push(['motherID', '!=', null])
      }
      break
      case SUPPORTED_PARAMS.FATHER_IN_HOUSEHOLD: {
        queryPlan.push(['fatherID', '!=', null])
      }
      break
      case SUPPORTED_PARAMS.AGE: {
        const sign = translateAgeSign(query[SUPPORTED_PARAMS.AGE_SIGN])
        const value = calculateDOB(query[SUPPORTED_PARAMS.AGE])
        queryPlan.push(['dateOfBirth', sign, value])
      }
    }
  })
  console.log("queryPlan", queryPlan)
  
  // await repo.memberRepo.getDocumentsBy(queryPlan)

  return
}

export default search