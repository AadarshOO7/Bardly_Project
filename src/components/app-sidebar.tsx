
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { BookOpen, FileText, Mail, PenSquare, BookText, Sun, Moon, LogOut, UserCircle, Newspaper, User } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useUser } from '@/context/user-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { href: '/poem', label: 'Poem Generator', icon: PenSquare },
  { href: '/essay', label: 'Essay Composer', icon: FileText },
  { href: '/blog', label: 'Blog Post Smith', icon: BookOpen },
  { href: '/email', label: 'Email Generator', icon: Mail },
  { href: '/story', label: 'Story Generator', icon: BookText },
  { href: '/biography', label: 'Biography Generator', icon: UserCircle },
  { href: '/article', label: 'Article Writer', icon: Newspaper },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const { user, logout } = useUser();
  const avatarFallback = user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U';

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Link href="/home" className="block">
            <h1 className="font-headline text-2xl font-bold text-foreground">Bardly</h1>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="flex-col items-start gap-2">
        <div className="flex items-center gap-2 w-full">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <span className="flex-grow text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
              Theme
            </span>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start items-center gap-2 px-2 h-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <span className="group-data-[collapsible=icon]:hidden">{user.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  );
}
