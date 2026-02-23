import { taskAssignments, testUsers } from "../assets/test_data";
import type { TaskAssignment } from "../contexts/UserContext";

 /**
     * retrieve the assigner's username for a given task (assuming one assigner per task for now)
     * @param task_id the id of the task to retrieve the assigner for
     * @returns the username of the assigner (and multiple assigners in the future) returns "Something went wrong" if no assigner found
     */
export const retrieveAssigners = (task_id:number) => {

    const assignment:TaskAssignment = taskAssignments.find(assignment => assignment.task_id === task_id)!;
    //note to self the assigner could be an array of numbers at some point so i need to iterate over that to list all of the assigners
    if (assignment) {
        const assigner_id = assignment.assigner;
        const assigner = testUsers.find(user => user.user_id === assigner_id);
        return assigner ? assigner.username : "Unknown";
    }
    return "Something went wrong";

}