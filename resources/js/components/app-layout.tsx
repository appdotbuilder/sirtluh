import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: React.ReactNode;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { auth } = usePage<{ auth: { user: AuthUser | null } }>().props;
    
    // If user is not authenticated, show simple layout
    if (!auth.user) {
        return <div className="min-h-screen">{children}</div>;
    }

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumbs breadcrumbs={[]} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </AppShell>
    );
}