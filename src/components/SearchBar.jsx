import { useState, useRef, useEffect, useCallback } from 'react';

export default function SearchBar({
  placeholder = 'Search guides...',
  onChange,
  onSearch,
  value: controlledValue,
}) {
  const [internalValue, setInternalValue] = useState('');
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Support controlled and uncontrolled modes
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const debouncedOnChange = useCallback(
    (val) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange?.(val);
      }, 300);
    },
    [onChange]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    debouncedOnChange(val);
  }

  function handleClear() {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
    inputRef.current?.focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onSearch?.(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <span className="search-bar-icon" aria-hidden="true">🔍</span>
      <label htmlFor="search-input" className="sr-only" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}>
        {placeholder}
      </label>
      <input
        id="search-input"
        ref={inputRef}
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </form>
  );
}
