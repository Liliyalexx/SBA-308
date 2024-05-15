Validate Input:

We start by checking if the provided course, ag, and submissions are not null or undefined, and if submissions is an array. If any of these conditions are not met, we throw an error indicating invalid input data.
Process Data:

We iterate through each submission in the LearnerSubmissions array.
For each submission, we extract the learner's ID (learnerId) and filter the submissions array to get all submissions for that learner.
We initialize an empty object learnerAssignments to store the scores for each assignment.
We also initialize variables totalScore and totalPointsPossible to calculate the total score and total points possible for the learner.
Within the inner loop, we iterate through each submission for the learner:
We find the corresponding assignment from the AssignmentGroup using the assignment_id from the submission.
If the assignment is not found or if the submission is late (submitted after the due date), we skip that submission.
Otherwise, we add the score for the assignment to totalScore, add the points possible for the assignment to totalPointsPossible, and store the score for the assignment in the learnerAssignments object.
After processing all submissions for the learner, we calculate the weighted average score (weightedAverage) by dividing the totalScore by the totalPointsPossible.
Format Result:

We construct an object for the learner containing the learner's ID (id), the weighted average score (avg), and the scores for each assignment stored in the learnerAssignments object.
We push this object into the result array.
Handle Errors:

We use a try/catch block to handle any potential errors that may occur during the execution of the function. This ensures that if any errors occur, they are caught and handled gracefully, preventing the script from crashing.
Finally, we return the result array containing the formatted data.

This approach ensures that we validate the input data, process it correctly, handle any potential errors gracefully, and produce the desired output format as specified in the requirements.
