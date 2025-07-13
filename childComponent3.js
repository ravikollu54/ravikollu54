import { LightningElement, api } from 'lwc';

export default class ChildComponent3 extends LightningElement 
{
    @api fname;
    @api lname;
    @api age;
}