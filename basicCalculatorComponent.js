import { LightningElement } from 'lwc';

export default class BasicCalculatorComponent extends LightningElement 
{
    firtnumber;
    secondnumber;
    result;

    handlechange(event)
    {
        const componentName = event.target.name;
        const componentValue = event.target.value;

        if(componentName === 'fnum')
            this.firstnumber = componentValue;
        else
            this.secondnumber = componentValue;
    }

    handleAddition()
    {
        this.result = parseInt(this.firstnumber)+parseInt(this.secondnumber);
    }

    handleSubtraction()
    {
        this.result = parseInt(this.firstnumber) - parseInt(this.secondnumber);
    }

    handlemult()
    {
        this.result = parseInt(this.firstnumber) * parseInt(this.secondnumber);
    }

    handleDivision()
    {
        this.result = parseInt(this.firstnumber)/parseInt(this.secondnumber);
    }
}