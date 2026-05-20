import React from 'react'
import { useParams } from 'react-router-dom';

export default function Contact() {
  const contact = useParams()

  console.log(contact);
    console.log("hii");
  return (
    <h1>Contact Us</h1>
  )
}
