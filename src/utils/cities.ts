import moment from 'moment-timezone';
import _ from 'lodash';

const dn = new Intl.DisplayNames('en', { type: 'region' });

export const countriesISO = moment.tz.countries();
export const countries = countriesISO.map(abbr => dn.of(abbr)) as string[];

export const getTimezonesByCountry = (country: string): string[] => {
  if (!country) return [];

  const timezones = moment.tz.zonesForCountry(country);

  return timezones;
};

export const getLocalTimeByTimeZone = (timezone: string): moment.Moment => moment.tz(timezone);

export const getCountryName = (code: string) => {
  try {
    dn.of(code);
  } catch (err) {
    return;
  }

  return dn.of(code);
};
