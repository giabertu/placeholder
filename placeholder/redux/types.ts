export type MentorPreferencesState = {
  desiredCategories: string[]
  desiredTechnologies: string[]
  desiredCareers: string[]
}

// export type NonBeginnerFormState = {
//   mentorFor: string[]
//   interestedTechnologies: string[]
// }

export type UserInfoState = {
  level: string
  developerField: string | null
  experiencedWithTechnologies: string[]
}