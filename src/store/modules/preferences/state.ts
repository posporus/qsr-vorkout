export interface PreferencesInterface {
  test: string;
}

function state(): PreferencesInterface {
  return {
    test: 'hello world'
  }
};

export default state;
