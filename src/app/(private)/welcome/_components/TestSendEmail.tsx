import { Button } from "@/components/ui/button";
import { useState } from "react";

const TestSendEmail = () => {
  const [message, setMessage] = useState<string>("idle");

  async function onClickSend() {
    setMessage("loading");
    const res = await fetch("/api/emailing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ yourData: 'value' }),
    });

    const data = await res.json();
    if (data.error) {
      setMessage("error");
      console.log(data.error);
    } else {
      setMessage("success");
      console.log({ data });
    }
  }

  return (
    <div className="flex gap-5 items-center">
      <Button onClick={onClickSend}>Test d'envoi d'e-mail</Button>
      <div>message: {message}</div>
    </div>
  );
};

export default TestSendEmail;
