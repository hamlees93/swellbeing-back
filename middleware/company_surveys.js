// Apologies for the mess. MIddleware to aggregate, sort and take the last 10 days of company's user's checkins. The reason being, the graph looked messy when all was rendered. Most of the confusing logic comes from date formatting to sort the checkins, then putting the date back in a nice format //

const sortSurveys = companyWideScore => {
  companyWideScore.sort(function(a, b) {
    surveyDate = a.surveyDate
      .split("/")
      .map(item => (item.length === 1 ? (item = `0${item}`) : item))
      .reverse()
      .join("");
    b.surveyDate = b.surveyDate
      .split("/")
      .map(item => (item.length === 1 ? (item = `0${item}`) : item))
      .reverse()
      .join("");
    return a > b ? 1 : a < b ? -1 : 0;
  });
  return companyWideScore;
};

const lastTenDates = allSurveys => {
  if (allSurveys.length < 2) return null;
  const categories = ["physical", "mental", "social", "emotional", "overall"];
  let i = allSurveys.length - 1;
  let count = 1;
  const surveysOrganisedByDate = [];
  let surveysOnSameDay = null;
  while (i >= 0 && surveysOrganisedByDate.length < 10) {
    if (surveysOnSameDay === null) {
      surveysOnSameDay = allSurveys[i];
    } else if (allSurveys[i].surveyDate === allSurveys[i + 1].surveyDate) {
      for (let key in surveysOnSameDay) {
        if (categories.includes(key))
          surveysOnSameDay[key] += allSurveys[i][key];
      }
      count += 1;
    } else {
      for (let key in surveysOnSameDay) {
        if (categories.includes(key))
          surveysOnSameDay[key] = (surveysOnSameDay[key] / count).toFixed(2);
      }
      surveysOnSameDay.surveyDate = formatDate(surveysOnSameDay.surveyDate);
      surveysOrganisedByDate.push(surveysOnSameDay);
      surveysOnSameDay = allSurveys[i];
      count = 1;
    }
    i -= 1;
  }
  return surveysOrganisedByDate.reverse();
};

const formatDate = surveyDate => {
  let newDate = `${surveyDate.slice(6, 8)}/${surveyDate.slice(
    4,
    6
  )}/${surveyDate.slice(0, 4)}`;
  return newDate;
};

module.exports = {
  lastTenDates,
  sortSurveys
};
