"use client";

import { useMutation, useQuery } from "@apollo/client";
import { 
  ADD_RESOURCE, 
  GET_RESOURCES, 
  GET_RESOURCE, 
  UPDATE_RESOURCE, 
  DELETE_RESOURCE 
} from "@/lib/graphql";
import { ResourceType, ResourceInput } from "@/lib/types";
import { useCallback } from "react";
import Cookies from "js-cookie";

export const useResources = () => {
  const organizationId = Cookies.get('organizationId');
  const accessToken = Cookies.get('accessToken');

  console.log("useResources - organizationId:", organizationId);
  console.log("useResources - accessToken:", accessToken ? "exists" : "missing");

  // Get all resources for an organization
  const { 
    data: resourcesData, 
    loading: resourcesLoading, 
    error: resourcesError,
    refetch: refetchResources 
  } = useQuery(GET_RESOURCES, {
    variables: { organizationId },
    skip: !organizationId || !accessToken,
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  console.log("useResources - query result:", { 
    resourcesData, 
    resourcesLoading, 
    resourcesError,
    getOrganizationResources: resourcesData?.getOrganizationResources,
    resourcesLength: resourcesData?.getOrganizationResources?.length
  });

  // Add resource mutation
  const [addResource, { loading: addLoading, error: addError }] = useMutation(ADD_RESOURCE, {
    onCompleted: () => {
      refetchResources();
    },
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  // Update resource mutation
  const [updateResource, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_RESOURCE, {
    onCompleted: () => {
      refetchResources();
    },
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  // Delete resource mutation
  const [deleteResource, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_RESOURCE, {
    onCompleted: () => {
      refetchResources();
    },
    context: {
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  // Get single resource
  const getResource = useCallback((resourceId: string) => {
    return useQuery(GET_RESOURCE, {
      variables: { resourceId },
      skip: !resourceId,
    });
  }, []);

  // Create resource function
  const createResource = useCallback(async (resourceInput: ResourceInput) => {
    console.log("createResource called with:", resourceInput);
    try {
      const { data } = await addResource({
        variables: { resourceInput },
        context: {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        },
      });
      console.log("createResource result:", data);
      return data?.addResource;
    } catch (error) {
      console.error("Error creating resource:", error);
      throw error;
    }
  }, [addResource, accessToken]);

  // Update resource function
  const editResource = useCallback(async (resourceId: string, resourceInput: ResourceInput) => {
    try {
      const { data } = await updateResource({
        variables: { resourceId, resourceInput },
        context: {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        },
      });
      return data?.updateResource;
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
  }, [updateResource, accessToken]);

  // Delete resource function
  const removeResource = useCallback(async (resourceId: string) => {
    try {
      const { data } = await deleteResource({
        variables: { resourceId },
        context: {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        },
      });
      return data?.deleteResource;
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  }, [deleteResource, accessToken]);

  return {
    // Data
    resources: resourcesData?.getOrganizationResources || [],
    
    // Loading states
    loading: resourcesLoading,
    addLoading,
    updateLoading,
    deleteLoading,
    
    // Error states
    error: resourcesError,
    addError,
    updateError,
    deleteError,
    
    // Functions
    createResource,
    editResource,
    removeResource,
    getResource,
    refetchResources,
  };
}; 