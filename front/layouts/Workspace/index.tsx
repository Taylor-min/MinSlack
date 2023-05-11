import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC, ReactNode, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, WorkspaceWrapper, Workspaces } from "@layouts/Workspace/style";
import gravatar from 'gravatar';
import loadable from "@loadable/component";

const Channel = loadable(()=> import('@pages/Channel'));
const DirectMessage = loadable(()=> import('@pages/DirectMessage'));

interface IProps {
    children?: ReactNode;
}

const Workspace: FC<IProps> = ({ children }) => {
    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher );
    const navigate = useNavigate(); // useNavigate hook to navigate to other routes
    const onLogout = useCallback(() => {
        axios
            .post('http://localhost:3095/api/users/logout', null, {
                withCredentials: true,
            })
            .then(() => {
                // revalidate(); 
                mutate(false, false);
            });
    }, []);

    if (!data) {
        navigate('/login');
        return null;
    }
    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.nickname} />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Minslack</WorkspaceName>
                    <MenuScroll></MenuScroll>
                </Channels>
                <Chats>    
                    <Routes>
                        <Route path="channel" element={<Channel />} />
                        <Route path="dm" element={<DirectMessage />} />
                    </Routes>
                </Chats>
            </WorkspaceWrapper>
        </div>
    );
};

export default Workspace;