import { SidebarInfo, SidebarInfoMore } from "./Components"

export default function Aside(){
    return <aside className="sidebar" data-sidebar>
        <SidebarInfo />
        <SidebarInfoMore />
    </aside>
}