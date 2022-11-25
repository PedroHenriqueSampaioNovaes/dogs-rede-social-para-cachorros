import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import UserHeader from './UserHeader';
import UserStats from './UserStats';
import UserPhotoPost from './UserPhotoPost';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

const User = () => {
  const { data } = React.useContext(UserContext);

  return (
    <section className="container">
      <Head title="Minha Conta" />

      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
