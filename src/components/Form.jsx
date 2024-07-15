import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import '../App.css'

const Form = () => {
    const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            items: [
                { item: '', cost: '' }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'items',
        control
    });

    // to compare cost values
    const validateCost = (index) => ({
        validate: (value) => {
            if (index > 0) {
                const previousCost = parseFloat(watch(`items[${index - 1}].cost`));
                const currentCost = parseFloat(value);
                if (currentCost <= previousCost) {
                    return "Cost must be greater than the previous item's cost";
                }
            }
            return true;
        }
    });

    //to compare item numbers
    const validateItem = (index) => ({
        validate: (value) => {
            if (index > 0) {
                const previousItem = parseFloat(watch(`items[${index - 1}].item`));
                const currentItem = parseFloat(value);
                if (currentItem <= previousItem) {
                    return "Item number must be greater than the previous one";
                }
            }
            return true;
        }
    });

    const handleCostChange = (index, e) => {
        const newCost = e.target.value;
        setValue(`items[${index}].cost`, newCost);
    };

    const handleItemChange = (index, e) => {
        const newItem = e.target.value;
        setValue(`items[${index}].item`, newItem);
    };

    const onSubmit = (data) => {
        console.log('Form submitted', data);
    };

    return (
        <div className='main'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='form'>

                <div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <input
                                type='text'
                                onChange={(e) => handleItemChange(index, e)}
                                {...register(`items.${index}.item`, {
                                    ...validateItem(index),
                                    required: 'Item is required'
                                }
                            )}
                                placeholder={`Item ${index + 1}`}
                            />
                            

                            <input
                                type='text'
                                onChange={(e) => handleCostChange(index, e)}
                                {...register(`items.${index}.cost`, {
                                    ...validateCost(index),
                                    required: 'Cost is required'
                                }
                            )}
                                placeholder={`Cost ${index + 1}`}
                            />
                            

                            {index > -1 && (
                                <button className='remove' type='button' onClick={() => remove(index)}>
                                    x
                                </button>
                            )}
                            
                            {errors.items && errors.items[index] && errors.items[index].cost && (
                                <p className='error'>{errors.items[index].cost.message}</p>
                            )}
                            {errors.items && errors.items[index] && errors.items[index].item && (
                                <p className='error'>{errors.items[index].item.message}</p>
                            )}
                        </div>
                    ))}
                    <button className='add' type='button' onClick={() => append({ item: '', cost: '' })}>
                        + Add Field
                    </button>
                </div>

                <button className='submit' type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Form;
