import Title from "@components/Title";
import { Button, Description } from "@components/index";
import { useAuth } from "@contexts/auth/AuthCTX";

function ChatPage() {
  const { logout, user } = useAuth();
  return (
    <div>
      <Title>Chat Page</Title>
      <Description>{user?.name}</Description>
      <Description>{user?.email}</Description>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

export default ChatPage;
