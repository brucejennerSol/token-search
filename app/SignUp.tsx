'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for signing up!');
        setEmail('');
      } else {
        setMessage(data.error || 'There was an error. Please try again later.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setMessage('There was an error. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Add styles for placeholder */}
      <style>
        {`
          .custom-input::placeholder {
            color: white;
            opacity: 1; /* Ensures full visibility */
          }
        `}
      </style>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px', marginTop: '-120px' }}
      >
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="custom-input"
          style={{
            padding: '10px 8px',
            fontSize: '1rem',
            width: '100%',
            maxWidth: '400px',
            margin: '20px 0px',
            color: 'white',
            border: 'none',

            borderBottom:"1px solid white",
            borderRadius: '0px',
            background: 'transparent',
          }}
        />
       <button
        type="submit"
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid white',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '0px',
          marginLeft: '50px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
    </button>

      </form>

      {message && <p style={{ textAlign: 'left', marginTop: '10px', marginLeft: "10px", color: loading ? 'green' : '#bd323c' }}>{message}</p>}
    </div>
  );
}

export default SignUpForm;
