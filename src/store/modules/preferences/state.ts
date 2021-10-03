export interface PreferencesInterface {
  workout: {
    skipLast: boolean
  }
}

function state(): PreferencesInterface {
  return {
    workout: {
      skipLast: true
    }
  }
};

export default state;
