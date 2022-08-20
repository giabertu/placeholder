export type TechnologyObj = {
  name: string,
  imageSrc: string
}

export type MentorPreferencesState = {
  desiredCategories: string[]
  desiredTechnologies: (TechnologyObj | string)[]
  desiredCareers: string[]
}

export type UserInfoState = {
  level: string
  developerField: string | null
  experiencedWithTechnologies: TechnologyObj[],
  purpose: string,
}