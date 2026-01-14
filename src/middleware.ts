import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect unauthorized users to the login page
  },
});

// Middleware configuration to define protected routes
export const config = { 
  matcher: [
    "/dashboard/:path*",   // Protects the dashboard and all its sub-routes
    "/api/employees/:path*" // Secures API routes from unauthorized access
  ] 
};