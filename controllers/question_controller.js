// CRUD resource for company to personalize their questions //

const index = async (req, res, next) => {
  try {
    const response = await res.json(req.user.questions);
    return response;
  } catch(err) {
    next(err);
  };
};

const create = async (req, res, next) => {
  req.user.questions.push(req.body);
  try {
    await req.user.save();
    res.json(req.user.questions);
  } catch(err) {
    next(err);
  };
};

const update = async (req, res, next) => {
  let { id } = req.params;
  let { description, category, image } = req.body;
  let question = req.user.questions.id(id);

  try {
      question.description = description;
      question.category = category;
      question.image = image;
      await req.user.save();
      return res.json(req.user.questions);
  } catch (error) {
      next(error);
  }
};

const destroy = async (req, res, next) => {
  let { id } = req.params;
  let question = req.user.questions.id(id);

  try {
      question.remove();
      await req.user.save();
      return res.json(req.user.questions);
  } catch (error) {
      console.log(error);
  }
};

// Get and update the amount of questions that will be rendered when a user's employees have a checkin //
const getNumberOfQuestions = async (req, res, next) => {
  return res.json(req.user.amountOfQuestionsToAsk);
};

const updateNumberOfQuestions = async (req, res, next) => {
  const { tempAmount } = req.body;

  try {
    req.user.amountOfQuestionsToAsk = tempAmount;
    await req.user.save();
    return res.json(req.user.amountOfQuestionsToAsk);
  } catch (error) {
    console.log(error);
  };
};

module.exports = { 
  index,
  create,
  update,
  destroy,
  getNumberOfQuestions,
  updateNumberOfQuestions
};