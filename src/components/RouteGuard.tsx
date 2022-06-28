import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { userService } from 'services';


function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to register page if accessing a private page and not logged in 
        const publicPaths = ['/register','/login'];
        const path = url.split('?')[0];
        if (!localStorage.getItem('token') && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/register',
                // query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (authorized && children);
}

export default  RouteGuard;