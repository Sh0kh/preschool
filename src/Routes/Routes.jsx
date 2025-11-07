import Children from "../Components/Children";
import ChildrenDetail from "../Components/ChildrenDetail";
import Dashboard from "../Components/Dashboard/Dashboard";
import Groups from "../Components/Groups/Index";
import GroupsDetail from "../Components/GroupsDetail";
import Teacher from "../Components/Teacher/Index";

export const Rout = [
    {
        name: 'Home',
        path: '/',
        component: <Dashboard />
    },
    {
        name: 'Children',
        path: '/children',
        component: <Children />
    },
    {
        name: 'Groups',
        path: '/groups',
        component: <Groups />
    },
    {
        name: 'Groups detail',
        path: '/group/:id',
        component: <GroupsDetail />
    },
    {
        name: 'children detail',
        path: '/children/:id',
        component: <ChildrenDetail />
    },
    {
        name: 'Teacher',
        path: '/teacher',
        component: <Teacher />
    },

]