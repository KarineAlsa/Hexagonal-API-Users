export class Status {
    public token:string;
    public verifiedAt:Date|null;
    public state:boolean;

    constructor(token:string,verifiedAt:Date|null,state:boolean) {
        this.state = state;
        this.token = token;
        this.verifiedAt = verifiedAt;
    }
    getState(){
        return this.state;
    }
    getToken(){
        return this.token;
    }
    getVerifiedAt(){
        return this.verifiedAt;
    }
}