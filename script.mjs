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
  
  function getLearnerData(course, ag, submissions) {
    // Validate input
    if (!course || !ag || !submissions || !Array.isArray(submissions)) {
      throw new Error('Invalid input data');
    }
  
    // Process data
    const result = [];
    submissions.forEach(submission => {
      const learnerId = submission.learner_id;
      const learnerSubmissions = submissions.filter(sub => sub.learner_id === learnerId);
      const learnerAssignments = {};
      let totalScore = 0;
      let totalPointsPossible = 0;
  
      learnerSubmissions.forEach(sub => {
        const assignment = ag.assignments.find(assignment => assignment.id === sub.assignment_id);
        if (!assignment || new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
          return; // Skip invalid or late submissions
        }
        totalScore += sub.submission.score;
        totalPointsPossible += assignment.points_possible;
        learnerAssignments[sub.assignment_id] = sub.submission.score / assignment.points_possible;
      });
  
      const weightedAverage = totalPointsPossible ? totalScore / totalPointsPossible : 0;
      result.push({
        id: learnerId,
        avg: weightedAverage,
        ...learnerAssignments
      });
    });
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);