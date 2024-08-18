/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTJS_LOGIN: process.env.NEXTJS_LOGIN,
        NEXT_PICKUP_DATA: process.env.NEXT_PICKUP_DATA,
        NEXT_EMPLOYEE_DATA: process.env.NEXT_EMPLOYEE_DATA,
        NEXT_USER_DATA: process.env.NEXT_USER_DATA,
        NEXT_USER_SERVICE: process.env.NEXT_USER_SERVICE,
        NEXT_MAP : process.env.NEXT_MAP,
        NEXT_EMPLOYEE_UPDATE: process.env.NEXT_EMPLOYEE_UPDATE,
        NEXT_USER_PICKUP: process.env.NEXT_USER_PICKUP,
        NEXT_PACKAGE_DATA: process.env.NEXT_PACKAGE_DATA,
    },
};

export default nextConfig;
