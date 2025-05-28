# NFC Travel vCard

This project is a React application designed to manage NFC travel information. Users can log in, activate NFC tags, and manage their travel data through a user-friendly interface.

## Features

- User authentication via Google, Microsoft, and GitHub.
- NFC tag activation process.
- Form to edit and save travel information.
- Display of travel data in a card format.
- Informative messages for user actions (success, error, info).

## Project Structure

```
nfc-travel-vcard
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React components
│   ├── styles              # CSS styles
│   ├── types               # TypeScript types
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point of the application
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Getting Started

To get started with the NFC Travel vCard application, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd nfc-travel-vcard
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Usage

- **Login:** Choose a login provider to access your travel data.
- **Activate NFC Tag:** If the NFC tag is not activated, you will be prompted to activate it.
- **Edit Travel Information:** Fill out the form with your travel details and save.
- **View Travel Data:** After saving, you can view your travel information displayed in a card format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.