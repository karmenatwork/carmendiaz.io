"use client";
import { createContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

function usePrevious<T>(value: T) {
  let ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    let media = window.matchMedia("(prefers-color-scheme: dark)");

    function onMediaChange() {
      let systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    }

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
}

export const AppContext = createContext<{ previousPathname?: string }>({});
export default function Providers({ children }: { children: React.ReactNode }) {
  let pathName = usePathname(); // get the current path
  let previousPathname = usePrevious(pathName); // get the previous path
  return (
    <AppContext.Provider value={{ previousPathname: previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
