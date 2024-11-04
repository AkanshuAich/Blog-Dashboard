import React, { useState, useEffect } from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 480);

  // Adjust responsive state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Basic styles
  const containerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px 0',
    margin: '20px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const paginationWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
    flexWrap: 'wrap' as const,
  };

  const buttonStyle = {
    minWidth: '20px',
    height: '40px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    cursor: 'not-allowed',
  };

  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers: (number | string)[] = [];

    // Always show the first page
    if (currentPage > 2) {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
    }

    // Show the current page and up to one page before and after it
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(currentPage + 1, totalPages); i++) {
      pageNumbers.push(i);
    }

    // Always show the last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
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
          style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} style={{ margin: '0 4px', color: '#6b7280' }}>
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(Number(page))}
              style={currentPage === page ? activeButtonStyle : buttonStyle}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
        >
          Next
        </button>
      </div>
      <div style={{ marginTop: '12px', color: '#6b7280', fontSize: '14px' }}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
