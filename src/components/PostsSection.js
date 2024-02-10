import React, { useEffect, useState } from 'react'
import { getPosts, searchPosts, textToRGBA } from '../api/api'
import '../styles/PostsSection.css'

export default function PostsSection({ selectedTags, onTagDeselect }) {

        const [posts, setPosts] = useState([])
        const [searchTerm, setSearchTerm] = useState('');

        useEffect(() => {
                fetchPosts();
        }, []);

        const fetchPosts = async () => {
                try {
                        const fetchedPosts = await getPosts();
                        setPosts(fetchedPosts);
                } catch (error) {
                        console.error('Error fetching posts:', error);
                }
        };

        const filteredPosts = posts.filter(post => {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (
                                selectedTags.length === 0 ||
                                selectedTags.every(selectedTag => post.tags.some(tag => tag.name === selectedTag))
                        )
        }
        );

        const fetchSearchedPosts = async (query) => {
                try {
                        const searchedPosts = await searchPosts(query);
                        if (searchedPosts && searchedPosts.length > 0) {
                                setPosts(searchedPosts);
                        } else {
                                setPosts([]);
                        }
                } catch (error) {
                        console.error('Error searching posts:', error);
                }
        };


        const handleSearchInputChange = (e) => {
                const query = e.target.value;
                setSearchTerm(query);
                if (query.trim() === '') {
                        setPosts(posts);
                } else {
                        fetchSearchedPosts(query);
                }
        };

        const handleTagClick = (tag) => {
                onTagDeselect(tag);
        };

        return (
                <div className='posts-section'>
                        <div className='search-container'>
                                <input
                                        type='text'
                                        placeholder='Search posts...'
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                />
                        </div>
                        <div className='selected-tags'>
                                {selectedTags.map(tag => (
                                        <span key={tag} style={{ backgroundColor: textToRGBA(tag) }} className='tag' onClick={() => handleTagClick(tag)}>
                                                {tag}
                                        </span>
                                ))}
                        </div>
                        <div className='post-list'>
                                {filteredPosts.map(post => (
                                        <div key={post.id} className='post'>
                                                <h2>{post.title}</h2>
                                                <p>{post.content}</p>
                                                <div className='post-details'>
                                                        <span className='source'>{post.Source.name}:</span>
                                                        <a className='url' href={post.url} target='_blank' rel='noopener noreferrer'>
                                                                {post.url}
                                                        </a>
                                                </div>
                                                <div className='tags'>
                                                        {post.tags && post.tags.map(tag => (
                                                                <span style={{ backgroundColor: textToRGBA(tag.name) }} key={tag.id} className='tag'>{tag.name}</span>
                                                        ))}
                                                </div>
                                        </div>
                                ))}

                        </div>
                </div>
        )
}
