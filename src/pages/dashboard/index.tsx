import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { Filters, IChart, IChartDatum, TTab, Value } from "../../interfaces";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";


const revenueFilters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(60, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().subtract(0, "days").startOf("day"),
  },
];
const ordersFilters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(60, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().subtract(0, "days")?.startOf("day"),
  },
];
const customersFilter: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: dayjs()?.subtract(60, "days")?.startOf("day"),
  },
  {
    field: "end",
    operator: "eq",
    value: dayjs().startOf("day"),
  },
];


export const Dashboard: React.FC = () => {

  // INFO: Changed the filters into a satate, for implementing filtering process,
  // INFO: Changing the start and end value, which causes a rerendering to update the chart by new values. 
  // INFO: Kept 3 states for 3 filters, instead of one object, for passing in single key in the Tabs array
  const [dailyRevenueFilter, setDailyRevenueFilter] = useState<CrudFilter[]>(revenueFilters)
  const [dailyOrdersFilters, setDailyOrdersFilters] = useState<CrudFilter[]>(ordersFilters)
  const [newCustomersFilter, setNewCustomersFilter] = useState<CrudFilter[]>(customersFilter)

  // INFO: Uplifted the states for date-range picker, for using the filtering
  const [range1, setRange1] = useState<Value>(() => [dayjs()?.subtract(60, "days")?.startOf("day").toDate(), dayjs()?.subtract(30, "days")?.startOf("day").toDate()]);
  const [range2, setRange2] = useState<Value>(() => [dayjs()?.subtract(30, "days")?.startOf("day").toDate(), dayjs()?.subtract(0, "days")?.startOf("day").toDate()]);


  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters: dailyRevenueFilter,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters: dailyOrdersFilters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters: newCustomersFilter,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => {
        let chartObj = { date: "", value1: "0", value2: "0" };
        chartObj.date = new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date));
        let date = new Date(item.date)

        // INFO: Followinf LOCs are the logic for filtering using the date
        if (range1 !== null && range2 !== null) {
          const range1StartDate = new Date(range1[0 as keyof Value])
          const range1EndDate = new Date(range1[1 as keyof Value])
          const range2StartDate = new Date(range2[0 as keyof Value])
          const range2EndDate = new Date(range2[1 as keyof Value])
          if (date >= range1StartDate && date <= range1EndDate) {
            chartObj.value1 = item.value
          }
          if (date > range2StartDate && date < range2EndDate) {
            chartObj.value2 = item.value
          }
        }
        return chartObj;
      })
    }, [d, range1, range2]); // this memoization sould run also when the filter changes
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);


  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue",
      content: (
        <ResponsiveLineChart
          kpi="Daily revenue"
          data={memoizedRevenueData}
          colors={{
            stroke: "rgb(54, 162, 235)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
      total: dailyRevenue?.data?.total,
      filters: dailyRevenueFilter,
      setFilters: setDailyRevenueFilter
    },
    {
      id: 2,
      label: "Daily Orders",
      content: (
        <ResponsiveLineChart
          kpi="Daily orders"
          data={memoizedOrdersData}
          colors={{
            stroke: "rgb(255, 159, 64)",
            fill: "rgba(255, 159, 64, 0.7)",
          }}
        />
      ),
      total: dailyOrders?.data?.total,
      filters: dailyOrdersFilters,
      setFilters: setDailyOrdersFilters
    },
    {
      id: 3,
      label: "New Customers",
      content: (
        <ResponsiveLineChart
          kpi="New customers"
          data={memoizedNewCustomersData}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
      total: newCustomers?.data?.total,
      filters: newCustomersFilter,
      setFilters: setNewCustomersFilter
    },
  ];

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
      <TabView tabs={tabs} range1={range1} range2={range2} setRange2={setRange2} setRange1={setRange1} />
      <RecentSales />
    </>
  );
};
