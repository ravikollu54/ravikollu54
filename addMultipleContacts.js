import { LightningElement, track, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {CloseActionScreenEvent} from 'lightning/actions';

import CONTACT_OBJECT from '@salesforce/schema/contact';
import GENDER_IDENTITY_FIELD from '@salesforce/schema/contact.GenderIdentity';
import saveMultipleContacts from '@salesforce/apex/addMultipleContactsController.saveMultipleContacts';

export default class AddMultipleContacts extends LightningElement 
{
    @api recordId;
    @track contacts = [];
    isLoading = false;
    
    @wire(getObjectInfo, {objectApiName: CONTACT_OBJECT})
    contactObjectInfo;

    @wire(getPicklistValues, {recordTypeId:'$contactObjectInfo.data.defaultRecordTypeId', fieldApiName:GENDER_IDENTITY_FIELD})
    genderPicklistValues;

    get getGenderPicklistValues()
    {
        return this.genderPicklistValues?.data?.values;
    }

    connectedCallback()
    {
        this.addNewClickhandler();
    }


    addNewClickhandler(event)
    {
        this.contacts.push({
            tempId: Date.now()
        })
    }

    deletClickhandler(event)
    {
        if(this.contacts.length==1)
        {
            this.ShowMessageToast('You cannot delete this Contact');
            return;
        }
      let tempId = event.target?.dataset.tempId;
      this.contacts = this.contacts.filter(a=> a.tempId !=tempId);
    }


    elementChangehandler(event)
    {
        let contactRow = this.contacts.find(a=>a.tempId == event.target.dataset.tempId);
        if(contactRow)
        {
            contactRow[event.target.name] = event.target?.value;
        }
    }

    async submitClikhandler(event)
    {
        const allValid = this.checkControlValidity();
        if(allValid){
            this.isLoading = true;
            this.contacts.forEach(a=>a.AccountId = this.recordId);
            let response = await saveMultipleContacts({contacts: this.contacts});
            if(response.isSuccess)
            {
                this.ShowMessageToast('Contacts are saved successfully','Success','success');
                this.dispatchEvent(new CloseActionScreenEvent());
            }
            else
            {
                this.ShowMessageToast('Something went wrong while saving contacts-' +response.message);
            }
            this.isLoading = false;
        }
        else
        {
            this.ShowMessageToast('Please correct below errors to proceed further.');
        }
    }

    checkControlValidity(){
        let isValid = true,
        controls = this.template.querySelectorAll('lightning-input, lightning-combobox');

        controls.forEach(field=>{
            if(!field.checkValidity()){
                field.reportValidity();
                isValid=false;
            }
        });
        return isValid;
    }

    ShowMessageToast(message, title = 'Error', variant = 'error'){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}