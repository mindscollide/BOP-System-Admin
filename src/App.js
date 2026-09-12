// import logo from "./logo.svg";
import "./App.css";
import "./assets/custom-icons/custom-icon.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/roboto";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/400-italic.css";
import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Loader } from "./components/elements";
import { NotificationProvider } from "./context/NotificationContext";

// Matches the build tool's injected entry script tag, e.g.
// <script defer="defer" src="/static/js/main.1a29597c.js"></script>
// (CRA emits exactly one such tag in index.html; lazily-loaded chunks are
// fetched at runtime by JS and never appear as their own <script> tag here.)
const ENTRY_SCRIPT_SRC_RE = /<script[^>]+src="([^"]+\.js)"[^>]*>/i;

function App() {
  const bundlePathRef = useRef(null);

  // 🔹 Detect a new deployment by watching index.html's entry-script hash
  // change, and auto-reload when it does — no dedicated version.json needed,
  // since index.html is already unavoidably public and the build tool
  // stamps a fresh content-hash into it on every build.
  useEffect(() => {
    const checkForNewDeployment = async () => {
      try {
        const response = await fetch("/index.html", { cache: "no-cache" });
        const html = await response.text();
        const match = html.match(ENTRY_SCRIPT_SRC_RE);

        if (!match) {
          return;
        }

        const bundlePath = match[1];

        if (
          bundlePathRef.current &&
          bundlePathRef.current !== bundlePath
        ) {
          if ("caches" in window) {
            const names = await caches.keys();
            await Promise.all(names.map((name) => caches.delete(name)));
          }
          window.location.reload();
          return;
        }

        bundlePathRef.current = bundlePath;
      } catch (err) {
        console.error("Deployment check failed:", err);
      }
    };

    checkForNewDeployment();
    const interval = setInterval(checkForNewDeployment, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);
  return (
    <NotificationProvider>
      <Loader />
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;
