import {
  IconBook,
  IconBriefcase2,
  IconCertificate,
  IconChartPie,
  IconChecks,
  IconClock,
  IconLayout2,
  IconPuzzle,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
export const reportsPageStat = [
  {
    sub: "Course Enrollments",
    value: "500",
    percent: "+10% since last month",
    icon: <IconBook className="text-primary w-5 h-5" />,
  },
  {
    sub: "Average daily learning time",
    percent: "+10% from yesterday",
    value: "5hrs",
    icon: <IconClock className="text-primary w-5 h-5" />,
  },
  {
    sub: "Certificates awarded",
    percent: "-10% since last month",
    value: "500",
    icon: <IconCertificate className="text-primary w-5 h-5" />,
  },
  {
    sub: "Total Employees",
    percent: "+10% since last month",
    value: "500",
    icon: <IconUsers className="text-primary w-5 h-5" />,
  },
];
