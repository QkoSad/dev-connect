
import { AnyAction, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>

export type FormData = { name: string, email: string, password: string }

export type Repo = {
  id: string
  html_url: string
  name: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
}
export type Post = {
  user: string,
  text: string
  name: string,
  avatar: string,
  likes: User[]
  comments: Comment[]
  date: string
  _id: string
}
export type Comment = {
  user: string
  text: string
  name: string,
  avatar: string,
  date: string
  _id: string
}
export type User = {
  name: string,
  email: string,
  password: string,
  avatar: string,
  data: string
  _id: string
}

export type ProfileType = {
  user: User
  company: string,
  website: string
  location: string
  status: string
  skills: string[]
  bio: string
  githubusername: string
  experience: ExperienceType[]
  date: string
  education: EducationType[]
  social: Social
  _id: string

}
export type ExperienceType = {
  title: string
  company: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
  _id: string
}
export type EducationType = {
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  current: boolean
  description: string
  _id: string
}
export type Social = {
  youtube: string
  twitter: string
  facebook: string
  linkedin: string
  instagram: string
  _id: string
}
export type Alert = {
  msg: string
  alertType: string
  id: string
}
