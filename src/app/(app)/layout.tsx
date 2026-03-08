import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { UserProvider } from '@/context/user-context';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8 h-full">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
