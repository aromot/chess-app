import * as React from "react";

interface EmailWelcomeProps {
  name: string;
}

export const EmailWelcome: React.FC<Readonly<EmailWelcomeProps>> = ({
  name,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
  </div>
);
