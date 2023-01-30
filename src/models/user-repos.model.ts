

export class UserRepo{
    id:number | null;
    name:string | null;
    description:string | null;
    language:string | null;
    url:string | null;

    constructor(){
        this.id = null;
        this.name = null;
        this.description = null;
        this.language = null;
        this.url = null;
    }

    assignDataFromApi(data:any):this{
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.language = data.language;
        this.url = data.html_url;

        return this;
    }
}