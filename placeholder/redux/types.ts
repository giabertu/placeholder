export type TechnologyObj = {
  name: string,
  imageSrc: string
}

export type MentorPreferencesState = {
  desiredCategories: string[]
  desiredTechnologies: (TechnologyObj | string)[]
  desiredCareers: string[]
}

export type MenteePreferencesState = {
  desiredCategories: string[]
  desiredTechnologies: TechnologyObj[]
}

export type UserInfoState = {
  level: string
  developerField: string | null
  experiencedWithTechnologies: TechnologyObj[],
  purpose: string,
}

// export type RegisteredUserState = {
//   username: string,
//   secret: string
// }
