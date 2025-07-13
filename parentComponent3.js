import { LightningElement } from 'lwc';

export default class ParentComponent3 extends LightningElement 
{
    firstname='';
    lastname='';
    age='';
    childfname='';
    childlname='';
    childage='';

    handleOnchange(event)
    {
        const field = event.target.name;
        if(field === 'firstname'){
            this.firstname = event.target.value;
        }
        else if(field==='lastname'){
            this.lastname = event.target.value;
        }
        else if(field==='age'){
            this.age = event.target.value;
        }
    }

    handleOnclick()
    {
        this.childfname = this.firstname;
        this.childlname = this.lastname;
        this.childage = this.age;
    }
}