# React Ultimate Form Guide

This is a react form library made to simplify complex uses and provide automated features.

## Handlers

React Ultimate Form uses two mandatory handlers, that work like a react context. `FormHandler` and `FormGroupHandler`

### FormHandler

This one is responsible for handle all of your form data and form groups data. You can have groups of forms inside `FormHandler` using `FormGroupHandler`. But you must have at least one group always.

> Usally you don't need to pass any parameter to this handler, but if you have more than one group of forms inside of it, the `onSubmit` parameter will submit all the data from all the groups of forms.

### FormGroupHandler

This is the group handler. It is responsible for handle all the rules and validations of your form. If everything is fine on submit, than it sends the data to `FormHandler` to be stored.

#### Parameters

| Parameter     | Description                                                      | Required |
| :------------ | :--------------------------------------------------------------- | :------- |
| name          | Name that identifies the form inside the handler context         | Yes      |
| onSubmit      | Callback that triggers when the form is submitted                | No       |
| submitForm    | Used to identify what group is the one that will submit all data | No       |
| clearOnSubmit | Clear the form after submit                                      | No       |

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    const onSubmit = (data: any) => {
      console.log(data) //output: {email: the_email_typed}
    }

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm' onSubmit={onSubmit}>
          <Input name='email' />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```
