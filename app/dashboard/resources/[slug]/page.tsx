import { Button } from "@/components/ui/button";
import resource2 from "@/public/resource2.png";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { resources } from "@/lib/data";
import Link from "next/link";
const Page = () => {
  return (
    <div className="p-6 grid grid-cols-12 gap-6 h-full">
      <div className="flex gap-4 h-fit p-6 rounded-md border col-span-9">
        <Image src={resource2} alt="resource" width={200} height={200} />
        <div>
          <h1 className="text-2xl font-bold">Resource Name</h1>
          <p className="text-sm text-gray-400">By QHUB</p>
          <p className="text-sm text-gray-500 max-w-md my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Maiores, veniam.
          </p>

          <p className="text-sm text-gray-500">1hr 20mins read</p>
          <p className="text-sm text-gray-400">PDF</p>
          <Button className="mt-4 bg-primary hover:bg-primary/90">
            Download
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            className=" flex  items-center "
            size={"sm"}
          >
            <IconPencil className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button size={"sm"} className="bg-primary hover:bg-primary/90">
            <IconTrash className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
      <div className=" p-6 rounded-md border  col-span-3">
        <h1 className="font-semibold mb-2 text-sm">Related Resources</h1>
        <div className="flex h-[calc(100vh-250px)] flex-col gap-4 overflow-y-auto ">
          {resources.map((resource, idx) => (
            <Link
              href={`/dashboard/resources/${resource.name
                .toLowerCase()
                .replace(" ", "-")}`}
              key={idx}
              className="cursor-pointer flex gap-2"
            >
              <Image
                src={resource.image}
                alt={resource.name}
                width={100}
                height={100}
              />
              <div>
                <h3 className="font-bold mt-1">{resource.name}</h3>
                <p className="text-xs text-gray-500">{resource.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;
