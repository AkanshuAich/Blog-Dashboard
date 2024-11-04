import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) => {
  const containerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '30px 0',
    margin: '20px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const paginationWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto'
  };

  const buttonBaseStyle = {
    minWidth: '40px',
    height: '40px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonBaseStyle,
    backgroundColor: isActive ? '#3b82f6' : '#ffffff',
    color: isActive ? '#ffffff' : '#1f2937',
    border: '1px solid ' + (isActive ? '#3b82f6' : '#e5e7eb'),
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    ':hover': {
      backgroundColor: isActive ? '#2563eb' : '#f3f4f6'
    }
  });

  const navigationButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ffffff',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    padding: '0 16px',
    fontWeight: 500 as const,
    width: '100px'
  };

  const disabledButtonStyle = {
    ...navigationButtonStyle,
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    cursor: 'not-allowed',
    border: '1px solid #e5e7eb'
  };

  const pageInfoStyle = {
    marginTop: '12px',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: 500 as const
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div style={containerStyle}>
      <div style={paginationWrapperStyle}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledButtonStyle : navigationButtonStyle}
          onMouseEnter={e => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== 1) {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }
          }}
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} style={{ margin: '0 4px', color: '#6b7280' }}>
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(Number(page))}
              style={getButtonStyle(currentPage === page)}
              onMouseEnter={e => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={e => {
                if (currentPage !== page) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledButtonStyle : navigationButtonStyle}
          onMouseEnter={e => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }
          }}
        >
          Next
        </button>
      </div>
      <div style={pageInfoStyle}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;