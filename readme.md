# TLDR
I picked the wrong database(firestore) for the problem thinking that it could handle compound queries [for multiple fields with different comparison operators](https://firebase.google.com/docs/firestore/query-data/queries#compound_queries) like other nosql DBs.

# Context
- This is my solution for this [question](https://docs.google.com/document/d/1YyOJyq460UM3j8EzQsFgR4_VRspXy_tcxv5HRfMthwg/edit)
- I've completed all the endpoints except for the search as I ran out to time to switch to a different nosql DB
- My saving grace "I guess" was that I used dependency injection for the data model(Repo) so some switching to another db wouldn't be that painful.
- If you are still keen to speak with me, I'd be happy to share more about the considerations I made. Documenting some below...

# Assumptions
- I assume that writes to the members and household DB will be significantly less than reads from the DB. Hence I chose to use a nosql DB
- There will be more grant schemes in future so the search handler is designed to be flexible

# Approach for search handler
1. Members table contains computed data of the household ie(`annualHouseHoldIncome`) as well as relationship keys like(`motherID`, `fatherID`, `spouseID`). This will allow the search query to be performed on a single table increasing speed
2. Writes are tedious in that every time a member is added or updated to a household, the addMemberHandler would need to compute the new annualHouseHoldIncome and update this for all members of the household. Same for handling relationship.

## Example search query for Student Encouragement Scheme
1. User will pass in params(`age=16`, `age_sign=less_than`, `annual_household_income=150000`, `annual_household_income_sign=<`)
2. Query would be to to search for:
  - members who's dateOfBirth > `Date 16 years from today`
  - members who's annualHouseHoldIncome < `150000`
  - groupBy householdID

## Example search query for Family Togetherness Scheme
1. User will pass in params(`age=18`, `age_sign=less_than`, `mother_in_household=true`, `father_in_household=true`)
2. Query would be to to search for:
  - members who's dateOfBirth > `Date 18 years from today`
  - members who's fatherID != `null`
  - members who's motherID != `null`
  - groupBy householdID

## Example search query for Elder Bonus
1. User will pass in params(`age=50`, `age_sign=more_than`)
2. Query would be to to search for:
  - members who's dateOfBirth < `Date 50 years from today`
  - groupBy householdID

## Example search query for Baby Sunshine Grant
1. User will pass in params(`age=5`, `age_sign=less_than`)
2. Query would be to to search for:
  - members who's dateOfBirth > `Date 5 years from today`
  - groupBy householdID

## Example search query for YOLO GST Grant
1. User will pass in params(`annual_household_income=100000`, `annual_household_income_sign=<`)
2. Query would be to to search for:
  - members who's annualHouseHoldIncome < `100000`
  - groupBy householdID

# Prereq
1. Firebase cli: `npm install firebase`

# Setup and run tests
1. Install dependencies: `npm install`
2. Start firestore emulator: `firebase emulators:start --only firestore`
3. Run test: `npm test`
4. Start local server: `npm run start`