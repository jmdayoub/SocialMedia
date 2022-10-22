import { lazy } from "react";

// const userRoles = ["User"];
const routes = [
  // {
  //   path: "/",
  //   exact: true,
  //   roles: ["User"], //the roles that this route can be seen by
  //   isAnonymous: false,
  //   element: lazy(() => import("../../src/components/Home")),
  // },
  // {
  //   path: "/SiteNav",
  //   exact: true,
  //   roles: [], //the roles that this route can be seen by
  //   isAnonymous: true,
  //   element: lazy(() => import("../../src/components/SiteNav")),
  // },
  {
    pathname: "/login",
    exact: true,
    roles: [""], //the roles that this route can be seen by
    isAnonymous: true,
    element: lazy(() => import("../../src/components/user/Login")),
  },
  {
    path: "/register",
    exact: true,
    roles: [""], //the roles that this route can be seen by
    isAnonymous: true,
    element: lazy(() => import("../../src/components/user/Register")),
  },
  {
    path: "/testAndAjax",
    exact: true,
    roles: ["Admin"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/TestAndAjax")),
  },
  {
    path: "/friends",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/friends/Friends")),
  },
  {
    path: "/friends/addfriend",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/friends/AddFriend")),
  },
  {
    path: "/friends/:friendId",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/friends/AddFriend")),
  },
  {
    path: "/jobs",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/jobs/Jobs")),
  },
  {
    path: "/jobs/*",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/jobs/AddJob")),
  },
  {
    path: "/jobs:jobId",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/jobs/AddJob")),
  },
  {
    path: "/techcompanies",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/techcompanies/Companies")),
  },
  {
    path: "/techcompanies/addCompany",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() =>
      import("../../src/components/techcompanies/AddCompany")
    ),
  },
  {
    path: "/techcompanies/*",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() =>
      import("../../src/components/techcompanies/AddCompany")
    ),
  },
  {
    path: "/techcompanies",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() =>
      import("../../src/components/techcompanies/CompanyCard")
    ),
  },
  {
    path: "/events",
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    element: lazy(() => import("../../src/components/events/Events")),
  },
];

export default routes;
