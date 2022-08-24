
import { Types } from "mongoose";
import { User, UserType } from "../lib/models/User";
import UserApi from "./UserApi";



export default class MatchService {


  constructor() {}

  static async findMentors(userToMatch: UserType){

    const {mentorPreferences, purpose} = userToMatch.custom_json
    if (purpose == 'be mentored' || purpose == 'both mentor and be mentored' || purpose == '') {
      console.log('userToMatch wants to be mentored 🟢')
      const {desiredCareers, desiredCategories, desiredTechnologies} = mentorPreferences
      //Get all users
      const allUsers = await UserApi.getAllUsersFromClient();

      console.log('These are all users: ', allUsers);
      //Remove the current user from all users and users that are not here to mentor
      const potentialMentors = allUsers.filter(user => user.secret !== userToMatch.secret && user.custom_json.purpose == 'mentor' || user.custom_json.purpose == 'both mentor and be mentored')
      console.log('These are all users that want to mentor: ', potentialMentors)

      //Create array of users and scores:
      const mentorScores = potentialMentors.map(mentor => ({mentor, score: 0}))

      console.log('mentoScores array created 🟢: ', mentorScores)
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
        // console.log('Here is the mentee prefe: ', menteePreferences.desiredCategories)
        if (menteePreferences.desiredCategories.length) {
          desiredCategories.forEach(topic => {
            // console.log('Here is the topic: ', topic)
            if (topic === 'learning how to program' && menteePreferences.desiredCategories.includes('advance their programming skills')) {
              mentorScore.score = mentorScore.score + 1;
              // console.log('updating score because of advance their programming skills of ' + mentorScore.mentor.email, mentorScore.score)
            } else if (topic === 'expanding my programming skillset' &&  menteePreferences.desiredCategories.includes('advance their programming skills')) {
              mentorScore.score = mentorScore.score + 1;
              // console.log('updating score because of advance their programming skills of ' + mentorScore.mentor.email, mentorScore.score)
            }
            else if (topic === 'developer careers' && menteePreferences.desiredCategories.includes('advance in their developer careers')) {
              mentorScore.score = mentorScore.score + 1; 
              // console.log('updating score because of advance their dev carrer of ' + mentorScore.mentor.email, mentorScore.score)
            } else if (topic === 'advancing in my career' && menteePreferences.desiredCategories.includes('advance in their developer careers')) {
              mentorScore.score = mentorScore.score + 1; 
              // console.log('updating score because of advance their dev carrer of ' + mentorScore.mentor.email, mentorScore.score)
            }
          })
        } else {
          mentorScore.score = 0;
        }
      })

      console.log('mentorScores after categories matching: ', mentorScores)

      /**
       * desiredTechnologies and menteePreferences.desiredTechnologies
       */
      if (desiredTechnologies.length) {
        console.log('Desired tech: ', desiredTechnologies)
        mentorScores.forEach(mentorScore => {
          const {menteePreferences} = mentorScore.mentor.custom_json
          console.log('Potential mentor: ', mentorScore.mentor)
          if (menteePreferences.desiredTechnologies.length) {
            desiredTechnologies.forEach(technology => {
              console.log('Technology in desiredTech ', technology)
              if (typeof technology == 'string') {
                mentorScore.score++;
              } else if (menteePreferences.desiredTechnologies.find(tech => tech.name == technology.name)){
                mentorScore.score++;
                console.log('updating tech score of ' + mentorScore.mentor.email, mentorScore.score)
              }
            })
          }
          //Mentor didn't specify technologies to teach
        })
      }

      console.log('mentorScores after technologies matching: ', mentorScores)

      /**
       * desiredCareers and developerField
       */

      if (desiredCareers.length) {
        mentorScores.forEach(mentorScore => {
          const {developerField} = mentorScore.mentor.custom_json;
          desiredCareers.forEach(topic => {
            if (developerField == topic){
              mentorScore.score++;
              console.log('updatin score because of devField of ' + mentorScore.mentor.email, mentorScore.score)
            }
          })
        })
      }

      console.log('mentorScores after careers matching: ', mentorScores)

      return mentorScores.sort((a, b) => b.score - a.score)
    } else {
      console.log('userToMatch doesn\'t to be mentored 🔴, returning []')
    return [];
    }
  }

  static async getFirstNMentors(userToMatch: UserType, nOfMentors = 3): Promise<(Types.ObjectId | undefined)[]> {
    const mentorScores = await MatchService.findMentors(userToMatch);

    console.log('mentorScores sorted: ', mentorScores)

    if (mentorScores.length) {
      const mentorsWanted = mentorScores.slice(0, nOfMentors)

      console.log('mentorScores spliced with amount given ' + nOfMentors + ' : ', mentorsWanted)

      return mentorsWanted.map(mentor => mentor.mentor._id)
    }
    return [];
  }

  static async getFirstNMentees(userToMatch: UserType, nOfMentees = 3): Promise<(Types.ObjectId | undefined)[]> {
    const menteeScores = await MatchService.findMentees(userToMatch);

    console.log('menteeScores sorted: ', menteeScores)

    if (menteeScores.length) {
      const menteesWanted = menteeScores.slice(0, nOfMentees)

      console.log('menteesScores spliced with amount given ' + nOfMentees + ' : ', menteesWanted)

      return menteesWanted.map(mentee => mentee.mentee._id)
    }
    return [];
  }


  static async findMentees(userToMatch: UserType){

    const {menteePreferences, purpose, developerField} = userToMatch.custom_json
    if (purpose == 'mentor' || purpose == 'both mentor and be mentored') {
      console.log('userToMatch wants to Mentor 🟢')
      const {desiredCategories, desiredTechnologies} = menteePreferences
      //Get all users
      const allUsers = await UserApi.getAllUsersFromClient();

      console.log('These are all users: ', allUsers);
      //Remove the current user from all users and users that are not here to mentor
      const potentialMentees = allUsers.filter(user => user.secret !== userToMatch.secret && user.custom_json.purpose == 'be mentored' || user.custom_json.purpose == 'both mentor and be mentored' || user.custom_json.purpose == '')
      console.log('These are all users that want to be mentored: ', potentialMentees)

      //Create array of users and scores:
      const menteeScores = potentialMentees.map(mentee => ({mentee, score: 0}))

      console.log('menteeScores array created 🟢: ', menteeScores)
      
      menteeScores.forEach(menteeScores => {
        const {mentorPreferences} = menteeScores.mentee.custom_json
        // console.log('Here is the mentee prefe: ', menteePreferences.desiredCategories)
        if (mentorPreferences.desiredCategories.length) {
          desiredCategories.forEach(topic => {
            // console.log('Here is the topic: ', topic)
            if (topic === 'advance their programming skills' && menteePreferences.desiredCategories.includes('learning how to program')) {
              menteeScores.score++;
              // console.log('updating score because of advance their programming skills of ' + mentorScore.mentor.email, mentorScore.score)
            } else if (topic === 'advance their programming skills' &&  menteePreferences.desiredCategories.includes('expanding my programming skillset')) {
              menteeScores.score++;
              // console.log('updating score because of advance their programming skills of ' + mentorScore.mentor.email, mentorScore.score)
            }
            else if (topic === 'advance in their developer careers' && menteePreferences.desiredCategories.includes('developer careers')) {
              menteeScores.score++; 
              // console.log('updating score because of advance their dev carrer of ' + mentorScore.mentor.email, mentorScore.score)
            } else if (topic === 'advance in their developer careers' && menteePreferences.desiredCategories.includes('advancing in my career')) {
              menteeScores.score++; 
              // console.log('updating score because of advance their dev carrer of ' + mentorScore.mentor.email, mentorScore.score)
            }
          })
        } else {
          menteeScores.score = 0;
        }
      })

      console.log('mentorScores after categories matching: ', menteeScores)

      /**
       * desiredTechnologies and menteePreferences.desiredTechnologies
       */
      if (desiredTechnologies.length) {
        console.log('Desired tech: ', desiredTechnologies)
        menteeScores.forEach(menteeScore => {
          const {mentorPreferences} = menteeScore.mentee.custom_json
          console.log('Potential mentee: ', menteeScore.mentee)
          if (mentorPreferences.desiredTechnologies.length) {
            desiredTechnologies.forEach(technology => {
              console.log('Technology in desiredTech ', technology)
              if (typeof mentorPreferences.desiredTechnologies[0] === 'string') {
                menteeScore.score++;
              } else if (mentorPreferences.desiredTechnologies.find(tech => typeof tech !== 'string' && tech.name == technology.name)){
                menteeScore.score++;
                console.log('updating tech score of ' + menteeScore.mentee.email, menteeScore.score)
              }
            })
          }
          //Mentee didn't specify technologies to teach
        })
      }

      console.log('menteeScores after technologies matching: ', menteeScores)

      /**
       * desiredCareers and developerField
       */

      if (developerField) {
        menteeScores.forEach(menteeScore => {
          const {mentorPreferences} = menteeScore.mentee.custom_json;
          if (mentorPreferences.desiredCareers.includes(developerField)){
            menteeScore.score++
            console.log('updatin score because of devField of ' + menteeScore.mentee.email, menteeScore.score)
          }
        })
      }
      console.log('menteeScores after careers matching: ', menteeScores)

      return menteeScores.sort((a, b) => b.score - a.score)
    } else {
      console.log('userToMatch doesn\'t want to mentor 🔴, returning []')
    return [];
    }
  }

}