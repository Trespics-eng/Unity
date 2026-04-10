interface CategoryBadgeProps {
    category: string;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
    const getColors = (cat: string) => {
        switch (cat) {
            case 'Hunger': return { bg: '#fee2e2', text: '#991b1b' };
            case 'Drought': return { bg: '#fef3c7', text: '#92400e' };
            case 'GBV': return { bg: '#f3e8ff', text: '#6b21a8' };
            case 'Education': return { bg: '#e0e7ff', text: '#3730a3' };
            case 'Health': return { bg: '#dcfce7', text: '#166534' };
            default: return { bg: '#f3f4f6', text: '#374151' };
        }
    };

    const colors = getColors(category);

    return (
        <span style={{
            backgroundColor: colors.bg,
            color: colors.text,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'inline-block'
        }}>
            {category}
        </span>
    );
};

export default CategoryBadge;
