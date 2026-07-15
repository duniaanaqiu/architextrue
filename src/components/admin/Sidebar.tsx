"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Tags, 
  FolderOpen, 
  Image as ImageIcon,
  BookOpen,
  ListTodo,
  Briefcase
} from "lucide-react";
import Image from "next/image";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Articles", href: "/admin/posts", icon: FileText },
  { name: "Portfolios", href: "/admin/portfolios", icon: Briefcase },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Tags", href: "/admin/tags", icon: Tags },
  { name: "Media", href: "/admin/media", icon: ImageIcon },
];

const DOCS_ITEMS = [
  { name: "Panduan Penggunaan", href: "/admin/docs/panduan", icon: BookOpen, external: true },
  { name: "99 List Topik Article", href: "/admin/docs/topik-artikel", icon: ListTodo, external: true },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-surface border-r border-surface-container z-50 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 lg:w-20 lg:hover:w-64 group
        overflow-hidden
      `}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-surface-container shrink-0">
          <div className="w-10 h-10 relative lg:group-hover:hidden transition-all">
            <Image src="/assets/images/layout/favicon.png" alt="Icon" fill className="object-contain" />
          </div>
          <div className="w-32 h-8 relative hidden lg:group-hover:block transition-all">
            <Image src="/assets/images/layout/logo-primary.png" alt="Logo" fill className="object-contain" />
          </div>
          {/* Mobile Logo */}
          <div className="w-32 h-8 relative lg:hidden">
            <Image src="/assets/images/layout/logo-primary.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`
                  flex items-center rounded-xl p-3 relative group/item
                  transition-all duration-200
                  ${isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}
                `}
              >
                <item.icon className="h-6 w-6 shrink-0" />
                <span className="ml-4 font-body font-medium whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>

                {/* Desktop Tooltip (Visible only when sidebar is collapsed) */}
                <div className="absolute left-16 px-3 py-2 bg-primary text-on-primary text-sm font-body font-medium rounded-lg opacity-0 invisible lg:group-hover:hidden lg:group-hover/item:opacity-100 lg:group-hover/item:visible transition-all whitespace-nowrap z-50 shadow-xl">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-primary"></div>
                </div>
              </Link>
            )
          })}

          {/* Docs Section */}
          <div className="mt-8 mb-2">
            <h3 className="px-3 text-xs font-display font-semibold text-on-surface-variant uppercase tracking-wider opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Docs & Resources
            </h3>
            {/* Divider for collapsed view */}
            <div className="h-px bg-surface-container mx-4 mt-2 hidden lg:block lg:group-hover:hidden"></div>
          </div>
          
          {DOCS_ITEMS.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              target={item.external ? "_blank" : "_self"}
              className={`
                flex items-center rounded-xl p-3 relative group/item
                text-on-surface-variant hover:bg-surface-container hover:text-primary
                transition-all duration-200
              `}
            >
              <item.icon className="h-6 w-6 shrink-0" />
              <span className="ml-4 font-body font-medium whitespace-nowrap opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
                {item.name}
              </span>

              {/* Desktop Tooltip (Visible only when sidebar is collapsed) */}
              <div className="absolute left-16 px-3 py-2 bg-primary text-on-primary text-sm font-body font-medium rounded-lg opacity-0 invisible lg:group-hover:hidden lg:group-hover/item:opacity-100 lg:group-hover/item:visible transition-all whitespace-nowrap z-50 shadow-xl">
                {item.name}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-primary"></div>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
