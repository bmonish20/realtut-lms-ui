/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "containers/Login";
import Register from "containers/Register";
import ResetPassword from "containers/ResetPassword";
import ChangePassword from "containers/ChangePassword";
import Terms from "views/pages/Terms";
import Privacy from "views/pages/Privacy";
import Dashboard from "containers/Dashboard";
import Profile from "./containers/Profile";
import ActivityFeed from "./containers/ActivityFeed";

import Webinars from "containers/Webinars";
import Webinar from "containers/Webinar";
import AddEvent from "containers/AddEvent";

import AddTask from "containers/AddTask";
import Tasks from "containers/Tasks";
import TaskLogs from "containers/TaskLogs";
import TaskDetails from "containers/TaskDetails";

import AddTodo from "containers/AddTodo";
import Todos from "containers/Todos";

import WebinarWatch from "components/WebinarWatch";
import FullCalendarView from "containers/FullCalendarView";

import Quizzes from "containers/Quizzes";
import AddQuiz from "containers/AddQuiz";
import MyQuestions from "./containers/MyQuestions";
import AddQuestion from "containers/AddQuestion";
import Reviews from "containers/Reviews";
import Review from "containers/Review";
import QuizForm from "containers/QuizForm";
import QuizScore from "containers/QuizScore";
import QuizDetails from "containers/QuizDetails";

import { permissions } from "utils/permissions";
import Courses from "containers/Courses";
import Course from "containers/Course";
import AddCourse from "containers/AddCourse";
import MyCourses from "containers/MyCourses";
import PlayChapter from "containers/PlayChapter";
import MyChapters from "./containers/MyChapters";
import AddChapter from "./containers/AddLesson";
import StartMeeting from "./components/StartMeeting";
import TrainerCourses from "containers/TrainerCourses";
import MyPolls from "./containers/MyPolls";

import Articles from "containers/Articles";
import Article from "containers/Article";
import AddArticle from "containers/AddArticle";

import EditUser from "containers/EditUser";
import Users from "containers/Users";
import Reports from "./containers/Reports";
import User from "containers/User";

import UserNotifications from "containers/UserNotifications";

const routes = {
  home: [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "ni ni-shop text-secondary",
      component: Dashboard,
      layout: "",
    },
    {
      path: "/events",
      name: "Events",
      icon: "ni ni-laptop text-secondary",
      component: Webinars,
      layout: "",
    },
    {
      redirect: true,
      path: "/event/:id",
      name: "Event",
      icon: "ni ni-laptop text-secondary",
      component: Webinar,
      layout: "",
    },
    {
      redirect: true,
      path: "/watch",
      name: "Watch",
      icon: "ni ni-laptop text-secondary",
      component: WebinarWatch,
      layout: "",
    },
    {
      redirect: true,
      path: "/quiz-form",
      name: "QuizForm",
      icon: "ni ni-laptop text-secondary",
      component: QuizForm,
      layout: "",
    },
    {
      redirect: true,
      path: "/quiz-details",
      name: "QuizDetails",
      icon: "ni ni-laptop text-secondary",
      component: QuizDetails,
      layout: "",
    },
    {
      collapse: true,
      name: "Courses",
      icon: "fas fa-book text-secondary",
      state: "coursesCollapse",
      views: [
        {
          path: "/courses",
          name: "Browse",
          miniName: "",
          component: Courses,
          layout: "",
        },
        {
          permission: permissions.BOOK_A_COURSE,
          path: "/my-courses",
          name: "My Courses",
          miniName: "",
          component: MyCourses,
          layout: "",
        },
        {
          permission: permissions.ADD_COURSE,
          path: "/mycourses",
          name: "My Courses",
          miniName: "",
          component: TrainerCourses,
          layout: "",
        },
        {
          permission: permissions.VIEW_MY_LESSONS,
          path: "/my-lessons",
          name: "My Lessons",
          miniName: "",
          component: MyChapters,
          layout: "",
        },
        {
          permission: permissions.ADD_COURSE,
          path: "/mypolls",
          name: "My Polls",
          miniName: "",
          component: MyPolls,
          layout: "",
        },
      ],
    },
    {
      collapse: true,
      name: "Quizzes",
      icon: "ni ni-hat-3 text-secondary",
      state: "quizzesCollapse",
      views: [
        {
          path: "/quizzes",
          name: "Browse",
          miniName: "",
          component: Quizzes,
          layout: "",
        },
        {
          permission: permissions.ADD_A_QUIZ,
          path: "/quizzes?my=true",
          name: "My Quizzes",
          miniName: "",
          component: Quizzes,
          layout: "",
        },
        {
          permission: permissions.ADD_A_QUIZ,
          path: "/questions",
          name: "My Questions",
          miniName: "",
          component: MyQuestions,
          layout: "",
        },
      ],
    },
    {
      redirect: true,
      icon: "fas fa-tasks text-secondary",
      path: "/reviews",
      name: "Reviews",
      component: Reviews,
      layout: "",
    },
    {
      redirect: true,
      icon: "fas fa-tasks text-secondary",
      path: "/review",
      name: "Review",
      component: Review,
      layout: "",
    },
    {
      redirect: true,
      icon: "fas fa-tasks text-secondary",
      path: "/quiz-score",
      name: "QuizScore",
      component: QuizScore,
      layout: "",
    },
    {
      icon: "fas fa-calendar-alt text-secondary",
      path: "/calendar",
      name: "Calendar",
      component: FullCalendarView,
      layout: "",
    },
    {
      icon: "fas fa-tasks text-secondary",
      path: "/tasks",
      name: "Tasks",
      component: Tasks,
      layout: "",
    },
    {
      icon: "fas fa-clipboard-list text-secondary",
      path: "/todos",
      name: "Todos",
      component: Todos,
      layout: "",
    },
    {
      redirect: true,
      path: "/course/:id/play",
      name: "Play Chapter",
      component: PlayChapter,
      layout: "",
    },
    {
      redirect: true,
      path: "/course/:id",
      name: "Course",
      icon: "ni ni-laptop text-secondary",
      component: Course,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-course",
      name: "Add Course",
      icon: "ni ni-laptop text-secondary",
      component: AddCourse,
      layout: "",
    },
    {
      redirect: true,
      path: "/edit-course",
      name: "Edit Course",
      icon: "ni ni-laptop text-secondary",
      component: AddCourse,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-lesson",
      name: "Add Lesson",
      icon: "ni ni-laptop text-secondary",
      component: AddChapter,
      layout: "",
    },
    {
      redirect: true,
      path: "/edit-lesson",
      name: "edit Lesson",
      icon: "ni ni-laptop text-secondary",
      component: AddChapter,
      layout: "",
    },
    {
      path: "/resources",
      name: "Resources",
      icon: "far fa-newspaper text-secondary",
      component: Articles,
      layout: "",
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: "ni ni-bell-55 text-secondary",
      component: UserNotifications,
      layout: "",
    },
    {
      redirect: true,
      path: "/resource/:id",
      name: "Resource",
      icon: "far fa-newspaper text-secondary",
      component: Article,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-resource",
      name: "Add Resource",
      icon: "far fa-newspaper text-secondary",
      component: AddArticle,
      layout: "",
    },
    {
      redirect: true,
      path: "/edit-resource",
      name: "Edit Resourse",
      icon: "far fa-newspaper text-secondary",
      component: AddArticle,
      layout: "",
    },
    {
      permission: permissions.VIEW_REPORTS,
      icon: "far fa-chart-bar text-secondary",
      path: "/reports",
      name: "Reports",
      component: Reports,
      layout: "",
    },
    {
      permission: permissions.VIEW_USERS,
      icon: "fas fa-users text-secondary",
      path: "/users",
      name: "Users",
      component: Users,
      layout: "",
    },
    {
      collapse: true,
      name: "Account",
      icon: "ni ni-single-02 text-secondary",
      state: "accountCollapse",
      views: [
        {
          path: "/profile",
          exact: false,
          name: "Profile",
          miniName: "",
          component: Profile,
          layout: "",
        },
        {
          path: "/activity-feed",
          name: "Activity Feed",
          miniName: "",
          component: ActivityFeed,
          layout: "",
        },
      ],
    },

    {
      path: "/logout",
      name: "Logout",
      icon: "ni ni-button-power text-secondary",
      layout: "",
    },
    {
      redirect: true,
      path: "/add-event",
      name: "AddEvent",
      component: AddEvent,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-task",
      name: "AddTask",
      component: AddTask,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-todo",
      name: "AddTodo",
      component: AddTodo,
      layout: "",
    },
    {
      redirect: true,
      path: "/view-task-history",
      name: "TaskLogs",
      component: TaskLogs,
      layout: "",
    },
    {
      redirect: true,
      path: "/task-details",
      name: "TaskDetails",
      component: TaskDetails,
      layout: "",
    },
    {
      redirect: true,
      path: "/trainer",
      name: "User",
      component: User,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-quiz",
      name: "AddQuiz",
      component: AddQuiz,
      layout: "",
    },
    {
      redirect: true,
      path: "/add-question",
      name: "AddQuestion",
      component: AddQuestion,
      layout: "",
    },
    {
      redirect: true,
      path: "/edit-user",
      name: "EditUser",
      component: EditUser,
      layout: "",
    },
    {
      redirect: true,
      path: "/meeting/start",
      name: "StartMeeting",
      component: StartMeeting,
      layout: "",
    },
  ],
  auth: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      layout: "/auth",
    },
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: Register,
    //   layout: "/auth",
    // },
    {
      path: "/resetpassword",
      name: "Reset",
      component: ResetPassword,
      layout: "/auth",
    },
    {
      path: "/changepassword",
      name: "ChangePassword",
      component: ChangePassword,
      layout: "/auth",
    },
    {
      path: "/terms",
      name: "Terms & Conditions",
      component: Terms,
      layout: "/auth",
    },
    {
      path: "/privacy",
      name: "Privacy policy",
      component: Privacy,
      layout: "/auth",
    },
  ],
};

// const routes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: "ni ni-shop text-primary",
//     component: Widgets,
//     layout: "",
//   },
//   {
//     path: "/webinar",
//     name: "Webinar",
//     icon: "ni ni-laptop text-primary",
//     component: Widgets,
//     layout: "",
//   },
//   {
//     path: "/logout",
//     name: "Logout",
//     icon: "ni ni-button-power text-primary",
//     component: Widgets,
//     layout: "",
//   },
//   {
//     collapse: true,
//     name: "Dashboards",
//     icon: "ni ni-shop text-primary",
//     state: "dashboardsCollapse",
//     views: [
//       {
//         path: "/dashboard",
//         name: "Dashboard",
//         miniName: "D",
//         component: Dashboard,
//         layout: "/admin",
//       },
//       {
//         path: "/alternative-dashboard",
//         name: "Alternative",
//         miniName: "A",
//         component: Alternative,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     collapse: true,
//     name: "Examples",
//     icon: "ni ni-ungroup text-orange",
//     state: "examplesCollapse",
//     views: [
//       {
//         path: "/pricing",
//         name: "Pricing",
//         miniName: "P",
//         component: Pricing,
//         layout: "/auth",
//       },
//       {
//         path: "/login",
//         name: "Login",
//         miniName: "L",
//         component: Login,
//         layout: "/auth",
//       },
//       {
//         path: "/register",
//         name: "Register",
//         miniName: "R",
//         component: Register,
//         layout: "/auth",
//       },
//       {
//         path: "/resetpassword",
//         name: "Reset",
//         miniName: "RP",
//         component: ResetPassword,
//         layout: "/auth",
//       },
//       {
//         path: "/lock",
//         name: "Lock",
//         miniName: "L",
//         component: Lock,
//         layout: "/auth",
//       },
//       {
//         path: "/timeline",
//         name: "Timeline",
//         miniName: "T",
//         component: Timeline,
//         layout: "/admin",
//       },
//       {
//         path: "/profile",
//         name: "Profile",
//         miniName: "P",
//         component: Profile,
//         layout: "/admin",
//       },
//       {
//         path: "/rtl-support",
//         name: "RTL Support",
//         miniName: "RS",
//         component: RTLSupport,
//         layout: "/rtl",
//       },
//     ],
//   },
//   {
//     collapse: true,
//     name: "Components",
//     icon: "ni ni-ui-04 text-info",
//     state: "componentsCollapse",
//     views: [
//       {
//         path: "/buttons",
//         name: "Buttons",
//         miniName: "B",
//         component: Buttons,
//         layout: "/admin",
//       },
//       {
//         path: "/cards",
//         name: "Cards",
//         miniName: "C",
//         component: Cards,
//         layout: "/admin",
//       },
//       {
//         path: "/grid",
//         name: "Grid",
//         miniName: "G",
//         component: Grid,
//         layout: "/admin",
//       },
//       {
//         path: "/notifications",
//         name: "Notifications",
//         miniName: "N",
//         component: Notifications,
//         layout: "/admin",
//       },
//       {
//         path: "/icons",
//         name: "Icons",
//         miniName: "I",
//         component: Icons,
//         layout: "/admin",
//       },
//       {
//         path: "/typography",
//         name: "Typography",
//         miniName: "T",
//         component: Typography,
//         layout: "/admin",
//       },
//       {
//         collapse: true,
//         name: "Multi Level",
//         miniName: "M",
//         state: "multiCollapse",
//         views: [
//           {
//             path: "#pablo",
//             name: "Third level menu",
//             component: () => {},
//             layout: "/",
//           },
//           {
//             path: "#pablo",
//             name: "Just another link",
//             component: () => {},
//             layout: "/",
//           },
//           {
//             path: "#pablo",
//             name: "One last link",
//             component: () => {},
//             layout: "/",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     collapse: true,
//     name: "Forms",
//     icon: "ni ni-single-copy-04 text-pink",
//     state: "formsCollapse",
//     views: [
//       {
//         path: "/elements",
//         name: "Elements",
//         miniName: "E",
//         component: Elements,
//         layout: "/admin",
//       },
//       {
//         path: "/components",
//         name: "Components",
//         miniName: "C",
//         component: Components,
//         layout: "/admin",
//       },
//       {
//         path: "/validation",
//         name: "Validation",
//         miniName: "V",
//         component: Validation,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     collapse: true,
//     name: "Tables",
//     icon: "ni ni-align-left-2 text-default",
//     state: "tablesCollapse",
//     views: [
//       {
//         path: "/tables",
//         name: "Tables",
//         miniName: "T",
//         component: Tables,
//         layout: "/admin",
//       },
//       {
//         path: "/sortable",
//         name: "Sortable",
//         miniName: "S",
//         component: Sortable,
//         layout: "/admin",
//       },
//       {
//         path: "/react-bs-table",
//         name: "React BS Tables",
//         miniName: "RBT",
//         component: ReactBSTables,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     collapse: true,
//     name: "Maps",
//     icon: "ni ni-map-big text-primary",
//     state: "mapsCollapse",
//     views: [
//       {
//         path: "/google",
//         name: "Google",
//         miniName: "G",
//         component: Google,
//         layout: "/admin",
//       },
//       {
//         path: "/vector",
//         name: "Vector",
//         miniName: "V",
//         component: Vector,
//         layout: "/admin",
//       },
//     ],
//   },
//   {
//     path: "/widgets",
//     name: "Widgets",
//     icon: "ni ni-archive-2 text-green",
//     component: Widgets,
//     layout: "/admin",
//   },
//   {
//     path: "/charts",
//     name: "Charts",
//     icon: "ni ni-chart-pie-35 text-info",
//     component: Charts,
//     layout: "/admin",
//   },
//   {
//     path: "/calendar",
//     name: "Calendar",
//     icon: "ni ni-calendar-grid-58 text-red",
//     component: Calendar,
//     layout: "/admin",
//   },
// ];

export default routes;
