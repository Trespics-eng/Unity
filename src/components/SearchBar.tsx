import { Search } from 'lucide-react';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '1rem', 
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                pointerEvents: 'none'
            }}>
                <Search size={20} />
            </div>
            <input 
                type="text" 
                placeholder="Search stories by title or content..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(31, 122, 99, 0.2)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                }}
            />
        </div>
    );
};

export default SearchBar;
