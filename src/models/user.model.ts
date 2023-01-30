import { UserRepo } from './user-repos.model';


export class User{
    id:number | null;
    username:string | null;
    name:string | null;
    email:string | null;
    bio:string| null;
    location: string | null;
    imgUrl:string | null;
    repos: UserRepo[];
    reposCount:number | null;
    followers:number | null;
    following:number | null;
    
    constructor(){
        this.id = null;
        this.username = null;
        this.name = null;
        this.imgUrl = null;
        this.repos = [];
        this.followers = null;
        this.following = null;
        this.email = null;
        this.bio = null;
        this.location = null;
        this.reposCount = null;

    }

    deserialize(input:any): this{
        Object.assign(this, input);
        return this;
    }

    assignDataFromApi(data:any):this{
        this.id = data.id;
        this.username = data.login;
        this.name = data.name ? data.name : null;
        this.imgUrl = data.avatar_url;
        this.email = data.email ? data.email : null;
        this.bio = data.bio ? data.bio : null;
        this.location = data.location ? data.location : null;
        this.reposCount = data.public_repos ? data.public_repos : null;
        this.followers = data.followers ? data.followers : null;
        this.following = data.following ? data.following : null;
        return this;
    }


}