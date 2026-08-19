import Link from "next/link";
import { Container } from "@/components/container";
import { HOME_PATH, PROJECT_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: HOME_PATH, label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/debug", label: "Debug" },
];

export default function Header({ userEmail }: { userEmail: string }) {
  return (
    <header className="sticky top-0 z-1 border-b bg-background/95 backdrop-blur-xs">
      <Container className="flex h-14 items-center gap-6">
        <span className="font-semibold">{PROJECT_NAME}</span>

        <nav className="flex items-center gap-4 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="ml-auto min-w-0 truncate text-sm text-muted-foreground">
          {userEmail}
        </span>
      </Container>
    </header>
  );
}
