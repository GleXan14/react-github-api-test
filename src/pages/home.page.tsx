import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomSearch from "../components/search.component";
import CustomTable from "../components/table.component";
import { User } from "../models/user.model";
import GithubService from '../services/github.service';


function HomePage(){

    const [users, setUsers] = useState<User[]>([]);
    const [searchText, setSearchText] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(()=>{

        loadUsersData();
        
        return () => {
            setUsers([]);
        }
    }, [])

    const loadUsersData = async (perPage:number = 25) => {
        const usersData = await GithubService.getUsers(0, perPage);
        setUsers(usersData);
    }

    const loadUserDataBySearch = async (text:string, perPage:number = 25, page:number = 1) => {
        const usersData = await GithubService.searchUsers(text, perPage, page);
        setUsers(usersData);
    }

    const handlePageChange = async (newPage: number, rowsPerPage:number) => {
        if(searchText){
            loadUserDataBySearch(searchText, rowsPerPage, newPage);
        }else{
            const since:number = (newPage*rowsPerPage);
            const usersData = await GithubService.getUsers(since , rowsPerPage);
            setUsers(usersData);
        }
    }

    const handleDetailsClick = (row:User) => {
        navigate(`/user/${row.username}`);
    }

    const handleSearch = (text:string) => {
        if(text && text.trim().length > 0){
            setSearchText(text);
            loadUserDataBySearch(text);

        }else {
            setSearchText(null);
            loadUsersData();
        };
        
    }


    return (
        <div className="home-container">
            <div className="search-container">
                <CustomSearch onSearch={handleSearch} />
            </div>
            <div className="table-container">
                <CustomTable 
                    headers={['ID', 'FOTO DE PERFIL', 'USUARIO']}
                    data={users.map((user) => {
                        return {id:user.id, img: user.imgUrl, username: user.username}
                    })}
                    onPageChange={handlePageChange}
                    count={100}
                    rowImageIndex={1}
                    onDetailsClick={handleDetailsClick}

                />
            </div>
        </div>
    )
}
export default HomePage;