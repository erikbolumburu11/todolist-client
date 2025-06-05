"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

// export default function Home() {
//   return (
//     <div className="h-dvh relative">
//       <div className="absolute top-1/2 left-[3rem] -translate-y-1/2">
//       <div className="flex-col">
//           <span className="font-bold text-7xl w-1/4">
//             Fullstack <br/>
//             Todo <br/>
//             App
//           </span>
//           <div className="mt-10 w-full mb-10">
//             <Button 
//               className="h-30 w-100"
//               asChild
//               >
//               <Link href="/tasks">Tasks</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <div className="h-dvh relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-16 max-w-5xl mx-auto">
            {/* Left: Title */}
            <div 
              className="font-bold text-5xl md:text-7xl leading-tight text-left"
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 1s ease-in",
              }}
            >
              <p>Fullstack</p>
              <p>Todo</p>
              <p>App</p>
            </div>

            {/* Right: Text and Button */}
            <div 
              className="flex flex-col space-y-4 max-w-md"
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 2s ease-in",
              }}
            >
              <span className="font-semibold text-4xl">Stay organized.</span>
              <p className="text-base md:text-lg">
                A fast, minimal todo app built to be sleek and responsive.
                Group tasks, track deadlines, and stay organized without the clutter of modern web apps.
                Built using Next.js, Express and PostgreSQL.
              </p>
              <span className="font-semibold text-4xl">Get Started</span>
              <div className="flex">
                <Button className="px-6 py-3 w-fit me-3 rounded" asChild>
                  <Link href="/auth/register/">Register</Link>
                </Button>
                <Button className="px-6 py-3 w-fit rounded" asChild>
                  <Link href="/auth/login/">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  );
}
