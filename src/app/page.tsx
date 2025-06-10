"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data: session } = authClient.useSession();

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged is as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  const onSubmit = () => {
    authClient.signUp.email({ email, name, password },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          alert("success");
        },
        onError: (ctx) => {
          // display the error message
          alert("error");
        },
      });
  }

  const onLogin = () => {
    authClient.signIn.email({ email, password },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          alert("success");
        },
        onError: (ctx) => {
          // display the error message
          alert("error");
        },
      });
  }

  return (
    <>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={onSubmit} type="submit">
          Create user
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={onLogin} type="submit">
          Log in
        </Button>
      </div>
    </>
  );
}
