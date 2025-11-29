import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        lazy: {
          Component: async () => {
            const component = await import("../pages/movies/auth/signup/SignUp.tsx");
            return component.default;
          }
        }
      },
    ]
  },
  {
    path: "/movies",
    children: [
      {
        index: true,
        lazy: {
          Component: async () => {
            const component = await import("../pages/movies/Movies.tsx");
            return component.default;
          }
        }
      },
      {
        path: "add-movie",
        lazy: {
          Component: async () => {
            const component = await import("../pages/movies/AddMovie.tsx");
            return component.default;
          }
        }
      }
    ]
  }
]);

export default router;