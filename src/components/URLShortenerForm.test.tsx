// src/components/URLShortenerForm.tsx
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Alert } from 'react-bootstrap';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode.react';

const URLShortenerForm = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      url: '',
      customAlias: '',
    },
    validationSchema: Yup.object({
      url: Yup.string().url('Invalid URL format').required('URL is required'),
      customAlias: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const shortId = values.customAlias || generateShortId();
        await addDoc(collection(db, 'urls'), {
          originalUrl: values.url,
          shortUrl: shortId,
          createdAt: new Date(),
        });
        setShortUrl(`${window.location.origin}/${shortId}`);
      } catch (err) {
        setError('Failed to shorten URL');
      }
    },
  });

  const generateShortId = () => {
    return Math.random().toString(36).substr(2, 8);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Scissor URL Shortener</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="url">
          <Form.Label>Enter your URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="https://example.com"
            {...formik.getFieldProps('url')}
            isInvalid={!!formik.errors.url}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.url}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="customAlias">
          <Form.Label>Custom Alias (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Custom Alias"
            {...formik.getFieldProps('customAlias')}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Shorten URL
        </Button>
      </Form>

      {shortUrl && (
        <div className="mt-4">
          <Alert variant="success">
            <p>Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            <QRCode value={shortUrl} />
          </Alert>
        </div>
      )}

      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
    </div>
  );
};

export default URLShortenerForm;
