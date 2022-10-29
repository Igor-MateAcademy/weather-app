import React from 'react';
import { Controller, Control, FieldErrors, UseFormGetFieldState } from 'react-hook-form';
import { countryToAlpha2 } from 'country-to-iso';

// components
import { Select, Input } from 'components';

// models
import { User } from 'models';

// utils
import { countries, getTimezonesByCountry } from 'utils';

interface Props {
  control: Control<User>;
  errors: FieldErrors;
  getValues: UseFormGetFieldState<User>;
}

const LocationInfo: React.FC<Props> = ({ control, errors, getValues }) => {
  const userData = {
    country: getValues('country'),
    timezone: getValues('timezone'),
    city: getValues('city'),
  };

  const getTimezonesList = () => {
    if (!!userData.country) return [];

    const converted = countryToAlpha2(userData.country);

    if (!converted) return [];

    return getTimezonesByCountry(converted);
  };

  return (
    <>
      <Controller
        name="country"
        control={control}
        render={({ field }) => <Select {...field} label="Country" options={countries} required />}
      />

      <Controller
        name="timezone"
        control={control}
        render={({ ...field }) => (
          <Select {...field} label="Timezone" options={getTimezonesList()} disabled={!userData.country} required />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ ...field }) => (
          <Input {...field} label="City" disabled={!userData.country || !userData.timezone} required />
        )}
      />
    </>
  );
};

export default LocationInfo;
