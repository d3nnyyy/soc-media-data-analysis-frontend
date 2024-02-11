import axios from 'axios';

const baseURL = 'https://nlp.semenchuk.cc';

const api = axios.create({
        baseURL,
        headers: {
                'Content-Type': 'application/json',
        },
});

export const getPosts = async () => {
        try {
                const response = await api.get('/posts');
                return response.data;
        } catch (error) {
                console.error('getPosts', error);
        }
}

export const searchPosts = async (query) => {
        try {
                const response = await api.get(`/posts/search?query=${query}`);
                return response.data;
        } catch (error) {
                console.error('searchPosts', error);
        }
}

export const searchTags = async (query) => {
        try {
                const response = await api.get(`/tags/search?query=${query}&count=10`);
                return response.data;
        } catch (error) {
                console.error('searchTags', error);
        }
}

export const getTags = async () => {
        try {
                const response = await api.get('/tags/popular?count=10');
                return response.data;
        } catch (error) {
                console.error('getTags', error);
        }
}

export const textToRGBA = (text) => {

        let hash = 0;
        for (let i = 0; i < text.length; i++) {
                hash = text.charCodeAt(i) + ((hash << 5) - hash);
        }

        const c = (hash & 0x00FFFFFF)
                .toString(16)
                .toUpperCase()
                .padStart(6, '0');

        return `rgba(
                ${parseInt(c.substring(0, 2), 16)}, 
                ${parseInt(c.substring(2, 4), 16)}, 
                ${parseInt(c.substring(4, 6), 16)},
                0.3
                )`;
}
