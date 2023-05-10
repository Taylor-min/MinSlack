import fetcher from "@utils/fetcher";
import axios from "axios";
import React, { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

interface IProps {
    children: ReactNode;
  }
  
const Workspace:FC<IProps>= ({children}) => {
    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
    const navigate = useNavigate(); // useNavigate hook to navigate to other routes
    const onLogout = useCallback(()=> {
        axios
        .post('http://localhost:3095/api/users/logout', null,{
            withCredentials:true,
        })
        .then(()=> {
            revalidate(); // mutate 함수를 호출할 때 옵션으로 true 값을 전달하여 사용합니다.
        });
    },[]);
    
    if(!data){
        navigate('/login');
        return null;
    }
    return(
        <div>
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </div>
    );
};

export default Workspace;