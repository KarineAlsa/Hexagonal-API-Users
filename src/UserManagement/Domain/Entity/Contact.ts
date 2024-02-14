export class Contact {

    private fullName:string;
    public name:string;
    public lastName:string;
    public cellphone:string;

    constructor(name:string,lastName:string,cellphone:string) {
        this.name = name;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.fullName = this.name + " "+this.lastName;
    }

    getFullName(){
        return this.fullName;
    }

    getname(){
        return this.name;
    }
    getLastName(){
        return this.lastName;
    }

    getCellphone(){
        return this.cellphone;
    }
}