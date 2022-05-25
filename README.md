# Solution to HL_test_task

solved by using `create-react-app --typescript` and `axios` for data fetching

hardcoded API access token in `hooks/useTriggerFetch.tsx` valid only for 1 day -- in this case till 12:30 5/26/22

to run the app after the token is expired, new one has to be generated and replaced in the file line 13 as a key of headers object

## Instructions

### clone repo

### run `npm install`

### run `npm start`

app should start on localhost:3000
