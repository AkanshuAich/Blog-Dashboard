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
  const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth > 480 && window.innerWidth <= 768);

  // Responsive handling on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: isMobile ? '15px 0' : '30px 0',
    margin: '20px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const paginationWrapperStyle = {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '8px',
    margin: '0 auto',
  };

  const buttonBaseStyle = {
    minWidth: isMobile ? '32px' : '40px',
    height: isMobile ? '32px' : '40px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: isMobile ? '14px' : '16px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const getButtonStyle = (isActive: boolean) => ({
    ...buttonBaseStyle,
    backgroundColor: isActive ? '#3b82f6' : '#ffffff',
    color: isActive ? '#ffffff' : '#1f2937',
    border: '1px solid ' + (isActive ? '#3b82f6' : '#e5e7eb'),
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  });

  const navigationButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ffffff',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    padding: isMobile ? '0 10px' : '0 16px',
    fontWeight: 500 as const,
    width: isMobile ? '80px' : isTablet ? '90px' : '100px',
  };

  const disabledButtonStyle = {
    ...navigationButtonStyle,
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
    cursor: 'not-allowed',
    border: '1px solid #e5e7eb',
  };

  const pageInfoStyle = {
    marginTop: '12px',
    color: '#6b7280',
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 500 as const,
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

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
              style={getButtonStyle(currentPage === page)}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledButtonStyle : navigationButtonStyle}
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
