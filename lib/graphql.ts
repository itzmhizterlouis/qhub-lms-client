import { gql } from "@apollo/client";

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: OrganizationInput!) {
    createOrganization(organizationInput: $input) {
      _id
      address
      city
      country
      email
      industry {
        type
      }
      logo
      name
      numberOfUsers
      state
      websiteUrl
      createdAt
    }
  }
`;

export const USER_ORGANIZATION = gql`
  query {
    userOrganization {
      _id
      logo
    }
  }
`;

export const CREATE_USER_ORGANIZATION = gql`
  mutation CreateOrganization($input: CreateUserAdminInput!) {
    addOrganizationUser(createUserOrganizationInput: $input) {
      _id
      firstName
      lastName
      email
      accessToken
      phone
      role
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LogintInput!) {
    login(loginInput: $input) {
      accessToken
      user {
        firstName
        lastName
        email
        accessToken
        phone
        role
        createdAt
      }
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($input: VerifyUserInput!) {
    verifyUser(verifyUser: $input) {
      message
      status
    }
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($courseInput: CourseInput!) {
    addCourse(courseInput: $courseInput) {
      _id
      title
    }
  }
`;

export const ADD_COURSE_MODULE = gql`
  mutation AddCourseModule($courseModuleInput: CourseModuleInput!) {
    addCourseModule(courseModuleInput: $courseModuleInput) {
      _id
      name
    }
  }
`;

export const EDIT_COURSE_MODULE = gql`
  mutation EditCourseModule($editCourseModuleInput: EditCourseModuleInput!) {
    editCourseModule(editCourseModuleInput: $editCourseModuleInput) {
      _id
      name
    }
  }
`;

export const DELETE_COURSE_MODULE = gql`
  mutation DeleteCourseModule($moduleId: String!) {
    deleteCourseModule(moduleId: $moduleId) {
      message
      status
    }
  }
`;

export const INVITE_LMS_USER = gql`
  mutation addLmsUser($lmsUserInput: CreateLmsUserInput!) {
    addLmsUser(lmsUserInput: $lmsUserInput) {
      _id
      accessToken
      createdAt
      email
      firstName
      lastName
      onboarded
      role
      updatedAt
    }
  }
`;
