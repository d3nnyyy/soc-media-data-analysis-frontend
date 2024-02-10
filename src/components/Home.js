import React, { useState } from 'react'
import PostsSection from './PostsSection'
import TagsSection from './TagsSection'
import '../styles/Home.css';

export default function Home() {
        const [selectedTags, setSelectedTags] = useState([]);

        const handleTagSelect = (tag) => {
                if (!selectedTags.includes(tag)) {
                        setSelectedTags([...selectedTags, tag]);
                }
        };

        const handleTagDeselect = (tag) => {
                setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        };

        return (
                <div className='home'>
                        <div className='left-section'>
                                <PostsSection selectedTags={selectedTags} onTagDeselect={handleTagDeselect} />
                        </div>
                        <div className='right-section'>
                                <TagsSection selectedTags={selectedTags} onTagSelect={handleTagSelect} onTagDeselect={handleTagDeselect} />
                        </div>
                </div>
        )
}