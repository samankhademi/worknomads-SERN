import express from 'express';
import userRoute from 'routes/v1/users/users.route';
import bookRoute from 'routes/v1/books/books.route';
import profileRoute from 'routes/v1/profile/profile.route';
import authRoute from 'routes/v1/auth/auth.route';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/profile',
        route: profileRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/books',
        route: bookRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;