export type MentorPreferencesState = {
  desiredCategories: string[]
  desiredTechnologies: ({name: string, imageSrc: string} | string)[]
  desiredCareers: string[]
}

export type UserInfoState = {
  level: string
  developerField: string | null
  experiencedWithTechnologies: string[],
  purpose: string,
}