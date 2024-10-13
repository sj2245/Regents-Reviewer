export const Difficulties = {
  Easy: `Easy`,
  Medium: `Medium`,
  Hard: `Hard`,
  Extreme: `Extreme`,
}

export const MathTopics = {
  Algebra: `Algebra`,
  Geometry: `Geometry`,
  Arithmetic: `Arithmetic`,
}

export const ProgrammingTopics = {
  Python: `Python`,
  JavaScript: `JavaScript`,
}

export const ScienceTopics = {
  Geology: `Geology`,
  Biology: `Biology`,
  Chemistry: `Chemistry`,
  Astronomy: `Astronomy`,
}

export const LanguageArtsTopics = {
  Grammar: `Grammar`,
  Spelling: `Spelling`,
  Literature: `Literature`,
  Comprehension: `Comprehension`,
}

export const SocialStudiesTopics = {
  History: `History`,
  Geography: `Geography`,
  Anthropology: `Anthropology`,
}

export const Subjects = {
  Math: {
    name: `Math`,
    topics: Object.values(MathTopics),
  },
  Science: {
    name: `Science`,
    topics: Object.values(ScienceTopics),
  },
  Programming: {
    name: `Programming`,
    topics: Object.values(ProgrammingTopics),
  },
  Language_Arts: {
    name: `Language Arts`,
    topics: Object.values(LanguageArtsTopics),
  },
  Social_Studies: {
    name: `Social Studies`,
    topics: Object.values(SocialStudiesTopics),
  },
}