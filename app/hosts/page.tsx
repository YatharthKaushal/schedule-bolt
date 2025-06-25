import { HostsFilter } from "@/components/hosts/hosts-filter";
import { HostsList } from "@/components/hosts/hosts-list";

export default function HostsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Find Hosts</h1>
        <p className="text-muted-foreground">
          Browse and connect with our experienced hosts
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-[260px] lg:w-[300px] shrink-0">
          <HostsFilter />
        </aside>

        <main className="flex-1">
          <HostsList />
        </main>
      </div>
    </div>
  );
}
