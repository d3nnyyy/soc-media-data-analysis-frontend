import React, { useEffect, useState } from 'react'
import { getTags, textToRGBA } from '../api/api'
import '../styles/TagsSection.css';

export default function TagsSection({ onTagSelect, selectedTags, onTagDeselect }) {

        const [tags, setTags] = useState([])
        const [searchTerm, setSearchTerm] = useState('');

        useEffect(() => {
                fetchTags();
        }, []);

        const fetchTags = async () => {
                try {
                        const fetchedTags = await getTags();
                        setTags(fetchedTags);
                } catch (error) {
                        console.error('Error fetching tags:', error);
                }
        };

        const handleSearchInputChange = (e) => {
                setSearchTerm(e.target.value);
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
                                {tags.filter(tag => {
                                        return tag.name.toLowerCase().includes(searchTerm.toLowerCase());
                                }).map(tag => (
                                        <div
                                                onClick={() => handleTagClick(tag.name)}
                                                style={{ backgroundColor: textToRGBA(tag.name) }}
                                                key={tag.id}
                                                className={`tag ${selectedTags.includes(tag.name) ? 'selected' : ''}`}
                                        >
                                                {tag.name}
                                        </div>
                                ))}
                        </div>
                </div>
        )
}
