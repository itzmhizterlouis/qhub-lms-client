import grid from "@/assets/icons/grid.svg";
import gradcap from "@/assets/icons/gradcap.svg";
import test from "@/assets/icons/test.svg";
import file from "@/assets/icons/file.svg";
import chart from "@/assets/icons/chart.svg";
import profile from "@/assets/icons/profile.svg";
export const sidebar = [
  {
    name: "Home",
    icon: grid,
    link: "/dashboard",
  },
  {
    name: "Courses",
    icon: gradcap,
    link: "/dashboard/courses",
  },
  {
    name: "Tests",
    icon: test,
    link: "/dashboard/tests",
  },
  {
    name: "Resources",
    icon: file,
    link: "/dashboard/resources",
  },
  {
    name: "Reports",
    icon: chart,
    link: "/dashboard/reports",
  },
  {
    name: "My Profile",
    icon: profile,
    link: "/dashboard/profile",
  },
];
