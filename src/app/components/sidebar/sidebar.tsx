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
import { SidebarFooterContent } from "./sidebar-footer-content"
import { TaskProvider } from "@/app/contexts/taskcontext"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import AddTaskDialogContent from "@/app/tasks/components/tasks/add-task-dialog-content"
import GroupList from "./groups/group-list"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader/>
      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
                <SidebarMenu>
                  <div className="flex justify-center w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                          <Button className="w-19/20 h-10 rounded shadow-lg bg-linear-to-r from-primary-400 to-primary-600 hover:from-primary-300 hover:to-primary-500">
                              <p className="text-xl">Add Task</p>
                          </Button>
                        </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                      <AddTaskDialogContent/>
                      </DialogContent>
                    </Dialog>
                  </div>
                    <div className="my-3 w-full"/>
                    <GroupList/>
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
