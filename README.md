# RadPossum

This is an eCommerce website project for voice training that includes a booking system, a shop, a user dashboard, and an admin dashboard. The website allows users to book voice training appointments, access their appointments and teacher's notes from past appointments through the user dashboard, and allows admin users to manage the website content, user information, and appointments through the admin dashboard.

## Usage

Users can access the website and browse the shop, book voice training appointments, and view their appointments and teacher's notes from past appointments through the user dashboard.

Admin users can access the admin dashboard to manage website content, user information, and appointments. They can also view and manage orders placed by users through the shop.

Users can make payments for voice training appointments using PayPal or Stripe payment gateways integrated into the website.

Email notifications are sent to users and admins for appointment confirmation, cancellation, and order notifications using the configured nodemailer settings.

## Installation

To get started with RadPossum, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/RadPossum.git
```

2. Change into the RadPossum directory:

```
cd RadPossum
```

3. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

5. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to see RadPossum running locally.

## Dependencies

RadPossum uses the following main dependencies:

- [@next-auth/prisma-adapter](https://www.npmjs.com/package/@next-auth/prisma-adapter) - Next.js adapter for Prisma, a modern database toolkit for Node.js.
- [@prisma/client](https://www.npmjs.com/package/@prisma/client) - Prisma's client library for connecting to databases from Node.js applications.
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) - Stripe's JavaScript library for client-side payment processing.
- [@uiw/react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor) - A markdown editor for React that allows users to edit and preview markdown content.
- [axios](https://www.npmjs.com/package/axios) - A promise-based HTTP client for making API requests.
- [next](https://www.npmjs.com/package/next) - A popular framework for building server-rendered React applications.
- [next-auth](https://www.npmjs.com/package/next-auth) - A complete authentication solution for Next.js applications.
- [nodemailer](https://www.npmjs.com/package/nodemailer) - A module for sending emails using Node.js.
- [react](https://www.npmjs.com/package/react) - A JavaScript library for building user interfaces.
- [react-dom](https://www.npmjs.com/package/react-dom) - The entry point for using React with the DOM.
- [react-hook-form](https://www.npmjs.com/package/react-hook-form) - A library for managing form state and validation in React applications.
- [react-icons](https://www.npmjs.com/package/react-icons) - A collection of popular icons for React applications.
- [react-markdown](https://www.npmjs.com/package/react-markdown) - A component for rendering Markdown as React components.
- [react-simplemde-editor](https://www.npmjs.com/package/react-simplemde-editor) - A wrapper around the SimpleMDE Markdown editor for use in React applications.
- [react-social-icons](https://www.npmjs.com/package/react-social-icons) - A library for displaying social media icons in React applications.
- [stripe](https://www.npmjs.com/package/stripe) - Stripe's official Node.js library for interacting with their APIs.
- [typescript](https://www.npmjs.com/package/typescript) - A typed superset of JavaScript that compiles to plain JavaScript.
