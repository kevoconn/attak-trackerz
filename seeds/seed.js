const sequelize = require('../config/connection');
const { User, Workout, Exercise } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const exerciseData = require('./exerciseData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
    
  });

  const exercises = await Exercise.bulkCreate(exerciseData, {
    individualHooks: true,
    returning: true,
  });

  for (const workout of workoutData) {
    const wk = await Workout.create({
      ...workout,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    await wk.addExercise(exercises[0], { through: { selfGranted: false } });
    await wk.addExercise(exercises[1], { through: { selfGranted: false } });
  }

  process.exit(0);
};

seedDatabase();
