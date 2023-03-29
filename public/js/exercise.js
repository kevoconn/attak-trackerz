const newFormHandler = async (event) => {
  event.preventDefault();
  const exercises = [];
  const name = document.querySelector('#workoutName').value.trim();
  const description = document.querySelector('#description').value.trim();
  const exerciseIds = document.querySelectorAll('input[type=checkbox]:checked');
  exerciseIds.forEach((id) => exercises.push(id.value));
  // pushes user selected exercises into empty array to create workout
  if (exercises.length === 0) {
    document.location.replace('/exercise');
    return;
  }
  const response = await fetch(`/api/workouts`, {
    method: 'POST',
    body: JSON.stringify({ name, description, exercises }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/workout');
  } else {
    alert('Failed to create workout');
  }
};

document
  .querySelector('.new-workout-form')
  .addEventListener('submit', newFormHandler);
