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
import { TaskProvider } from "@/app/contexts/taskcontext"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddTaskDialogContent from "@/app/tasks/components/add-task-dialog-content"

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
                <SidebarMenu className="">
                  <div className="flex justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                          <Button className="w-19/20 h-10 rounded hover:bg-primary-400 ">
                              <p className="text-xl">Add Task</p>
                          </Button>
                        </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                      <AddTaskDialogContent/>
                      </DialogContent>
                    </Dialog>
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
            <TaskProvider>
              <SidebarFooterContent/>
            </TaskProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
