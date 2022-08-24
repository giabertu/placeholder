
import { Types } from "mongoose";
import { User, UserType } from "../lib/models/User";
import UserApi from "./UserApi";



export default class MatchService {


  constructor() {}

  static async findMentors(userToMatch: UserType){

    const {mentorPreferences, purpose} = userToMatch.custom_json
    if (purpose == 'be mentored' || purpose == 'both mentor and be mentored') {
      const {desiredCareers, desiredCategories, desiredTechnologies} = mentorPreferences
      //Get all users
      const allUsers = await UserApi.getAllUsers();
      //Remove the current user from all users and users that are not here to mentor
      const potentialMentors = allUsers.filter(user => user.secret !== userToMatch.secret && user.custom_json.purpose == 'mentor' || user.custom_json.purpose == 'both mentor and be mentored')

      //Create array of users and scores:
      const mentorScores = potentialMentors.map(mentor => ({mentor, score: 0}))

      /***
       *  Matching criteria: 
       * 
       *  mentor topics -> mentee topics (what userToMatch wants to learn) = desiredCategories
       *  mentorPreferences.desiredTechnologies -> menteePreferences.desiredTechnologies
       *  mentorPreferences.desiredCareers -> developerField
       * 
       */

      /**
       *  Mentor topics: 
       * ['learning how to program', 'developer careers'] (beginners)
       * ['expanding my programming skillset', 'advancing in my career'] (int-adv)
       *
       *  Mentee topics: 
       *  ['advance their programming skills', 'advance in their developer careers']
       */
      mentorScores.forEach(mentorScore => {
        const {menteePreferences} = mentorScore.mentor.custom_json
        if (menteePreferences.desiredCategories.length) {
          desiredCategories.forEach(topic => {
            if (topic == 'learning how to program' || topic == 'expanding my programming skillset' && menteePreferences.desiredCategories.includes('advance their programming skills')) {
              mentorScore.score = mentorScore.score + 1;
            } else if (topic == 'developer careers' || topic == 'advancing in my career' && menteePreferences.desiredCategories.includes('advance in their developer careers')) {
              mentorScore.score = mentorScore.score + 1; 
            }
          })
        } else {
          mentorScore.score = 0;
        }
      })

      /**
       * desiredTechnologies and menteePreferences.desiredTechnologies
       */
      if (desiredTechnologies.length) {
        mentorScores.forEach(mentorScore => {
          const {menteePreferences} = mentorScore.mentor.custom_json
          if (menteePreferences.desiredTechnologies.length) {
            desiredTechnologies.forEach(technology => {
              if (typeof technology == 'string') {
                mentorScore.score++;
              } else if (menteePreferences.desiredTechnologies.includes(technology)){
                mentorScore.score++;
              }
            })
          }
          //Mentor didn't specify technologies to teach
        })
      }
      /**
       * desiredCareers and developerField
       */

      if (desiredCareers.length) {
        mentorScores.forEach(mentorScore => {
          const {developerField} = mentorScore.mentor.custom_json;
          desiredCareers.forEach(topic => {
            if (developerField == topic){
              mentorScore.score++;
            }
          })
        })
      }
      return mentorScores.sort((a, b) => b.score - a.score)
    } else {
    return [];
    }
  }

  static async getFirstNMentors(userToMatch: UserType, nOfMentors = 3): Promise<(Types.ObjectId | undefined)[]> {
    const mentorScores = await MatchService.findMentors(userToMatch);
    if (mentorScores.length) {
      const mentorsWanted = mentorScores.slice(0, nOfMentors)
      return mentorsWanted.map(mentor => mentor.mentor._id)
    }
    return [];
  }


  static async findMentees(user: UserType){

  }

}