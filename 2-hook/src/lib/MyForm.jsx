import React from "react"

export const useForm = ({initialValues, validate, onSubmit}) => {
  const [values, setValues] = React.useState(initialValues)

  const [errors, setErrors] = React.useState({})

  const [touched, setTouched] = React.useState({})

  const handleChange = e => {
    const nextValues = {
      ...values, 
      [e.target.name] : e.target.value
    }
    setValues(nextValues)
  }

  const handleBlur = e => {
    const nextTouched = {
        ...touched,
        [e.target.name] : true
      }
    setTouched(nextTouched)
  }

  const handleSubmit = e => {
    e.preventDefault();
    const nextTouched = Object.keys(values).reduce((touched, field) =>{
      touched[field] = true;
      return touched
    }, {})
    setTouched(nextTouched)

    
    const errors = validate(values)
    setErrors(errors)
    if(Object.values(errors).some(Boolean)) return;


    onSubmit(values)   
}


  React.useEffect(()=>{
    setErrors(validate(values))
  }, [values])

  return {
    values, errors, touched, handleBlur, handleChange, handleSubmit
  }

}
