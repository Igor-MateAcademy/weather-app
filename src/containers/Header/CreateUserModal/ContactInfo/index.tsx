import React from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// components
import { Input } from 'components';

// models
import { User } from 'models';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const ContactInfo: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Pick<User, 'firstName' | 'lastName'>>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  return (
    <>
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
    </>
  );
};

export default ContactInfo;
