import React, { useEffect, useState } from 'react';
import { getTags, searchTags, textToRGBA } from '../api/api';
import '../styles/TagsSection.css';

export default function TagsSection({ onTagSelect, selectedTags, onTagDeselect }) {
        const [tags, setTags] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [popularTags, setPopularTags] = useState([]);

        useEffect(() => {
                fetchPopularTags();
        }, []);

        const fetchPopularTags = async () => {
                try {
                        const fetchedTags = await getTags();
                        setPopularTags(fetchedTags);
                        setTags(fetchedTags);
                } catch (error) {
                        console.error('Error fetching popular tags:', error);
                }
        };

        const fetchSearchedTags = async (query) => {
                try {
                        const searchedTags = await searchTags(query);
                        if (searchedTags && searchedTags.length > 0) {
                                setTags(searchedTags);
                        } else {
                                setTags([]);
                        }
                } catch (error) {
                        console.error('Error searching tags:', error);
                }
        };


        const handleSearchInputChange = (e) => {
                const query = e.target.value;
                setSearchTerm(query);
                if (query.trim() === '') {
                        setTags(popularTags);
                } else {
                        fetchSearchedTags(query);
                }
        };

        const handleTagClick = (tag) => {
                setSearchTerm('');
                if (selectedTags.includes(tag)) {
                        onTagDeselect(tag);
                } else {
                        onTagSelect(tag);
                }
        };

        return (
                <div className='tags-section'>
                        <div className='search-container'>
                                <input
                                        type='text'
                                        placeholder='Search tags...'
                                        value={searchTerm}
                                        onChange={handleSearchInputChange}
                                />
                        </div>
                        <div className='tag-list'>
                                {searchTerm.trim() === '' ? (
                                        <div className='popular-tags'>
                                                <h3>Most Popular Tags:</h3>
                                                {popularTags.map(tag => (
                                                        <div
                                                                key={tag.id}
                                                                onClick={() => handleTagClick(tag.name)}
                                                                style={{ backgroundColor: textToRGBA(tag.name) }}
                                                                className={`tag ${selectedTags.includes(tag.name) ? 'selected' : ''}`}
                                                        >
                                                                {tag.name}
                                                        </div>
                                                ))}
                                        </div>
                                ) : (
                                        <div className='searched-tags'>
                                                <h3>Found Tags:</h3>
                                                {tags.length > 0 ?
                                                        (
                                                                tags.map(tag => (
                                                                        <div
                                                                                key={tag.id}
                                                                                onClick={() => handleTagClick(tag.name)}
                                                                                style={{ backgroundColor: textToRGBA(tag.name) }}
                                                                                className={`tag ${selectedTags.includes(tag.name) ? 'selected' : ''}`}
                                                                        >
                                                                                {tag.name}
                                                                        </div>
                                                                ))
                                                        ) : (
                                                                <div className='no-results'>No tags found</div>
                                                        )}
                                        </div>
                                )}
                        </div>
                </div>
        );
}
