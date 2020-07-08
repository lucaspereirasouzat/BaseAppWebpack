import { Person, PersonAdd, List, Dashboard as DashboardIcon } from "@material-ui/icons";
const loadable = require("@loadable/component").default;

let routes = [
  {
    id: 1,
    path: '/',
    component: loadable(() => import("screens/Main.js")),
    secure: false,
    roles: [],
    exact: true
  },
  {
    id: 2,
    path: '/login',
    text: 'Login',
    component: loadable(() => import("screens/Auth/Login.js")),
    secure: false,
    roles: [],
    exact: true
  },
  {
    id: 3,
    path: '/signup',
    component: loadable(() => import("screens/Auth/Signup.js")),
    secure: false,
    roles: [],
    exact: true
  },
  {
    id: 4,
    path: '/dashboard',
    component: loadable(() => import("screens/Dashboard.js")),
    secure: true,
    text: 'Dashboard',
    icon: DashboardIcon,
    roles: ['adm', 'user', 'mentor'],
    exact: true
  },
  {
    id: 17,
    path: '/notifications',
    component: loadable(() => import("screens/Notifications.js")),
    secure: true,
    //text: 'Dashboard',
    // icon: DashboardIcon,
    roles: ['adm', 'user', 'mentor'],
    exact: true
  },
  {
    id: 6,
    path: '/profile',
    component: loadable(() => import("screens/Auth/Profile.js")),
    secure: true,
    roles: ['adm', 'user', 'mentor'],
    exact: true
  },
  {
    id: 5,
    path: '/users',
    component: loadable(() => import("screens/Adm/Users/Users.js")),
    secure: true,
    text: 'Lista de usuarios',
    icon: List,
    roles: ['adm'],
    exact: true
  },
  {
    id: 7,
    path: '/users/update/:id',
    component: loadable(() => import("screens/Auth/Profile.js")),
    secure: true,
    roles: ['adm'],
    exact: false
  },
  {
    id: 8,
    path: '/forgotPassword',
    component: loadable(() => import("screens/Auth/ForgotPassword.js")),
    secure: false,
    roles: [],
    exact: true
  },

  {
    id: 9,
    path: '/logs/index',
    component: loadable(() => import("screens/Adm/Logs.js")),
    icon: List,
    secure: true,
    roles: ['adm'],
    exact: false,
    text: 'Lista de logs'
  },



]

export default routes;