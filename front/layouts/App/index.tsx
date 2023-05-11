import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable, { DefaultComponent } from '@loadable/component';
import { ComponentType } from 'react';
import Channel from '@pages/Channel';
import DirectMessage from '@pages/DirectMessage';


const LogIn = loadable(
  () => import('@pages/LogIn').then(({ default: module }) => module) as Promise<ComponentType<any>>,
);

const SignUp = loadable(()=> import('@pages/SignUp'));
const Workspace = loadable(()=> import('@layouts/Workspace'));



const App = () => {
  const isLoggedIn = false; // 로그인 여부를 판단하는 변수
  return (
    <Routes >
      {/* 로그인하지 않은 상태에서 로그인 페이지 이외의 페이지로 접근할 경우, /login으로 리다이렉션합니다. */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace" element={<Workspace />}>
          <Route path="channel" element={<Channel />} />
          <Route path="dm" element={<DirectMessage />} />  
      </Route>
    </Routes>

  );
};

export default App;