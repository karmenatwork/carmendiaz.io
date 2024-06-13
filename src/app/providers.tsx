'use client'
import { createContext, useEffect, useRef} from 'react'
import { usePathname } from "next/navigation";

function usePrevious<T>(value: T) {
    let ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}


export const AppContext = createContext<{ previousPathname?: string }>({});
export default function Providers({children}: {children: React.ReactNode}) {
    let pathName = usePathname() // get the current path
    let previousPathname = usePrevious(pathName) // get the previous path
  return (
    <AppContext.Provider value={{ previousPathname: previousPathname }}>
      {children}
      Providers
    </AppContext.Provider>
  );
}
