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
| mask            | Callback that takes the input value on each change as a paramter and must return a string                                    | Function | No       |
| validation      | Callback that takes the input value on each change as a paramter and must return a object                                    | Function | No       |
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
| submitOnEnter   | Triggers submit on press `Enter`                                                                                             | Boolean  | No       |

#### Examples

##### Masks

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    //input: 8000
    //output: USD 8.000,00
    const moneyMask = (value: string) => {

      let newValue = value.replace(/\D/g, "");

      const counter = (value.length - 5) / 3;

      newValue = newValue.replace(/^([.\d]+)(\d{2})$/, 'USD $1,$2');
      let i = 0;
      for (; i < counter; i++) {
        newValue = newValue.replace(/(\d+)(\d{3})([.,\d]+)$/, '$1.$2$3');
      }

      return newValue;
    }

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm'>
          <Input name='value' mask={moneyMask} />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```

##### Validations

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    //This function tests if the value has a format of an email and return an error if it's not
    const isEmail = (value: string): {error: string | null} {
      if (!value) {
        return { error: 'Insert a valid email' };
      }
      value.trim();
      const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
      return {
        error: validEmail ? null : 'Invalid email',
      };
    }

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm'>
          <Input name='email' validation={isEmail} />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```

##### isEqualTo

```ts
  import {FormHandler, FormGroupHandler, Input, FormButton} from 'react-ultimate-form'

  export default function Form(){

    //The 'field' attribute is the name of the field you want to compare the value
    //The 'errorMessage' attribute is the message you want to display below the input in case of error
    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm'>
          <Input name='password'  />
          <Input name='confirmPassword' isEqualTo={{field: 'password', errorMessage: 'Your passwords do not match' }} />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```

### Select

#### Parameters

| Parameter       | Description                                                    | Type    | Required |
| :-------------- | :------------------------------------------------------------- | :------ | :------- |
| name            | Name that identifies the component inside the form             | String  | Yes      |
| options         | Array of items to be displayed                                 | Array   | Yes      |
| removeOnUnmount | Removes the value when the component is unmounted              | Boolean | No       |
| loading         | Replaces the icon position for a `CircularProgress` while true | Boolean | No       |
| submitOnSelect  | Triggers submit on select an option                            | Boolean | No       |

#### Examples

```ts
  import {FormHandler, FormGroupHandler, Select, FormButton} from 'react-ultimate-form'

  export default function Form(){

    const filmsCategory = [
      {
        label: "Action",
        value: 1
      },
      {
        label: "Comedy",
        value: 2
      },
      {
        label: "Drama",
        value: 3
      }
    ]

    return(
      <FormHandler>
        <FormGroupHandler name='exampleForm'>
          <Select name='category' options={filmsCategory} />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      <FormHandler>
    )
  }
```

### FormButton

#### Parameters

| Parameter | Description                                   | Type   | Required |
| :-------- | :-------------------------------------------- | :----- | :------- |
| type      | String that represents the type of the button | String | No       |

#### Examples

There are two main types you need to consider: `submit` will submit the current form group this button is part of, and `submitAll` will submit all the data from all form groups inside the `FormHandler` context.

```ts
  import {FormHandler, FormGroupHandler, Select, Input, FormButton} from 'react-ultimate-form'

    function StepOneForm({setStep}){
      const nextStep = () => {
        setStep(prevStep => prevStep + 1)
      }
      return (
        <FormGroupHandler name='stepOneForm' onSubmit={nextStep}>
          <Input name='name' />
          <Input name='email' />
          <Input name='phone' />
          <FormButton type='submit'>Submit</FormButton>
        </FormGroupHandler>
      )
    }

    function StepTwoForm({setStep}){
      const nextStep = () => {
        setStep(prevStep => prevStep + 1)
      }
      return (
        <FormGroupHandler name='stepOneForm' submitForm>
          <Input name='address' />
          <Input name='password' />
          <Input name='confirmPassword' isEqualTo={{field: 'password', errorMessage: 'Your passwords do not match'}} />
          <FormButton type='submitAll'>Submit</FormButton>
        </FormGroupHandler>
      )
    }


  export default function Stepper(){
    const [step, setStep] = useState(0);

    const submitAll = (data: any) => {
      console.log(data) //Console all the data from all form groups
    }

    const forms = [StepOneForm, StepTwoForm];
    const Form = forms[step]

    return(
      <FormHandler onSubmit={submitAll}>
        <Form setStep={setStep}>
      <FormHandler>
    )
  }
```
