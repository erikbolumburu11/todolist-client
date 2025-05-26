import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import SiderbarMenuItem from "./siderbar-menu-item"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
            <SidebarGroupContent>
                <SidebarMenu className="">
                  <div className="flex justify-center">
                    <Button className="w-4/5 h-10 rounded">
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
      <SidebarFooter />
    </Sidebar>
  )
}
