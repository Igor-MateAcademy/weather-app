import React, { useState, useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from 'lodash';
import cn from 'classnames';

// components
import { Modal, Text, Button } from 'components';
import ContactInfo from './ContactInfo';
import LocationInfo from './LocationInfo';

// queries
import { getUserById } from 'graphql/queries';

// mutations
import { addUser, updateUser } from 'graphql/mutations';

// models
import { User, NewUser } from 'models';

// context
import { UsersContext } from 'containers/App/context';

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
});

// styles
const button = 'items-center w-20 h-8 bg-indigo-200 border-indigo-400 border-2 text-center text-xs text-darkblue';

const CreateUserModal: React.FC<Props> = ({ children, currentUser }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<User>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { update } = useContext(UsersContext);
  // const [user, setUser] = useState<NewUser>({
  //   ...DEFAULT_USER,
  // });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const isExist = !!currentUser;
  const steps = [1, 2, 3];

  const { data, refetch } = useQuery(
    [`user-${currentUser?.id}`, currentUser?.id],
    () => isExist && getUserById(currentUser.id),
    {
      onSuccess: data => {
        // data && setUser(data);
      },
    }
  );
  const { mutateAsync, isLoading } = useMutation(['create-user'], (user: NewUser) => addUser(user), {
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
      onToggle();
      await update();
    },
    onError: (e: string) => {
      console.log(e);
    },
  });

  const onToggle = async () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      setCurrentStep(1);
      reset({ ...DEFAULT_VALUES });
    }

    // if (!isOpen && !isExist) setUser(DEFAULT_USER);
  };

  const onSubmit = async (data: Partial<User>) => {
    console.log(data);

    // if (isExist) {
    //   await updateResponse.mutateAsync(user);
    // } else {
    //   await mutateAsync(user);
    // }
  };

  // const selectHandler = (field: keyof NewUser) => (value: string) => {
  //   const userData = {
  //     ...user,
  //     [field]: value,
  //   };

  //   setUser(field === 'country' ? { ...userData, timezone: '', city: '' } : userData);
  // };

  // const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  console.log(errors);

  useEffect(() => {
    reset({ ...DEFAULT_VALUES });
  }, []);

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
            <div className="flex items-center justify-between mb-8">
              <Button
                className={cn(button, currentStep === 1 && 'opacity-0 pointer-events-none')}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {steps.map(step => (
                  <div
                    className={cn('w-6 h-1 rounded bg-gray-200 transition', step <= currentStep && 'bg-lime-400')}
                    key={step}
                  />
                ))}
              </div>

              <Button
                className={cn(button, currentStep === 3 && 'opacity-0 pointer-events-none')}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            </div>

            <div className="flex flex-col items-center gap-2">
              {currentStep === 1 ? (
                <ContactInfo />
              ) : currentStep === 2 ? (
                <LocationInfo control={control} getValues={getValues} errors={errors} />
              ) : (
                <>Result page</>
              )}
            </div>
          </div>

          {/* <Button
            isLoading={isLoading || updateResponse.isLoading}
            disabled={_.isEqual(user, currentUser)}
            className="py-2 px-4 bg-indigo-300 hover:bg-indigo-400 transition"
          >
            {isExist ? 'Save' : 'Create'}
          </Button> */}
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
