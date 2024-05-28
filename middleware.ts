export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/users/mypage',
    '/users/info',
    '/users/edit',
    '/users/likes',
    '/users/comments',
    '/users/bookings/:path*',
    '/payments',
    '/payments/success',
    '/payments/failure',
    '/rooms/register/:path',
  ],
}
