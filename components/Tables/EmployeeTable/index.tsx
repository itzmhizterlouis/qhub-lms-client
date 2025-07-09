"use client";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/lib/types";
import { DataTable } from "./DataTable";
import { Button } from "../../ui/button";
import Cookies from "js-cookie";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconCircleCheckFilled } from "@tabler/icons-react";

import { IconDots, IconTrash } from "@tabler/icons-react";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GET_LMS_USERS } from "@/lib/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
import { start } from "repl";

const EmployeeTable = () => {
  const organizationId = Cookies.get("organizationId");
  const token = Cookies.get("accessToken");

  const [fetchEmployees, { data, loading, error }] = useLazyQuery(GET_LMS_USERS);

  // Fetch employees on mount
  useEffect(() => {
    if (organizationId && token) {
      fetchEmployees({
        variables: { organizationId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [organizationId, token, fetchEmployees]);

  // Map API data to Employee[]
  const employees: Employee[] = (data?.getOrganizationUsers || []).map((user: any) => ({
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role,
    status: user.onboarded ? "active" : "inactive",
    startDate: new Date(user.createdAt).toLocaleDateString(),
    email: user.email,
  }));

  const columns: ColumnDef<Employee>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name & Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const email = row.original.email;
        const name = row.original.name;
        return (
          <div className="">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-gray-600 lowercase font-plus text-sm">
              {email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return status === "active" ? (
          <IconCircleCheckFilled className="text-green-500 cursor-pointer" />
        ) : (
          <IconCircleCheckFilled className="text-gray-300 cursor-pointer" />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-6 w-[65px] items-center group">
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <IconDots className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More actions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Change role</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => alert("Delete user")}
                  className="hover:!text-red-500"
                >
                  Deactivate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => alert("Delete user")}
                  className="hover:!text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <IconTrash className="w-4 h-4 text-gray-500 hidden group-hover:block cursor-pointer" />
          </div>
        );
      },
    },
  ];

  if (loading) return <div className="container mx-auto">Loading employees...</div>;
  if (error) return <div className="container mx-auto text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto ">
      <DataTable columns={columns} data={employees || []} />
    </div>
  );
};

export default EmployeeTable;

