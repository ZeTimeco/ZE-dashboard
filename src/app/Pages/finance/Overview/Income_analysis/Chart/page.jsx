"use client"
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { getRevenueChartDataThunk, getYearsDrowpdownThunk } from '@/redux/slice/Finance/FinanceSlice';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function ChartPage({dispatch , revenueChartData}) {
  const { t } = useTranslation();

  const { yearOfChart } = useSelector((state) => state.finance);
  useEffect(() => {
    dispatch(getYearsDrowpdownThunk());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(new Date().getFullYear().toString()); 
  const options = yearOfChart?.years || [];

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    dispatch(getRevenueChartDataThunk({ year: option, filter: 'all' }));
  };

  const chartSeries = [{
    name: "Income", 
    data: revenueChartData?.total || []
  }];

  const chartOptions = {
    chart: {
      type: 'area',
      height: 210,
      width: '100%',
      zoom: { enabled: false },
      toolbar: { show: false },
      parentHeightOffset: 0,
    },
    colors: ['#2E078B'],
    fill: {
      type: 'solid',
      colors: ['#DBCEFA']
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'straight',
      colors: ['#2E078B']
    },
    labels: revenueChartData?.month_name || [],
    xaxis: {
      type: 'category',
    },
    yaxis: {
      opposite: true
    },
    grid: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      }
    },
    legend: {
      horizontalAlign: 'right'
    }
  };

  const getPeriodLabelAndRange = (selectedYear) => {
    const label = selectedYear;
    return { label };
  };

  const { label } = getPeriodLabelAndRange(selected);

  return (
    <>
      <section className="flex justify-between relative z-10 mt-2 py-3 px-6">
        <div className="flex flex-col">
        </div>
        
        {yearOfChart?.years_count > 1 ? (
          <div className="relative">
            <button
              className="border border-[#C69815] rounded-[3px] font-medium text-base flex items-center justify-between min-w-[120px] h-10 py-2.5 px-4 cursor-pointer text-[#C69815] transition-colors hover:bg-[rgba(198,152,21,0.04)]"
              onClick={() => setOpen(!open)}
            >
              {selected}
              <svg
                className={`transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="#C69815" strokeWidth="2" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {open && (
              <ul className="absolute right-0 mt-1 w-full bg-white border border-[#E3E8EF] rounded shadow-md z-20">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="px-3 py-2 text-sm text-right hover:bg-[#FCFCFD] cursor-pointer text-[#475467] transition-colors"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </section>
  
      {/* chart */} 
      <section className="w-full px-2 pb-2 overflow-hidden">
        <div id="chart" dir="rtl" className="w-full overflow-hidden">
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" width="100%" height={210} />
        </div>
        <div id="html-dist"></div>
      </section>
    </>
  );
}

export default ChartPage;