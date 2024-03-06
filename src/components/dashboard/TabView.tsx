import { Dispatch, useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab, Value } from "../../interfaces";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import dayjs from "dayjs";
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import "../../assets/datepicker.css";
import Chevron from "../icons/Chevron";


type TTabViewProps = {
  tabs: TTab[];
  range1: Value;
  range2: Value;
  setRange1: Dispatch<React.SetStateAction<Value>>;
  setRange2: Dispatch<React.SetStateAction<Value>>;
};



export const TabView = ({ tabs, range1, range2, setRange1, setRange2 }: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);
  //  INFO: an extra state for toggling the tab content view,
  //  INFO: it will not effect the selected tab, activeTab will keep the last active tab

  const [showTabContent, setShowTabContent] = useState(true);



  return (
    <div className=" mx-auto p-3 bg-white border rounded-lg drop-shadow-md">
      <div className="flex justify-between items-center">
        <div className="tabs flex gap-x-4">
          {tabs?.map((tab: TTab, index: number) => (
            <TabItem
              key={tab?.id}
              label={tab?.label}
              total={tab?.total}
              isActive={index === activeTab}
              clickHandler={() => setActiveTab(index)}
            />
          ))}
        </div>
        <button type="button" onClick={() => setShowTabContent(!showTabContent)}> <Chevron width={70} height={25} className={` fill-black/50 ${!showTabContent ? "rotate-180" : ""}`} /></button>
      </div>
      {
        showTabContent &&
        <div className="mx-auto">
          {tabs?.map((tab: TTab, index: number) => (
            <TabPanel key={tab?.id} isActive={index === activeTab}>
              <>
                {tab?.content}
                <div className="relative">
                  <div className=" z-[9999] w-full flex justify-end ">
                    <div className="bg-[#F6F6F7] rounded-[10px] px-3 py-1 mr-4 flex items-center">
                      <div className=" bg-gradient-to-r from-[#489AD2] to-[#6FC2F3] w-[15px] h-[3px]" >
                      </div>
                      <DateRangePicker
                        className=" z-[999]"
                        calendarClassName="rounded-[10px] shadow-md shadow-[#eee]"
                        onChange={(range: Value) => {
                          let filter = tab?.filters;
                          filter[0].value = range !== null ? dayjs(range[0 as keyof Value]) : "";
                          tab?.setFilters(() => [...filter]);
                          setRange1(range)
                        }}
                        value={range1}
                        format="MMM-dd-yyyy"
                      />
                    </div>
                    <div className="bg-[#F6F6F7] rounded-[10px] px-3 py-1 flex items-center">
                      <div className=" bg-[#6FC2F3] w-[5px] h-[3px] before:w-[5px] " >
                      </div>
                      <DateRangePicker
                        className=" z-[999]"
                        calendarClassName="rounded-[10px] shadow-md shadow-[#eee]"
                        onChange={(range: Value) => {
                          let filter = tab?.filters;
                          filter[1].value = range !== null ? dayjs(range[1 as keyof Value]) : "";
                          tab?.setFilters(() => [...filter]);
                          setRange2(range)
                        }}
                        value={range2}
                        format="MMM-dd-yyyy"
                      />
                    </div>

                  </div>
                </div>
              </>
            </TabPanel>
          ))}
        </div>
      }
    </div >
  );
};
