# HealthHub

HealthHub is a comprehensive web application designed to bridge the gap between patients and doctors. This platform allows users to register as either a patient or a doctor, facilitating seamless appointment scheduling, AI-assisted health consultations, and secure one-on-one video calls with healthcare professionals.

## Features

-   **Secure Authentication**: Implemented user login, signup, and authentication using JWT to ensure data privacy and security.
-   **User Registration**: Developed detailed registration forms for both doctors and patients, ensuring a smooth onboarding process.
-   **AI-Powered Health Chat**: Integrated MediBot, an AI-powered health chat service using OpenAI GPT-3.5 Turbo, providing instant health consultations.
-   **Advanced Search**: Built a robust search feature for finding doctors based on specialization and expertise.
-   **Appointment Booking**: Streamlined the appointment booking process with Razorpay integration.
-   **Video Consultations**: Facilitated secure one-on-one video calls with doctors using reliable video call APIs.
-   **Dynamic Dashboards**: Created comprehensive dashboards for doctors and patients to manage appointments, profiles, and history efficiently.

## Tech Stack

-   **Frontend**:

    -   Typescript
    -   React
    -   Recoil
    -   React-Hook-Form
    -   Tailwind CSS
    -   Axios
    -   Shadcn
    -   React-Router-Dom
    -   Zod

-   **Backend**:

    -   Typescript
    -   Node.js
    -   Express.js
    -   Prisma
    -   PostgreSQL
    -   JWT

-   **APIs & Services**:
    -   Razorpay (for payments)
    -   OpenAI-API (for AI-powered chat)
    -   Zegocloud (for video call)

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   Node.js
-   PostgreSQL
-   Razorpay account (for payment integration)
-   OpenAI API key (for MediBot integration)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/KushalGoyal09/HealthHub.git
    ```
2. Navigate to the project directory:
    ```bash
    cd HealthHub
    ```
3. Install the dependencies for the client:
    ```bash
    cd client
    bun install
    ```
4. Install the dependencies for the server:
    ```bash
    cd ../server
    bun install
    ```

### Configuration

1. Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    DATABASE_URL=your_postgresql_database_url
    JWT_SECRET=your_jwt_secret_key
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    OPENAI_API_KEY=your_openai_api_key
    ```

### Running the Application

1. Start the PostgreSQL database.
2. Run the backend server:
    ```bash
    cd server
    bun run dev
    ```
3. Run the frontend client:
    ```bash
    cd ../client
    bun run dev
    ```
4. Open your browser and navigate to `http://localhost:5176`.


