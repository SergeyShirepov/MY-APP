import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import user, { selectUser, UserData } from "../store/features/user";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";

interface ICard {
    id: string;
    title: string;
    cardPreview: string;
    timePublished: string;
    timeViewed: string;
    avtor: string;
    avatar: string;
    karmaValue: number;
}

const useOpenPost = (id: string) => {
  const data = useAppSelector(selectUser);    
    const name = user?.name ?? "";
    const [card, setCard] = useState<ICard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
                    headers: {
                        // Передаем имя пользователя и токен в заголовках
                        'X-User-Name': name || '',
                    }
                });
                setCard(response.data);
                setLoading(false);
            } catch (err) {
                setError('Не удалось загрузить пост');
                setLoading(false);
                console.error('Ошибка загрузки поста:', err);
            }
        }

        fetchPost();
    }, [id]);

    return { card, loading, error };
}

export default useOpenPost;