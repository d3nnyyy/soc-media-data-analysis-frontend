import axios from 'axios';
import postsData from '../data/posts.json'
import tagsData from '../data/tags.json'

const baseURL = 'http://localhost:8080';

const api = axios.create({
        baseURL,
        headers: {
                'Content-Type': 'application/json',
        },
});

export const getPosts = async () => {
        try {
                // const response = await api.get('/posts');
                // return response.data;
                return postsData;
        } catch (error) {
                console.error('getPosts', error);
        }
}

export const getPost = async (id) => {
        try {
                // const response = await api.get(`/posts/${id}`);
                // return response.data;
                return postsData.find(post => post.id === id);
        } catch (error) {
                console.error('getPost', error);
        }
}

export const getPostsByTag = async (tag) => {
        try {
                // const response = await api.get(`/posts/tag/${tag}`);
                // return response.data;
                console.log(postsData.filter(post => post.tags.includes(tag)))
                return postsData.filter(post => post.tags.includes(tag));
        } catch (error) {
                console.log('getPostsByTag', error);
                console.error('getPostsByTag', error);
        }
}

export const getTags = async () => {
        try {
                // const response = await api.get('/tags');
                // return response.data;
                return tagsData;
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
