import React from "react";
import { useForm } from "react-hook-form";

export const CreateForm = () => {
    const schema = yup.object();

    return (
        <form>
            <input placeholder="Title..." />
            <input placeholder="Description..." />
            <input type="submit" />
        </form>
    )
};