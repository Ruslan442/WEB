
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const Form = () => {

    interface IMyForm {
        name: string;
        age: number;
    }

    const [tasks, setTasks] = useState<IMyForm[]>([])

    const {
        register, 
        handleSubmit, 
        formState: {errors}, 
        reset 
    } = useForm<IMyForm>({
        mode: "onBlur", 
    })

    const saveElement: SubmitHandler<IMyForm> = data => {
            setTasks((prev) => [...prev, data])
            reset();
        }

    return (    
    <>
    <form onSubmit={handleSubmit(saveElement)}>
        <input 
            {...register('name', {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                        value: 5,
                        message: "Нужно больше символов"
                    }
                }
        )}
        />
        <div>{errors.name?.message}</div>
        <input 
            {...register('age', {
                    required: "Поле обязательно для заполнения",
                    minLength: {
                        value: 10,
                        message: "Нужно больше символов"
                    }
                }
            )}
        />
        <div>{errors.age?.message}</div>
        <button type="submit">Сохранить</button>
    </form>

    {
    tasks.map((task) => 
        <p>
            {task.name} - {task.age}
        </p>
    )
    }
    </>
    )
}

export default Form;