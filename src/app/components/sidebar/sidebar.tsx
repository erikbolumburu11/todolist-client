"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SiderbarMenuItem from "./siderbar-menu-item"
import { SidebarFooterContent } from "./sidebar-footer-content"
import { UserProvider } from "@/app/contexts/usercontext"

export function AppSidebar() {

  return (
    <UserProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
              <SidebarGroupContent>
                  <SidebarMenu className="">
                    <div className="flex justify-center">
                      <Button className="w-19/20 h-10 rounded hover:bg-primary-400 ">
                          <p className="text-xl">Add Task</p>
                      </Button>
                    </div>
                      <div className="my-3"/>
                      <SiderbarMenuItem
                        title="All Tasks"
                        link="/"
                      />
                      <SiderbarMenuItem
                        title="Due Today"
                        link="/Today/"
                      />
                  </SidebarMenu>
              </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarFooterContent/>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </UserProvider>
  )
}
