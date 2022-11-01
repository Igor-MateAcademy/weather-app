import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ClockIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import moment from 'moment-timezone';

// components
import { Modal, Loader, Pagination } from 'components';
import WeatherChart from './WeatherChart';

// models
import { CityWeather, ForecastData, LatLon } from 'models';

// api
import { weatherAPI, timezoneAPI } from 'config';

// utils
import { getLocalTimeByTimeZone } from 'utils';

interface Props {
  children: React.ReactNode;
  city: string;
}

const CHUNK_COUNT = 5;

const WeatherModal: React.FC<Props> = ({ children, city }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [currentForecast, setCurrentForecast] = useState<ForecastData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [coords, setCoords] = useState<LatLon | null>(null);
  const [localTime, setLocalTime] = useState<moment.Moment | null>(null);

  const prepareWeatherData = (weather: CityWeather) => {
    if (!localTime) return;

    const hoursOffset = moment(localTime).utcOffset();
    const { lon, lat } = weather;
    const items = weather.list;

    const preparedData = items.map(item => ({
      name: moment(item.dt_txt).utcOffset(hoursOffset).format('H:mm'),
      date: moment(item.dt_txt).utcOffset(hoursOffset),
      humidity: item.main.humidity,
      degrees: Math.trunc(item.main.feels_like),
      sys: item.sys.pod,
      wind: {
        speed: item.wind.speed,
        gust: item.wind.gust,
      },
      clouds: item.clouds.all,
      weather: item.weather[0],
      visibility: item.visibility,
    }));

    setForecast(preparedData);
    setCoords({ lon, lat });
  };

  // get weather data for city
  const weatherResponse = useQuery([`get-weather-${city}`], () => getWeatherByCity(), {
    enabled: isOpen,
    select: ({ city, list }: any) => ({ city, list, lat: city.coord.lat, lon: city.coord.lon } as CityWeather),
    onSuccess: prepareWeatherData,
  });

  // get timezone data for city
  const timezoneResponse = useQuery([`get-timezone-by-coords-of-${city}`], () => getTimezoneByCoords(), {
    enabled: false,
    select: ({ zoneName }) => zoneName,
    onSuccess: (timezone: string) => {
      const localTimeOfTZ = getLocalTimeByTimeZone(timezone);

      setLocalTime(localTimeOfTZ);
    },
  });

  const onToggle = () => {
    setIsOpen(!isOpen);

    !isOpen && setPage(1);
  };

  const getWeatherByCity = async () => {
    const { data, status } = await weatherAPI.get(
      `forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );

    if (status !== 200) throw new Error();

    return data;
  };

  const getTimezoneByCoords = async () => {
    if (_.isNull(coords)) return;

    const { lat, lon } = coords;

    const { data, status } = await timezoneAPI.get(
      `get-time-zone?key=${process.env.REACT_APP_TIMEZONEDB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
    );

    if (status !== 200) throw new Error();

    return data;
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const init = () => {
    const chunkedItems = _.chunk(forecast, CHUNK_COUNT);
    const selectedItems = chunkedItems[page - 1];

    setCurrentForecast(selectedItems);
  };

  useEffect(() => {
    init();
  }, [forecast, page]);

  useEffect(() => {
    timezoneResponse.refetch();
  }, [coords]);

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: onToggle,
      })}

      <Modal open={isOpen} onToggle={onToggle} className="px-4 py-2 overflow-hidden">
        {(weatherResponse.isLoading || timezoneResponse.isLoading) && <Loader />}

        {weatherResponse.data && timezoneResponse.data && (
          <>
            <div className="flex gap-12 mb-4">
              <h3 className="text-lg text-darkblue">{city}</h3>

              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 stroke-darkblue" />

                {localTime && <span className="text-sm text-darkblue">{localTime.format('H:mm')}</span>}
              </div>
            </div>

            <div className="my-4">
              <Pagination
                page={page}
                perPage={CHUNK_COUNT}
                total={weatherResponse.data.list.length}
                onChange={onChangePage}
              />
            </div>

            <WeatherChart data={currentForecast} />
          </>
        )}
      </Modal>
    </>
  );
};

export default WeatherModal;
