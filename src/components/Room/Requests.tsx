/* eslint-disable import/order */
import React from 'react';
import { UserRequest } from '.';
import { Header, EmptyMsg } from '@/components';
import { useRoomContext } from '@/contexts/RoomContext';

const Requests = () => {
  const { room, isAdmin } = useRoomContext();

  if (!isAdmin) return <div />;
  return (
    <>
      <Header title='Requests' backBtn={room.requests.length > 0} />
      {!room?.requests?.length && <EmptyMsg empty='requests' />}
      <div className='mb-4 w-full space-y-2'>
        {room?.requests?.map((user) => (
          <UserRequest key={user} userId={user} />
        ))}
      </div>
    </>
  );
};

export default Requests;
