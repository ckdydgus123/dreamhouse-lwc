import { LightningElement, track} from 'lwc';

// import uiRecordApi to create record
import { createRecord } from 'lightning/uiRecordApi';
// importing to show toast notifictions
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

// importing Account fields
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import Phone_FIELD from '@salesforce/schema/Account.Phone';
import Industry_FIELD from '@salesforce/schema/Account.Industry';
import Type_FIELD from '@salesforce/schema/Account.Type';

export default class CreateRecordInLWC extends LightningElement {
    @track error;

    // this object have record information
    @track accRecord = {
        Name : NAME_FIELD,
        Industry : Industry_FIELD,
        Phone : Phone_FIELD,
        Type : Type_FIELD
    };


    handleNameChange(event) {
        this.accRecord.Name = event.target.value;
        window.console.log('Name ==> '+this.accRecord.Name);
    }

    handlePhoneChange(event) {
        this.accRecord.Phone = event.target.value;
        window.console.log('Phone ==> '+this.accRecord.Phone);
        window.console.log('object ==> '+JSON.stringify(ACCOUNT_OBJECT));
    }

    handleTypeChange(event) {
        this.accRecord.Type = event.target.value;
        window.console.log('Type ==> '+this.accRecord.Type);
    }

    handleIndustryChange(event) {
        this.accRecord.Industry = event.target.value;
        window.console.log('Industry ==> '+this.accRecord.Industry);
    }


    handleSave() {
        const fields = {};

        fields[NAME_FIELD.fieldApiName] = this.accRecord.Name;
        fields[Phone_FIELD.fieldApiName] = this.accRecord.Phone;
        fields[Industry_FIELD.fieldApiName] = this.accRecord.Industry;
        fields[Type_FIELD.fieldApiName] = this.accRecord.Type;

        // Creating record using uiRecordApi
        let recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields }
        createRecord(recordInput)
            .then(result => {
                // Clear the user enter values
                this.accRecord = {};

                window.console.log('result ===> '+result);
                // Show success messsage
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Account Created Successfully!!',
                    variant: 'success'
                }),);
            })
            .catch(error => {
                this.error = JSON.stringify(error);
            });
    }
}
