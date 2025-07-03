"use client";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash, IconDownload } from "@tabler/icons-react";
import React from "react";
import { useParams } from "next/navigation";
import { useResources } from "@/hooks/useResources";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { GET_RESOURCE } from "@/lib/graphql";
import Cookies from "js-cookie";

const ResourcePage = () => {
  const params = useParams();
  const resourceId = params.slug as string;
  const accessToken = Cookies.get('accessToken');
  
  const { removeResource, deleteLoading } = useResources();
  const { data: resourceData, loading, error } = useQuery(GET_RESOURCE, {
    variables: { resourceId },
    skip: !resourceId || !accessToken,
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });
  
  const resource = resourceData?.getResource;

  const handleDelete = async () => {
    if (!resource) return;
    
    try {
      await removeResource(resource._id);
      toast.success("Resource deleted successfully");
      // Redirect to resources list
      window.location.href = "/dashboard/resources";
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  const handleDownload = () => {
    if (resource?.fileUrl) {
      window.open(resource.fileUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="p-6 flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-red-500">Resource not found or error loading resource.</p>
      </div>
    );
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'pptx': return '📊';
      case 'txt': return '📄';
      default: return '📄';
    }
  };

  return (
    <div className="p-6 grid grid-cols-12 gap-6 h-full max-lg:grid-cols-1">
      <div className="lg:flex gap-4 h-fit p-6 rounded-md border lg:col-span-9">
        <div className="bg-gray-100 rounded-md p-8 flex items-center justify-center min-w-[200px]">
          <div className="text-center">
            <div className="text-6xl mb-4">{getFileIcon(resource.fileType)}</div>
            <p className="text-sm text-gray-500 uppercase">{resource.fileType}</p>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{resource.name}</h1>
          <p className="text-sm text-gray-400">By {resource.author}</p>
          <p className="text-sm text-gray-500 max-w-md my-2">
            {resource.description}
          </p>
          <p className="text-sm text-gray-400">
            Created: {new Date(resource.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400">
            Updated: {new Date(resource.updatedAt).toLocaleDateString()}
          </p>
          <div className="flex gap-2 items-center mt-4">
            <Button 
              size={"sm"} 
              variant={"outline"}
              onClick={handleDownload}
            >
              <IconDownload className="w-4 h-4 mr-1" />
              Download
            </Button>
            <Button 
              size={"sm"} 
              variant={"outline"}
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <IconTrash className="w-4 h-4 mr-1" />
              )}
              Delete
            </Button>
            <Button
              variant={"default"}
              className="bg-primary hover:bg-primary/90"
              size={"sm"}
            >
              <IconPencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3">
        <div className="p-4 rounded-md border">
          <h3 className="font-semibold mb-2">Resource Details</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-500">File Type:</span>
              <span className="ml-2 font-medium">{resource.fileType.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-gray-500">Author:</span>
              <span className="ml-2 font-medium">{resource.author}</span>
            </div>
            <div>
              <span className="text-gray-500">Organization:</span>
              <span className="ml-2 font-medium">{resource.organization.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
