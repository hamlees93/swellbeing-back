const { findAllUsersBelongingToCompany } = require("./../middleware/user");
const {
  lastTenDates,
  sortSurveys
} = require("./../middleware/company_surveys");

// Use middleware to find all users belonging to a company. Push all their previous checkins into an array. Sort that array, and select the last 10 days worth //
const index = async (req, res, next) => {
  const users = await findAllUsersBelongingToCompany(req);
  const companyWideScore = [];
  users.map(user => {
    user.previousCheckins.map(checkin => {
      companyWideScore.push(checkin);
    });
  });
  const sortedSurveys = sortSurveys(companyWideScore);
  lastTen = lastTenDates(sortedSurveys);
  res.json(lastTen);
};

module.exports = {
  index
};
