import React from 'react';
import { SunIcon, MoonIcon, CalendarDaysIcon, CloudIcon, EyeIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import _ from 'lodash';

// styles
const svg = 'w-4 h-4 stroke-darkblue';
const text = 'text-darkblue text-xs';
const flex = 'flex items-center gap-2';

const CustomTooltip: React.FC<any> = props => {
  const data = props.payload[0];

  return (
    <>
      {data && (
        <div className="flex flex-col justify-center p-2 w-36 border-2 border-indigo-400 rounded-md bg-indigo-200 shadow-lg opacity-75">
          <h4 className="m-0 text-center text-darkblue">{data.payload.weather.main}</h4>

          <h5 className="mb-2 text-xs text-center text-darkblue">{_.capitalize(data.payload.weather.description)}</h5>

          <div className={flex}>
            <CalendarDaysIcon className={svg} />

            <span className={text}>{data.payload.date.format('DD/MM/YYYY H:mm')}</span>
          </div>

          <div className={flex}>
            {data.payload.sys === 'd' ? (
              <SunIcon className={cn(svg, 'stroke-amber-600')} />
            ) : (
              <MoonIcon className={cn(svg, 'stroke-indigo-900')} />
            )}

            <span className={text}>{data.payload.degrees}&#8451;</span>
          </div>

          <div className={flex}>
            <CloudIcon className={svg} />

            <span className={text}>{data.payload.clouds + '%'}</span>
          </div>

          <div className={flex}>
            <EyeIcon className={svg} />

            <span className={text}>{+(data.payload.visibility / 1000).toFixed(2) + ' km'}</span>
          </div>

          <div className={text}>{`Humidity: ${data.payload.humidity}%`}</div>

          <div className={text}>{`Wind: ${data.payload.wind.speed} m/s`}</div>

          <div className={text}>{`Wind gust: ${data.payload.wind.gust} m/s`}</div>
        </div>
      )}
    </>
  );
};

export default CustomTooltip;
