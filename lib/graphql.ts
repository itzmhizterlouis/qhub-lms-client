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
      category
      createdAt
      description
      displayImageUrl
      duration
      introVideoUrl
      organization {
        _id
        name
        logo
      }
      title
      updatedAt
    }
  }
`;

export const ADD_COURSE_MODULE = gql`
  mutation AddCourseModule($courseModuleInput: CourseModuleInput!) {
    addCourseModule(courseModuleInput: $courseModuleInput) {
      _id
      course {
        _id
        title
      }
      createdAt
      name
      summary
      updatedAt
    }
  }
`;

export const ADD_LESSON = gql`
  mutation AddLesson($lessonInput: LessonInput!) {
    addLesson(lessonInput: $lessonInput) {
      _id
      createdAt
      extraResourcesUrl
      imageUrl
      index
      name
      updatedAt
      videoUrl
    }
  }
`;

export const ADD_MODULE_QUIZ = gql`
  mutation AddModuleQuiz($quizInput: QuizInput!) {
    addModuleQuiz(quizInput: $quizInput) {
      _id
      createdAt
      module {
        _id
        name
      }
      summary
      title
      updatedAt
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($questionInput: QuizQuestionInput!) {
    addQuestion(questionInput: $questionInput) {
      _id
      createdAt
      displayPoint
      options {
        _id
        text
        isCorrect
      }
      point
      quiz {
        _id
        title
      }
      text
      type
      updatedAt
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

export const GET_LMS_USERS = gql`
  query getOrganizationUsers($organizationId: String!) {
    getOrganizationUsers(organizationId: $organizationId) {
      _id
      firstName
      lastName
      email
      role
      onboarded
      createdAt
    }
  }
`;

// Resource Mutations and Queries
export const ADD_RESOURCE = gql`
  mutation AddResource($resourceInput: ResourceInput!) {
    addResource(resourceInput: $resourceInput) {
      _id
      author
      createdAt
      description
      fileType
      fileUrl
      name
      organization {
        _id
        name
        logo
      }
      updatedAt
    }
  }
`;

export const GET_RESOURCES = gql`
  query getOrganizationResources($organizationId: String!) {
    getOrganizationResources(organizationId: $organizationId) {
      _id
      author
      createdAt
      description
      fileType
      fileUrl
      name
      organization {
        _id
        name
        logo
      }
      updatedAt
    }
  }
`;

export const GET_RESOURCE = gql`
  query GetResource($resourceId: String!) {
    getResource(resourceId: $resourceId) {
      _id
      author
      createdAt
      description
      fileType
      fileUrl
      name
      organization {
        _id
        name
        logo
      }
      updatedAt
    }
  }
`;

export const UPDATE_RESOURCE = gql`
  mutation UpdateResource($resourceId: String!, $resourceInput: ResourceInput!) {
    updateResource(resourceId: $resourceId, resourceInput: $resourceInput) {
      _id
      author
      createdAt
      description
      fileType
      fileUrl
      name
      organization {
        _id
        name
        logo
      }
      updatedAt
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($resourceId: String!) {
    deleteResource(resourceId: $resourceId) {
      message
      status
    }
  }
`;
