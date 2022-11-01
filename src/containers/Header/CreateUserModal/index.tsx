import React, { useState, useContext, useLayoutEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import cn from 'classnames';
import { countryToAlpha2 } from 'country-to-iso';

// components
import { Modal, Text, Button, Input, Select } from 'components';

// queries
import { getUserById } from 'graphql/queries';

// mutations
import { addUser, updateUser } from 'graphql/mutations';

// models
import { User, NewUser } from 'models';

// context
import { UsersContext } from 'containers/App/context';

// utils
import { countries, getTimezonesByCountry } from 'utils';

interface Props {
  currentUser?: User;
  children: React.ReactNode;
}

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  country: yup.string().required(),
  timezone: yup.string().required(),
  city: yup.string().required(),
});

// styles
const button = 'items-center w-20 h-8 bg-indigo-200 border-indigo-400 border-2 text-center text-xs text-darkblue';

const CreateUserModal: React.FC<Props> = ({ children, currentUser }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<User>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const isCountrySelected = watch('country');
  const isTimezoneSelected = watch('timezone');

  const { update, setPage } = useContext(UsersContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isExist = !!currentUser;

  const userById = useQuery([`user-${currentUser?.id}`, currentUser?.id], () => isExist && getUserById(currentUser.id));
  const createUser = useMutation(['create-user'], (user: NewUser) => addUser(user), {
    onSuccess: async () => {
      onToggle();
      await update();
    },
    onError: (e: string) => {
      console.log('Error', e);
    },
  });
  const updateResponse = useMutation([`update-user-${currentUser?.id}`], (user: Partial<User>) => updateUser(user), {
    onSuccess: async () => {
      await update();
      onToggle();
    },
    onError: (e: string) => {
      console.log(e);
    },
  });

  const onToggle = async () => {
    setIsOpen(!isOpen);

    if (isExist) {
      await userById.refetch();
      reset(userById.data);
    }

    if (!isOpen && !isExist) {
      reset({ ...DEFAULT_VALUES });
    }
  };

  const onSubmit = async (data: NewUser) => {
    if (isExist) {
      await updateResponse.mutateAsync(data);
    } else {
      await createUser.mutateAsync(data);
    }

    await update();
  };

  const getTimezonesList = () => {
    const country = getValues('country');

    if (!country) return [];

    const converted = countryToAlpha2(country);

    if (!converted) return [];

    return getTimezonesByCountry(converted);
  };

  const selectHandler = (field: keyof NewUser) => (value: string) => {
    setValue(field, value);

    if (field === 'country') {
      setValue('timezone', '');
      setValue('city', '');
    }
  };

  return (
    <>
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: onToggle,
      })}

      <Modal open={isOpen} onToggle={onToggle} className="p-4">
        <h2 className="mb-4 text-xl text-center">
          <Text>{isExist ? 'User Info' : 'Add New User'}</Text>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-8">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="First Name"
                  validateStatus={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                  required
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Last Name"
                  validateStatus={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                  required
                />
              )}
            />

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Country"
                  options={countries}
                  onSelect={selectHandler('country')}
                  validateStatus={!!errors.country}
                  errorMessage={errors.country?.message}
                  required
                />
              )}
            />

            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Timezone"
                  options={getTimezonesList()}
                  onSelect={selectHandler('timezone')}
                  validateStatus={!!errors.timezone}
                  errorMessage={errors.timezone?.message}
                  disabled={!isCountrySelected}
                  required
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="City"
                  validateStatus={!!errors.city}
                  errorMessage={errors.city?.message}
                  disabled={!isCountrySelected || !isTimezoneSelected}
                  required
                />
              )}
            />
          </div>

          <Button
            isLoading={createUser.isLoading || updateResponse.isLoading}
            className="py-2 px-4 bg-indigo-300 hover:bg-indigo-400 transition"
          >
            {isExist ? 'Save' : 'Create'}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
