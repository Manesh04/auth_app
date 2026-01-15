import React from 'react'
import { Button } from "./ui/button";
import { NavLink } from 'react-router';
function Navbar() {
  return(
    <nav className="py-5 md:py-0 dark:border-b border-gray-700 flex md:flex-row flex-col gap-4 md:gap-0 md:h-14 justify-around items-center ">
      {/* barnd  */}
      <div className="font-semibold  intems-center flex gap-2">
        <span className="inline-block text-center h-6 w-6 rounded-md bg-gradient-to-r from-primary to-primary/40">
        {"A"}
        </span>
        <span className="text-base tracking-tight">Auth App</span>
      </div>

      <div className="flex gap-4 items-center">
        <NavLink to={"/"}>
          Home
        </NavLink>
       <NavLink to={"/login"}>
        <Button size={"sm"} className="cursor-pointer" variant={'outline'}>Login</Button>
       </NavLink>
       <NavLink to={"/signup"}>
        <Button size={"sm"} className="cursor-pointer" variant={'outline'}>Signup</Button>
       </NavLink>
      </div>
    </nav>
  ) 
  
}

export default Navbar