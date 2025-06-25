import { HostProfile } from "@/components/hosts/host-profile";
import { HostCalendar } from "@/components/hosts/host-calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// Demo hosts data
const hosts = [
  {
    id: "1",
    name: "Bob Johnson",
    bio: "Experienced software engineer specializing in JavaScript and React. With over 10 years of industry experience at top tech companies, I can help with web development challenges, career advice, and technical interviews.",
    specialties: ["JavaScript", "React", "Web Development"],
    imageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviewCount: 128,
    sessionRate: "$75",
    sessionLength: "30 minutes",
    location: "San Francisco, CA",
  },
];

export async function generateStaticParams() {
  return hosts.map((host) => ({
    id: host.id,
  }));
}

export default function HostPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the host data based on the ID
  const host = hosts.find((h) => h.id === params.id) || hosts[0];

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" className="mb-6 -ml-3" asChild>
        <Link href="/hosts">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to hosts
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <HostProfile host={host} />
        </div>

        <div className="lg:col-span-2">
          <HostCalendar hostId={host.id} />
        </div>
      </div>
    </div>
  );
}
