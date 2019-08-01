const QuestionSchema = require("./../database/schemas/QuestionSchema");
const { findCompanyOfUser } = require("./../middleware/user");
const { setAusDate } = require("./../middleware/company_surveys");

const index = async (req, res, next) => {
  // Finds the company linked to the user, then gets a random question from each category //
  const company = await findCompanyOfUser(req);
  const categories = QuestionSchema.obj.category.enum;
  const category_promises = [];
  const number = Math.floor(company.amountOfQuestionsToAsk) || 8;
  const amountOfTimes = Math.floor(number / categories.length);
  const leftovers = number % categories.length;

  /// Needed the index, so had to use dirty 'for' loop ///
  for (let i = 0; i < categories.length; i++) {
    const categoryArray = [];
    company.questions.map(question => {
      if (categories[i] === question.category) categoryArray.push(question);
    });

    const categoryQuestions =
      i + 1 <= leftovers ? amountOfTimes + 1 : amountOfTimes;
    let j = 0;
    let ensureNoDoubleUps = [];
    while (j < categoryQuestions) {
      let number = Math.floor(Math.random() * categoryArray.length);
      while (ensureNoDoubleUps.includes(number)) {
        number = Math.floor(Math.random() * categoryArray.length);
      }
      ensureNoDoubleUps.push(number);
      category_promises.push(categoryArray[number]);
      j++;
    }
  }

  //// Would be cool to be able to shuffle elements in array ////
  Promise.all(category_promises)
    .then(results => res.json(results))
    .catch(err => console.log(err));
};

// adds another checkin to th user. Calculates an overall score, then saves all categories to 2 decimal places //
const create = async (req, res, next) => {
  let results = req.body;
  let total = 0;
  let count = 0;
  for (let key in results) {
    total += results[key];
    count += 1;
    results[key] = results[key].toFixed(2);
  }
  overall = (total / count).toFixed(2);
  results = { ...results, overall };
  req.user.previousCheckins.push(results);
  try {
    await req.user.save();
    res.json(req.user.previousCheckins);
  } catch (err) {
    next(err);
  }
};

/// Gets all checkins belonging to a user, then sends back the last 20 ///
const userSurvey = async (req, res, next) => {
  const data = req.user.previousCheckins.slice(-20);
  try {
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  userSurvey
};
