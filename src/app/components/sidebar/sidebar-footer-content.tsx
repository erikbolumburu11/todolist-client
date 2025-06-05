"use client"

import { UserContext } from "@/app/contexts/usercontext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";
import { redirect }  from "next/navigation";
import { useContext } from "react";

function AccountSettings(){
    const user = useContext(UserContext);

    function logout(){
        localStorage.removeItem('token');
        window.location.href = '/tasks';
    }

    return (
        <div className="bg-primary hover:bg-primary-600 rounded h-10">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex min-w-1/1 min-h-1/1 rounded shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500">
                    <div className="flex text-xl items-center min-w-1/1 min-h-1/1">
                        <User2 className="mx-3"/> {user?.username}
                        <ChevronUp className="ml-auto"/>
                    </div>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <div className="text-xl my-1">
                        <DropdownMenuItem>
                            <span>Account</span>
                        </DropdownMenuItem>
                        </div>
                        <div className="text-xl my-1">
                        <DropdownMenuItem>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        </div>
                        <div className="text-xl my-1">
                        <DropdownMenuItem onClick={logout}>
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function LoginButton(){
    return (
        <div>
            <Button className="w-19/20 h-10 rounded my-1 shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500" onClick={() => {
                redirect('/auth/register');
            }}>
                <p className="text-xl">Register</p>
            </Button>
            <Button className="w-19/20 h-10 rounded my-1 shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500" onClick={() => {
                redirect('/auth/login');
            }}>
                <p className="text-xl">Log In</p>
            </Button>
        </div>
    );
}

export function SidebarFooterContent(){
  const user = useContext(UserContext);

  if(user !== null)
    return <AccountSettings/>;
  else
    return <LoginButton/>
}