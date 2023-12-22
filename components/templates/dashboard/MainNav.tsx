import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="https://twitter.com/vango_ai"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Twitter
      </Link>
      <Link
        href="https://discord.gg/AYCA6EhUgu"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Discord
      </Link>
      <Link
        href="https://discord.gg/AYCA6EhUgu"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Help
      </Link>
    </nav>
  );
}
