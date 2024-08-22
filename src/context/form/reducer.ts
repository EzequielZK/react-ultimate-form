import { IndexableObject } from '../../lib/globalTypes';
import { Forms } from './types';

export const initialForm: Forms = {};
export const defaultForm: Forms = {};

type ActionsType = {
  SET_FORM_INPUTS: () => Forms;
  REMOVE_VALUE: () => Forms;
  CLEAR: () => Forms;
};

export function formReducer(
  forms: typeof initialForm,
  action: { type: keyof ActionsType; params: any; defaultForms?: Forms }
) {
  const { type, params, defaultForms } = action;
  const actions: ActionsType = {
    SET_FORM_INPUTS() {
      const newState: Forms = { ...forms };
      newState[params.groupName] = {
        ...newState[params.groupName],
        [params.name]: {
          ...newState[params.groupName]?.[params.name],
          ...params.data,
        },
      };
      return { ...newState };
    },
    REMOVE_VALUE() {
      const newState: Forms = { ...forms };
      delete newState[params.groupName][params.name];

      return { ...newState };
    },

    CLEAR() {
      let newState: Forms = { ...forms };
      // let key;
      if (defaultForms) {
        newState[params.groupName] = defaultForms[params.groupName];
      }

      // for (key in newState[params.groupName]) {
      //   const input = newState[params.groupName][key];
      //   input.value = input.defaultValue;
      //   input.errorMessage = null;

      //   newState[params.groupName][key] = input;
      // }
      return { ...newState };
    },
  };
  const indexableActions: IndexableObject<any> = actions;
  return { ...indexableActions[type]() };
}

export function defaultFormReducer(
  forms: typeof defaultForm,
  action: { type: 'SET_DEFAULT_FORM_INPUTS'; params: any }
) {
  const { type, params } = action;
  const actions = {
    SET_DEFAULT_FORM_INPUTS() {
      const newState: Forms = { ...forms };
      newState[params.groupName] = {
        ...newState[params.groupName],
        [params.name]: {
          ...newState[params.groupName]?.[params.name],
          ...params.data,
        },
      };
      return { ...newState };
    },
  };
  const indexableActions: IndexableObject<any> = actions;
  return { ...indexableActions[type]() };
}
