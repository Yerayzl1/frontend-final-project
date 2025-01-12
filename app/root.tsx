import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
    integrity: "sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#F5E5D3]">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let code = 500;
  let title = "An error occurred";
  let message = "Something went wrong. Please try again.";

  if (isRouteErrorResponse(error)) {
    code = error.status;
    title = error.statusText;
    message = error.data || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-black-japan">
        <div className="mb-6 w-full max-w-lg rounded-lg bg-white-japan p-4 text-red-japan">
        <h1 className="text-5xl">{code}: {title}</h1>
          <p className="text-lg">{message}</p>
        </div>
        <Link
          to="/"
          className="rounded bg-[#E1C6A8] px-4 py-2 font-medium text-[#704214] hover:bg-[#dbb891]"
        >
          Home
        </Link>
      </main>
    </Layout>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[#F5E5D3]">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}