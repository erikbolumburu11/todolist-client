import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-10">
      <h1>Landing</h1>
      <Button asChild>
        <Link href="/tasks">Tasks</Link>
      </Button>
    </div>
  );
}
