import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Devi aggiungere un titolo"),
        description: yup.string().required("Devi aggiungere una descrizione"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
            timestamp: serverTimestamp(),
        });

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Titolo..." {...register("title")} />
            <p style={{ color: "red" }}> {errors.title?.message}</p>
            <textarea placeholder="Descrizione..." {...register("description")} />
            <p style={{ color: "red" }}> {errors.description?.message}</p>
            <input type="submit" className="submitForm" />
        </form>
    )
};