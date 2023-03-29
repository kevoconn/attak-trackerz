const router = require('express').Router();
const { Op } = require('sequelize'); //
const { Workout, Exercise } = require('../../models'); //require all models
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => { //this well send user to the homepage after creating a workout
  try {
    const newWorkout = await Workout.create({ //creates a new workout and assigns it logged in user
      ...req.body,
      user_id: req.session.user_id,
    });
    const exercises = await Exercise.findAll({ //loops through all exercises. any marked = added to created workout
      where: {
        id: {
          [Op.or]: req.body.exercises,
        },
      },
    });
    await newWorkout.addExercise(exercises, { //requires at least one exercise to be marked in order to create
      through: { selfGranted: false },
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => { //delete workout 
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: 'No workout found with this id!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
