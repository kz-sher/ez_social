import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import countries from '../data/countries.json';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect(props) {
  const classes = useStyles();
  const [value, setValue] = useState(null)
  const { setFieldValue, touched, errors } = props;
  // const countriesOption = countries.map((option) => option.name)
  return (
    <Autocomplete
      id="country-select-demo"
      style={{ width: '100%' }}
      // options={countries}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      autoSelect
      openOnFocus
      getOptionLabel={(option) => {
        return option.name
      }}
      value={value}
      onChange={
        (e, newValue) => {
          console.log('triggered onchange')
          setValue(newValue);
          setFieldValue('country', newValue?newValue.name:'');
      }}
      renderInput={(params) => (
        <Field  
          {...params}
          name='country'
          label='Country'
          variant="outlined" 
          onChange={()=>{}}
          onBlur={()=>{}}
          error={!!touched.country && !!errors.country}
          helperText={!!touched.country && !!errors.country && errors.country}
          as={TextField}
          />)}
    />
  );
}