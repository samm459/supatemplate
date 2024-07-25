# supatemplate
supatemplate is a starter template integrating Supabase, React, Next.js, Tailwind CSS, Jest, and TypeScript, providing a solid foundation for building modern web applications.

## Getting Started

### Clone the Repository
First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/your-username/supatemplate.git
cd supatemplate
```

### Install Dependencies
Install the project dependencies using npm:

```bash
npm install
```

### Running Tests
Next, validate your setup by running the test suite. To run tests using Jest, use the following command:

```bash
npm test
```

### Setting Up Supabase Locally
* **Install Docker:** Download and install Docker from [here](https://www.docker.com/products/docker-desktop/).
* **Start Docker:**  Launch Docker Desktop.
* **Run Supabase:** Use the following command to start Supabase locally:

```bash
supabase start
```

This command will pull the necessary Docker images and start the Supabase local instance. Upon successful startup, you will see various URLs logged, such as the API URL, DB URL, and others.

#### Set Environment Variables
Copy the DB URL from the Supabase output and add it to your .env.local file as NEXT_PUBLIC_ANON_SUPABASE_KEY. The .env.local file should look like this:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_ANON_SUPABASE_KEY=your-anon-key
```

### Running the Development Server
Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3100` to see the application in action.
