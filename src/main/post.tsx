import React, { useEffect, useState } from "react";
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Post as IPost } from "./main";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[]>([]);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };

    const addLike = async () => {
        if (!user) return;
        try {
            const newDoc = await addDoc(likesRef, { userId: user.uid, postId: post.id });
            setLikes((prev) => [...prev, { userId: user.uid, likeId: newDoc.id }]);
        } catch (err) {
            console.error("Errore nell'aggiunta del like:", err);
        }
    };

    const removeLike = async () => {
        if (!user) return;
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            if (!likeToDeleteData.empty) {
                const likeId = likeToDeleteData.docs[0].id;
                const likeToDelete = doc(db, "likes", likeId);
                await deleteDoc(likeToDelete);
                setLikes((prev) => prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.error("Errore nella rimozione del like:", err);
        }
    };

    useEffect(() => {
        getLikes();
    }, []);

    const hasUserLiked = likes.some((like) => like.userId === user?.uid);

    return (
        <div className="postInHome">
            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="body">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {likes.length > 0 && <p>Mi piace: {likes.length}</p>}
            </div>
        </div>
    );
};