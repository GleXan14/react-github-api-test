
import axios from 'axios';
import { UserRepo } from '../models/user-repos.model';
import { User } from '../models/user.model';


const baseUrl:string = 'https://api.github.com';

export default class GithubService{

    static async getUsers(since:number = 1, perPage:number = 30): Promise<User[]>{
        const url:string = `${baseUrl}/users`;
        const params = {
            since,
            per_page: perPage
        }
        const {data} = await axios.get(url, {params});
        return data.map((user:any) => new User().assignDataFromApi(user));
    }

    static async getUser(username:string): Promise<User>{
        const url:string = `${baseUrl}/users/${username}`;
        const {data} = await axios.get(url);
        return new User().assignDataFromApi(data);
    }

    static async searchUsers(searchText:string, perPage:number = 30, page:number = 1): Promise<User[]>{
        const url:string = `${baseUrl}/search/users`;
        const params = {
            q: searchText,
            per_page: perPage,
            page
        }
        const {data} = await axios.get(url, {params});
        return data.items.map((user:any) => new User().assignDataFromApi(user));
    }

    static async getRepos(username:string, perPage:number = 30, page:number = 1):Promise<UserRepo[]>{
        const url:string = `${baseUrl}/users/${username}/repos`;
        const params = {
            per_page: perPage,
            page
        }
        const {data} = await axios.get(url, {params});
        return data.map((repo:any) => new UserRepo().assignDataFromApi(repo));
    }


}