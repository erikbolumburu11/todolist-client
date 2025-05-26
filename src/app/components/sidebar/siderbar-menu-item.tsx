import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export default function SiderbarMenuItem(
{ title, link } : {title: string, link: string}
) {
    return (
        <SidebarMenuItem key="all-todo" className="">
            <SidebarMenuButton asChild>
                <a href={link}>
                    <p className="text-xl px-6">{title}</p>
                </a>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}