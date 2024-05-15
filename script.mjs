console.log("Hi there!")

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
 
    
  
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function calculatePercentage(score, pointsPossible) {
    return pointsPossible ? (score / pointsPossible) * 100 : 0;
  }

  // Main function to get learner data
  function getLearnerData(course, ag, submissions) {
    try {
      // Validate that the AssignmentGroup belongs to the specified course
      if (ag.course_id !== course.id) {
        throw new Error(
          'Invalid input: AssignmentGroup does not belong to the specified course.'
        );
      }

      const learnerData = {};

      ag.assignments.forEach((assignment) => {
        if (assignment.points_possible === 0) {
          throw new Error(
            'Invalid input: Assignment points possible cannot be zero.'
          );
        }
      });

      submissions.forEach((submission) => {
        try {
          const {
            learner_id,
            assignment_id,
            submission: { submitted_at, score },
          } = submission;
          const assignment = ag.assignments.find((a) => a.id === assignment_id);

          if (!assignment) {
            throw new Error(
              `Invalid input: No assignment found with ID ${assignment_id}.`
            );
          }

          const dueDate = new Date(assignment.due_at);
          const submittedDate = new Date(submitted_at);

          if (submittedDate > dueDate) {
            score -= assignment.points_possible * 0.1; // Deduct 10% if submitted late
          }

          const scorePercentage = calculatePercentage(
            score,
            assignment.points_possible
          );

          if (!learnerData[learner_id]) {
            learnerData[learner_id] = {
              id: learner_id,
              totalScore: 0,
              totalWeight: 0,
              scores: {},
            };
          }

          const learner = learnerData[learner_id];
          learner.totalScore += score;
          learner.totalWeight += assignment.points_possible;
          learner.scores[assignment_id] = scorePercentage;
        } catch (error) {
          console.error(
            `Error processing submission for learner ${submission.learner_id}:`,
            error.message
          );
        }
      });

      return Object.values(learnerData).map((learner) => {
        const avg = learner.totalWeight
          ? learner.totalScore / learner.totalWeight
          : 0;
        const formattedScores = Object.fromEntries(
          Object.entries(learner.scores).map(([id, percentage]) => [
            id,
            percentage,
          ])
        );
        return { id: learner.id, avg, ...formattedScores };
      });
    } catch (error) {
      console.error('Error processing data:', error.message);
      return []; // Return an empty array if an error occurs
    }
  }

  const result = getLearnerData(
    CourseInfo,
    AssignmentGroup,
    LearnerSubmissions
  );

  console.log(result);