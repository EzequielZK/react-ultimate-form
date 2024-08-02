# React Ultimate Form Guide

This is a react form library made to simplify complex uses and provide automated features.

Also, `Material-UI` is a peer dependency. Checkout their [installation guide](https://mui.com/material-ui/getting-started/installation/)

## Handlers

React Ultimate Form uses two mandatory handlers, that work like a react context. `FormHandler` and `FormGroupHandler`

### FormHandler

This one is responsible for handle all of your form data and form groups data. You can have groups of forms inside `FormHandler` using `FormGroupHandler`. But you must have at least one group always.

> Usally you don't need to pass any parameter to this handler, but if you have more than one group of forms inside of it, the `onSubmit` parameter will submit all the data from all the groups of forms.

### FormGroupHandler

This is the group handler. It is responsible for handle all the rules and validations of your form. If everything is fine on submit, than it sends the data to `FormHandler` to be stored.

#### Parameters

| Parameter     | Description                                                      | Type     | Required |
| :------------ | :--------------------------------------------------------------- | :------- | :------- |
| name          | Name that identifies the form inside the handler context         | String   | Yes      |
| clearOnSubmit | Clear the form after submit                                      | Boolean  | No       |
| onSubmit      | Callback that triggers when the form is submitted                | Function | No       |
| submitForm    | Used to identify what group is the one that will submit all data | Boolean  | No       |

#### Example

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

## Components

Every form has components like `Input`, `Select` and etc. Each component receive parameters that helps the form to get more solid.

> All components receive the same parameters and attributes `Material-UI` ones receive. This section will list only the attributes and parameter React Ultimate Form created.

### Input

#### Parameters

| Parameter       | Description                                                                                                                  | Type     | Required |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------- | :------- |
| name            | Name that identifies the component inside the form                                                                           | String   | Yes      |
| mask            | String that represents the mask the input will wrap it's text                                                                | String   | No       |
| validation      | String that represents the validation the input will use to validate data                                                    | String   | No       |
| containerStyle  | Object that defines the style of the input's container                                                                       | Object   | No       |
| iconColor       | Defines the color of the input's icon                                                                                        | String   | No       |
| iconPosition    | Defines the position of the input's icon                                                                                     | String   | No       |
| removeOnUnmount | Removes the value when the component is unmounted                                                                            | Boolean  | No       |
| noIconPadding   | Removes the padding of the icon                                                                                              | Boolean  | No       |
| showLabel       | Choose if the label will be shown on the input or not. The form uses the labels to show inputs with error in the alert error | Boolean  | No       |
| call            | Callback that triggers on input's `onBlur` event                                                                             | Function | No       |
| loading         | Replaces the icon position for a `CircularProgress` while true                                                               | Boolean  | No       |
| maxLength       | Defines the string max length                                                                                                | Number   | No       |
| isEqualTo       | Object that compares the input's value with another input's value of the same form                                           | Object   | No       |
| maskFunction    | Callback that triggers on input's change and you can use to define a custom mask                                             | Function | No       |
| submitOnEnter   | Triggers submit on press `Enter`                                                                                             | Boolean  | No       |

#### Examples

##### Masks

There some main input masks that you can use in a automated way, just passing the mask name in the attribute `mask`.

- **cepMask** - Format value like `00000-000`
- **cpfCnpjMask** - Format the first 11 digits as a CPF and if you keep typing, it turn into a CNPJ format, like `000.000.000-00` and `00.000.000/0000-00`
- **emailMask** - It only keeps value lower case
- **moneyMask** - It adds the `R$` at the start of value and formats value and it's cents. It goes like this: `R$ 100,00`
- **onlyNumbersMask** - Restrict the input to render only numbers
- **phoneMask** - It formats like a phone number. Like this: `(00) 0 0000-0000`

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm' onSubmit={onSubmit}>
          <Input name='value' mask='moneyMask' />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```

##### Validations

There some main input validations that you can use in a automated way, just passing the validation name in the attribute `validation`.

- **isCep** - Return an error if value has less than 8 characters
- **isCpf** - It checks if the CPF is valid using the two last digits
- **isEmail** - It checks if the value has a `@` and ends with at least a `.com`
- **isPhone** - It checks if the value has exactly 11 digits length
- **isValidPassword** - It validates the value with at least 6 characters and maximum of 20. It has to have a special character, a upper case and lower casa character and a number

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    const onSubmit = (data: any) => {
      console.log(data)
    }

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm' onSubmit={onSubmit}>
          <Input name='email' mask='emailMask' validation='isEmail' />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```
