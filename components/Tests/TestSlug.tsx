import React from "react";
import Link from "next/link";
const TestSlug = ({ slug }: { slug: string }) => {
  return (
    <div className="w-full bg-primary-light p-4 px-8 text-sm capitalize">
      <p>
        <Link href="/dashboard"> Home </Link>/ <Link href="/dashboard/tests">Tests</Link> /{" "}
        <span className="text-black/50">{slug}</span>
      </p>
    </div>
  );
};

export default TestSlug;
