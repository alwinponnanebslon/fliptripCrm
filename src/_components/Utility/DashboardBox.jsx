import React from "react";

export function DashboardBox({ children, className }) {
  console.log(children, "children");
  console.log(className, "className");
  return (
    <div className={className ? `dashboard-box ${className}` : "dashboard-box"}>
      {/* {console.log(className, "name33333333")} */}
      {children}
    </div>
  );
}

export function DashboardChart({ children, className }) {
  console.log(children, "DashboardChart-children");
  console.log(className, "DashboardChart-0className");
  return (
    <div
      className={
        className
          ? `dashboard-chart dashboard-box ${className}`
          : "dashboard-chart dashboard-box"
      }
    >
      {children}
    </div>
  );
}

export function DashboardTable({ children, className }) {
  return (
    <div
      className={
        className
          ? `dashboard-table dashboard-box ${className}`
          : "dashboard-table dashboard-box"
      }
    >
      {children}
    </div>
  );
}
