"use client";
import BrowseResourceHeader from "./BrowseResourceHeader";
import resource from "@/assets/icons/resource.gif";
import UploadResource from "./UploadResource";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useResources } from "@/hooks/useResources";
import { Loader2 } from "lucide-react";
import { ResourceType } from "@/lib/types";

const AdminResourcesPage = () => {
  const [mounted, setMounted] = useState(false);
  const { resources, loading, error } = useResources();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6">
        <div className="flex max-lg:flex-col justify-between">
          <h2 className="font-semibold">Resources</h2>
          <UploadResource />
        </div>
        <div className="w-full mt-4 h-[calc(100vh-200px)] bg-white rounded-md border border-gray-300 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex max-lg:flex-col justify-between">
          <h2 className="font-semibold">Resources</h2>
          <UploadResource />
        </div>
        <div className="w-full mt-4 h-[calc(100vh-200px)] bg-white rounded-md border border-gray-300 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex max-lg:flex-col justify-between">
          <h2 className="font-semibold">Resources</h2>
          <UploadResource />
        </div>
        <div className="w-full mt-4 h-[calc(100vh-200px)] bg-white rounded-md border border-gray-300 flex items-center justify-center">
          <p className="text-red-500">Error loading resources. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex max-lg:flex-col justify-between">
        <h2 className="font-semibold">Resources</h2>
        <UploadResource />
      </div>
      <div className="w-full mt-4 h-[calc(100vh-200px)] bg-white rounded-md  border border-gray-300">
        <BrowseResourceHeader />
        <div className="p-6 h-[calc(100%-80px)] overflow-y-auto ">
          {resources.length > 0 ? (
            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2">
              {resources.map((resource: ResourceType) => (
                <Link
                  href={`/dashboard/resources/${resource._id}`}
                  key={resource._id}
                  className="cursor-pointer"
                >
                  <div className="bg-gray-100 rounded-md p-4 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {resource.fileType === 'pdf' && '📄'}
                        {resource.fileType === 'docx' && '📝'}
                        {resource.fileType === 'pptx' && '📊'}
                        {resource.fileType === 'txt' && '📄'}
                        {!['pdf', 'docx', 'pptx', 'txt'].includes(resource.fileType) && '📄'}
                      </div>
                      <p className="text-xs text-gray-500 uppercase">{resource.fileType}</p>
                    </div>
                  </div>
                  <h3 className="font-bold mt-1">{resource.name}</h3>
                  <p className="text-xs text-gray-500">By {resource.author}</p>
                  <p className="text-xs text-gray-400">{resource.fileType.toUpperCase()}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <img src={resource.src} alt="resource" width={100} height={100} />
              <h2 className="mb-3">No resources found</h2>
              <UploadResource />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResourcesPage;
